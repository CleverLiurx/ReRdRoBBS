import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Classes } from "types/classes";
import { useHttp } from "utils/http";
import { useAsync } from "utils/use-async";
import styled from "@emotion/styled";
import { Button, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { SmileOutlined, PictureOutlined } from "@ant-design/icons";
import { useDebounce, useDocumentTitle } from "utils";

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

export const PublishPage = () => {
  useDocumentTitle("写文章");
  const client = useHttp();
  const navigate = useNavigate();
  const { data: classList } = useData();

  let [params, setParams] = useState({
    classFrom: "",
    content: "",
  });

  const handleSubmit = async () => {
    client("/topic", {
      data: { ...params },
      method: "POST",
    }).then(() => {
      navigate("/home");
    });
  };

  return (
    <Container>
      <h3>
        极速发布
        <Button
          shape="round"
          size="small"
          style={{ float: "right", fontSize: "10px" }}
        >
          完整发布模式{">"}
        </Button>
      </h3>
      <span style={{ color: "#333", fontSize: "1.4rem", paddingRight: "20px" }}>
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
      <TextBody>
        <TextArea
          onChange={(e) => setParams({ ...params, content: e.target.value })}
          value={params.content}
          autoSize={{ minRows: 7, maxRows: 16 }}
          bordered={false}
          placeholder="客官～写点什么吧QAQ"
        />
        <Contral>
          <SmileOutlined />
          <span style={{ fontSize: "1.4rem", padding: "0 22px 0 5px" }}>
            表情
          </span>
          <PictureOutlined />
          <span style={{ fontSize: "1.4rem", padding: "0 22px 0 5px" }}>
            图片
          </span>
        </Contral>
        <div style={{ clear: "both" }}></div>
      </TextBody>
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

const TextBody = styled.div`
  margin-top: 20px;
  border-radius: 5px;
  border: 1px solid #eee;
  &:hover {
    border: 1px solid #ea540b;
  }
`;
const Contral = styled.div`
  margin: 8px 0 5px 30px;
  color: #666;
`;

function run(arg0: any) {
  throw new Error("Function not implemented.");
}
function client() {
  throw new Error("Function not implemented.");
}
