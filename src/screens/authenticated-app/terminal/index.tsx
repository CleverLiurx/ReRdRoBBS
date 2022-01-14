import React, { useEffect, useState } from "react";
import { Col, Row, Input, Tag, Modal, Form, Button, message } from "antd";
import { useDocumentTitle } from "utils";
import { useHttp } from "utils/http";
import { useAsync } from "utils/use-async";
import styled from "@emotion/styled";
import {
  MacCommandOutlined,
  TagsOutlined,
  CodeOutlined,
  PlusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { TweenOneGroup } from "rc-tween-one";
import { useAuth } from "context/auth-context";
import { useNavigate } from "react-router";

const { Search, TextArea } = Input;

interface Command {
  _id?: string;
  command: string;
  keywords: string[];
  description: string;
  example: string;
  starCount?: number;
}

interface ParamType {
  page: number;
  limit: number;
  kw: string;
}
// 获取命令列表
const useCommand = (param: ParamType) => {
  const client = useHttp();
  const { run, ...result } = useAsync<Command[]>();

  useEffect(() => {
    run(client("/terminal", { data: { ...param, kw: decodeURI(param.kw) } }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);

  return result;
};

export const TerminalPage = () => {
  useDocumentTitle("Web Terminal");

  let [param, setParam] = useState({ page: 1, limit: 20, kw: "" });

  const { data: commandList } = useCommand(param);

  const onSearch = (value: string) => {
    setParam({ ...param, kw: value });
  };

  return (
    <Main>
      <Search
        style={{ width: "520px", margin: "12px auto 22px 300px" }}
        placeholder="请输入关键词 以空格分开"
        enterButton="搜索一下"
        size="large"
        onSearch={onSearch}
      />
      <Row gutter={[24, 24]}>
        {commandList?.map((item) => (
          <Col span={8} key={item._id}>
            <CommandCard>
              <div>
                <Tag icon={<MacCommandOutlined />} color="#55acee">
                  命令
                </Tag>
                <span style={{ fontSize: "12px" }}>{item.command}</span>
              </div>
              <div>
                {item.description ? (
                  <>
                    <Tag icon={<TagsOutlined />} color="#55acee">
                      参数
                    </Tag>
                    <TextArea
                      defaultValue={item.description}
                      bordered={false}
                      autoSize={true}
                      disabled
                      style={{ fontSize: "12px" }}
                    />
                  </>
                ) : null}
              </div>
              <div>
                {item.example ? (
                  <Tag icon={<CodeOutlined />} color="#55acee">
                    举例
                  </Tag>
                ) : null}
                <span style={{ fontSize: "12px" }}>{item.example}</span>
              </div>
            </CommandCard>
          </Col>
        ))}
      </Row>
      <EditDialog />
    </Main>
  );
};

const EditDialog = () => {
  const client = useHttp();
  const { user } = useAuth();
  const navigate = useNavigate();

  let [visible, setVisible] = useState(false);
  let [confirmLoading, setcCnfirmLoading] = useState(false);
  let [term, setTerm] = useState<Command>({
    command: "",
    keywords: [],
    description: "",
    example: "",
  });

  let [kwVis, setKwVis] = useState(false);
  let [kwValue, setKwValue] = useState("");

  const handleOk = () => {
    setcCnfirmLoading(true);
    if (!term.keywords.length) {
      message.info("请输入几个用于检索的关键词");
      setcCnfirmLoading(false);
      return;
    }

    client("/terminal", { data: term, method: "POST" }).then(() => {
      setVisible(false);
      setcCnfirmLoading(false);
    });
  };

  const handleCloseKw = (removedTag: string) => {
    const keywords = term.keywords.filter((tag) => tag !== removedTag);
    setTerm({ ...term, keywords });
  };

  const handleKwInputConfirm = (inputValue: string) => {
    let { keywords } = term;
    if (inputValue && keywords.indexOf(inputValue) === -1) {
      keywords = [...keywords, inputValue];
    }
    setTerm({ ...term, keywords });
    setKwVis(false);
    setKwValue("");
  };

  const forMap = (tag: string) => {
    const tagElem = (
      <Tag
        closable
        onClose={(e) => {
          e.preventDefault();
          handleCloseKw(tag);
        }}
      >
        {tag}
      </Tag>
    );
    return (
      <span key={tag} style={{ display: "inline-block" }}>
        {tagElem}
      </span>
    );
  };

  const keywordsChild = term.keywords.map(forMap);

  const openDialog = () => {
    user ? setVisible(true) : navigate("/auth");
  };

  return (
    <>
      <PageFixed>
        <PlusCircleOutlined
          onClick={openDialog}
          style={{ fontSize: "40px", color: "#ea540b" }}
        />
      </PageFixed>
      <Modal
        title="编辑个人资料"
        visible={visible}
        onCancel={() => setVisible(false)}
        width={520}
        footer={false}
        getContainer={false}
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          onFinish={handleOk}
          autoComplete="off"
        >
          <Form.Item
            label="命令"
            name="command"
            rules={[{ required: true, message: "请输入命令" }]}
          >
            <Input
              onChange={(e) => setTerm({ ...term, command: e.target.value })}
            />
          </Form.Item>

          <Form.Item label="参数">
            <TextArea
              onChange={(e) =>
                setTerm({ ...term, description: e.target.value })
              }
              rows={4}
            />
          </Form.Item>

          <Form.Item
            label="举例"
            name="example"
            rules={[{ required: true, message: "请输入例子" }]}
          >
            <Input
              onChange={(e) => setTerm({ ...term, example: e.target.value })}
            />
          </Form.Item>

          <Form.Item label="关键词">
            <TweenOneGroup
              style={{ display: "inline-block" }}
              enter={{
                scale: 0.8,
                opacity: 0,
                type: "from",
                duration: 100,
              }}
              onEnd={(e) => {
                if (e.type === "appear" || e.type === "enter") {
                  // @ts-ignore
                  e.target.style = "display: inline-block";
                }
              }}
              leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
              appear={false}
            >
              {keywordsChild}
            </TweenOneGroup>
            {kwVis && (
              <Input
                // ref={this.saveInputRef}
                type="text"
                size="small"
                style={{ width: 78 }}
                value={kwValue}
                onChange={(e) => setKwValue(e.target.value)}
                onBlur={(e) => handleKwInputConfirm(e.target.value)}
                // @ts-ignore
                onPressEnter={(e) => handleKwInputConfirm(e.target.value)}
              />
            )}
            {!kwVis && (
              <Tag onClick={() => setKwVis(true)} className="site-tag-plus">
                <PlusOutlined />
                新增
              </Tag>
            )}
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              style={{ float: "right" }}
              type="primary"
              htmlType="submit"
              loading={confirmLoading}
            >
              确认修改
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

const Main = styled.div`
  width: 1120px;
  margin: 10px auto;
`;

const CommandCard = styled.div`
  display: inline-block;
  padding: 5px;
  width: 100%;
  box-shadow: 5px 2px 6px #ccc;
  overflow-y: scroll;
`;

const PageFixed = styled.div`
  width: 40px;
  height: 40px;
  position: fixed;
  bottom: 10%;
  right: 50px;
  cursor: pointer;
`;
