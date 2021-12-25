import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Classes } from "types/classes";
import { useHttp } from "utils/http";
import { useAsync } from "utils/use-async";
import styled from "@emotion/styled";
import { Button, Input, Select } from "antd";
import { useDocumentTitle } from "utils";
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

  const handleSubmit = async () => {
    client("/topic", {
      data: {
        ...params,
        richContent: editor?.txt.html(),
        content: editor?.txt.text(),
      },
      method: "POST",
    }).then(() => {
      navigate("/home");
    });
  };

  useEffect(() => {
    // 注：class写法需要在componentDidMount 创建编辑器
    editor = new E("#editor");

    editor.config.menus = editorConfig.menus;
    editor.config.showFullScreen = editorConfig.showFullScreen;

    /**一定要创建 */
    editor.create();

    return () => {
      // 组件销毁时销毁编辑器  注：class写法需要在componentWillUnmount中调用
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
        <Button type="primary" shape="round" onClick={handleSubmit}>
          发布
        </Button>
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
