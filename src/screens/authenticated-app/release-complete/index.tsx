import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Classes } from "types/classes";
import { useHttp } from "utils/http";
import { useAsync } from "utils/use-async";
import styled from "@emotion/styled";
import { Button, Input, message, Select, Tooltip } from "antd";
import { useDocumentTitle } from "utils";
// import { MyEditor } from "components/editor";
// import { IDomEditor } from "@wangeditor/editor";
import E from "wangeditor";

const { Option } = Select;
let editor: E | null = null;
const editorConfig = {
  menus: [
    "head",
    "bold",
    "fontSize",
    "fontName",
    "italic",
    "underline",
    "strikeThrough",
    "indent",
    "lineHeight",
    "foreColor",
    "backColor",
    "link",
    "list",
    "todo",
    "justify",
    "quote",
    "emoticon",
    "image",
    // 'video',
    "table",
    "code",
    "splitLine",
    "undo",
    "redo",
  ],
  showFullScreen: false,
  uploadImgMaxLength: 1,
  withCredentials: true,
  uploadImgServer: process.env.REACT_APP_API_URL + "/file",
  uploadFileName: "file",
  showLinkImg: false,
};

const useData = () => {
  const client = useHttp();
  const { run, ...result } = useAsync<Classes[]>();

  useEffect(() => {
    run(client(`/classes`));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return result;
};

export const ReleaseComplete = () => {
  useDocumentTitle("完整发布");
  const client = useHttp();
  const navigate = useNavigate();
  const { data: classList } = useData();

  let [params, setParams] = useState({
    anon: false,
    title: "",
    classFrom: "",
    richContent: "",
    content: "",
  });

  // const [editor, setEditor] = useState<IDomEditor | null>(null);

  const handleSubmit = async () => {
    const text = editor?.txt.text();
    if (!text) {
      message.warning("写点内容吧～");
      return;
    }
    client("/topic", {
      data: {
        ...params,
        richContent: editor?.txt.html(),
        content: editor?.txt.text(),
      },
      method: "POST",
    }).then(() => {
      message.success("发布成功，审核通过后即可展示");
      navigate("/home");
    });
  };

  useEffect(() => {
    editor = new E("#editor");

    editor.config.menus = editorConfig.menus;
    editor.config.showFullScreen = editorConfig.showFullScreen;
    editor.config.uploadImgMaxLength = editorConfig.uploadImgMaxLength;
    editor.config.withCredentials = editorConfig.withCredentials;
    editor.config.uploadImgServer = editorConfig.uploadImgServer;
    editor.config.uploadImgHooks = {
      // @ts-ignore
      customInsert: (insertImgFn, res) => {
        if (res.errno === "0") {
          // @ts-ignore
          insertImgFn(res.data.url);
        }
      },
    };
    editor.config.uploadFileName = editorConfig.uploadFileName;
    editor.config.showLinkImg = editorConfig.showLinkImg;

    editor.create();

    // @ts-ignore
    window._editor = editor;

    return () => {
      editor?.destroy();
    };
  }, []);

  return (
    <Container>
      <Input
        placeholder="在这里输入标题"
        style={{
          fontSize: "2.1rem",
          border: "none",
          outline: "none",
          boxShadow: "none",
          marginBottom: "10px",
        }}
        value={params.title}
        onChange={(e) => {
          setParams({ ...params, title: e.target.value });
        }}
      />

      {/* <MyEditor editorApi={setEditor} /> */}
      <Editor id="editor" />

      <div style={{ margin: "12px 5px" }}>
        <span style={{ color: "#333", fontSize: "1.4rem", marginRight: "5px" }}>
          选择板块
        </span>
        <Select
          onChange={(v) => setParams({ ...params, classFrom: v })}
          value={params.classFrom}
          placeholder="请选择合适的板块"
          style={{ width: 210, fontSize: "1.2rem" }}
          defaultActiveFirstOption
        >
          {classList?.map((item) => {
            return (
              <Option
                style={{ fontSize: "1.4rem" }}
                key={item._id}
                value={item._id}
              >
                {item.classname}
              </Option>
            );
          })}
        </Select>
      </div>
      <div style={{ margin: "20px", textAlign: "right" }}>
        <Tooltip
          title={!params.classFrom ? "选择个合适的板块吧" : ""}
          arrowPointAtCenter
        >
          <Button
            disabled={!params.classFrom}
            type="primary"
            shape="round"
            onClick={handleSubmit}
          >
            发布
          </Button>
        </Tooltip>
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 740px;
  background-color: #fff;
  margin: 20px auto;
  padding: 30px 20px;
`;

const Editor = styled.div`
  & > .w-e-toolbar {
    z-index: auto !important;
  }
  & > .w-e-text-container {
    z-index: auto !important;
    height: auto !important;
    min-height: 300px !important;
  }
`;
