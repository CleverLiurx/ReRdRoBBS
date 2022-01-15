import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Classes } from "types/classes";
import { useHttp } from "utils/http";
import { useAsync } from "utils/use-async";
import styled from "@emotion/styled";
import { Button, Input, message, Select, Tooltip } from "antd";
import { useDocumentTitle } from "utils";
import { MyEditor } from "components/editor";
import { IDomEditor } from "@wangeditor/editor";

const { Option } = Select;

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

  const [editor, setEditor] = useState<IDomEditor | null>(null);

  const handleSubmit = async () => {
    const text = editor?.getText();
    if (!text) {
      message.warning("写点内容吧～");
      return;
    }
    client("/topic", {
      data: {
        ...params,
        richContent: editor?.getHtml(),
        content: text,
      },
      method: "POST",
    }).then(() => {
      message.success("发布成功，审核通过后即可展示");
      navigate("/home");
    });
  };

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

      <MyEditor editorApi={setEditor} />

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
