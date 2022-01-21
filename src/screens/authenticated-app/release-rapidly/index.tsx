import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Classes } from "types/classes";
import { useHttp } from "utils/http";
import { useAsync } from "utils/use-async";
import styled from "@emotion/styled";
import { Button, message, Select, Tooltip, Upload, Image } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { SmileOutlined, PictureOutlined } from "@ant-design/icons";
import { useDocumentTitle } from "utils";
import "emoji-mart/css/emoji-mart.css";
import { EmojiData, Picker } from "emoji-mart";

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

export const ReleaseRapidly = () => {
  useDocumentTitle("极速发布");
  const client = useHttp();
  const navigate = useNavigate();
  const { data: classList } = useData();

  let [params, setParams] = useState({
    anon: false,
    classFrom: "",
    content: "",
    topicImage: [],
  });

  const handleSubmit = async () => {
    client("/topic", {
      data: { ...params },
      method: "POST",
    }).then(() => {
      message.success("发布成功，审核通过后即可展示");
      navigate("/");
    });
  };

  let [emoSelect, setEmoSelect] = useState(false);
  const addEmo = (emo: EmojiData) => {
    // @ts-ignore
    const textEmo = emo.native;
    const tc = document.getElementById("text-ip");
    // @ts-ignore
    const tclen = tc.value.length;
    // @ts-ignore
    tc.focus();
    // @ts-ignore
    if (typeof document.selection != "undefined") {
      // @ts-ignore
      document.selection.createRange().text = str;
    } else {
      // @ts-ignore
      const text =
        // @ts-ignore
        tc.value.substr(0, tc.selectionStart) +
        textEmo +
        // @ts-ignore
        tc.value.substring(tc.selectionStart, tclen);
      setParams({ ...params, content: text });
    }
    setEmoSelect(false);
  };

  let [fileList, setFileList] = useState([]);
  const props = {
    name: "file",
    action: process.env.REACT_APP_API_URL + "/file",
    withCredentials: true,
    accept: "image/*",
    showUploadList: false,
    // @ts-ignore
    onChange(info) {
      if (info.file.status === "done") {
        setParams({
          ...params,
          // @ts-ignore
          topicImage: [...fileList, info.file.response.data],
        });
        // @ts-ignore
        setFileList((list) => [...list, info.file.response.data]);
      }
    },
  };
  const deleteImg = (idx: number) => {
    const list = [
      ...fileList.slice(0, idx),
      ...fileList.slice(idx + 1, fileList.length),
    ];
    setParams({ ...params, topicImage: list });
    setFileList(list);
  };

  return (
    <Container>
      <h3>
        极速发布
        <Button
          shape="round"
          size="small"
          style={{ float: "right", fontSize: "10px" }}
          onClick={() => navigate("/release-complete")}
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
          id="text-ip"
        />
        <Contral>
          <div>
            <Image.PreviewGroup>
              {fileList.map((img, idx) => (
                <Image
                  // @ts-ignore
                  key={img.url}
                  width={80}
                  height={80}
                  style={{ padding: "5px", borderRadius: "12px" }}
                  // @ts-ignore
                  src={img.url}
                  preview={false}
                  onClick={() => deleteImg(idx)}
                />
              ))}
            </Image.PreviewGroup>
          </div>
          <span
            style={{ cursor: "pointer" }}
            onClick={() => setEmoSelect(!emoSelect)}
          >
            <SmileOutlined />
            <span style={{ fontSize: "1.4rem", padding: "0 22px 0 5px" }}>
              表情
            </span>
          </span>
          <Upload {...props}>
            <span style={{ cursor: "pointer" }}>
              <PictureOutlined />
              <span style={{ fontSize: "1.4rem", padding: "0 22px 0 5px" }}>
                图片
              </span>
            </span>
          </Upload>
        </Contral>
        <div style={{ clear: "both" }}></div>
      </TextBody>
      {emoSelect ? (
        <Picker
          style={{ position: "absolute" }}
          onSelect={(emo) => addEmo(emo)}
        />
      ) : null}
      <div style={{ margin: "20px", textAlign: "right" }}>
        <Tooltip
          title={
            !params.content || !params.classFrom
              ? "板块或内容都是必须的哦～"
              : ""
          }
          arrowPointAtCenter
        >
          <Button
            disabled={!params.content || !params.classFrom}
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
