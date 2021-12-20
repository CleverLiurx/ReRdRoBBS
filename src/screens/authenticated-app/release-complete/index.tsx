import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Classes } from "types/classes";
import { useHttp } from "utils/http";
import { useAsync } from "utils/use-async";
import styled from "@emotion/styled";
import { Button, Input, Select } from "antd";
import { useDocumentTitle } from "utils";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
// @ts-ignore
import quillEmoji from "quill-emoji";
import "quill-emoji/dist/quill-emoji.css";
const { EmojiBlot, ShortNameEmoji, ToolbarEmoji, TextAreaEmoji } = quillEmoji;

// Quill.register({
//     'formats/emoji': EmojiBlot,
//     // 'formats/video': VideoBlot,
//     'modules/emoji-shortname': ShortNameEmoji,
//     'modules/emoji-toolbar': ToolbarEmoji,
//     'modules/emoji-textarea': TextAreaEmoji,
//     // 'modules/ImageExtend': ImageExtend, //拖拽图片扩展组件
//     // 'modules/ImageDrop': ImageDrop, //复制粘贴组件
//   }, true);
const modules = {
  toolbar: {
    container: [
      [{ size: ["small", false, "large", "huge"] }], //字体设置
      // [{ 'header': [1, 2, 3, 4, 5, 6, false] }], //标题字号，不能设置单个字大小
      ["bold", "italic", "underline", "strike"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"], // a链接和图片的显示
      [{ align: [] }],
      [
        {
          background: [
            "rgb(  0,   0,   0)",
            "rgb(230,   0,   0)",
            "rgb(255, 153,   0)",
            "rgb(255, 255,   0)",
            "rgb(  0, 138,   0)",
            "rgb(  0, 102, 204)",
            "rgb(153,  51, 255)",
            "rgb(255, 255, 255)",
            "rgb(250, 204, 204)",
            "rgb(255, 235, 204)",
            "rgb(255, 255, 204)",
            "rgb(204, 232, 204)",
            "rgb(204, 224, 245)",
            "rgb(235, 214, 255)",
            "rgb(187, 187, 187)",
            "rgb(240, 102, 102)",
            "rgb(255, 194, 102)",
            "rgb(255, 255, 102)",
            "rgb(102, 185, 102)",
            "rgb(102, 163, 224)",
            "rgb(194, 133, 255)",
            "rgb(136, 136, 136)",
            "rgb(161,   0,   0)",
            "rgb(178, 107,   0)",
            "rgb(178, 178,   0)",
            "rgb(  0,  97,   0)",
            "rgb(  0,  71, 178)",
            "rgb(107,  36, 178)",
            "rgb( 68,  68,  68)",
            "rgb( 92,   0,   0)",
            "rgb(102,  61,   0)",
            "rgb(102, 102,   0)",
            "rgb(  0,  55,   0)",
            "rgb(  0,  41, 102)",
            "rgb( 61,  20,  10)",
          ],
        },
      ],
      [
        {
          color: [
            "rgb(  0,   0,   0)",
            "rgb(230,   0,   0)",
            "rgb(255, 153,   0)",
            "rgb(255, 255,   0)",
            "rgb(  0, 138,   0)",
            "rgb(  0, 102, 204)",
            "rgb(153,  51, 255)",
            "rgb(255, 255, 255)",
            "rgb(250, 204, 204)",
            "rgb(255, 235, 204)",
            "rgb(255, 255, 204)",
            "rgb(204, 232, 204)",
            "rgb(204, 224, 245)",
            "rgb(235, 214, 255)",
            "rgb(187, 187, 187)",
            "rgb(240, 102, 102)",
            "rgb(255, 194, 102)",
            "rgb(255, 255, 102)",
            "rgb(102, 185, 102)",
            "rgb(102, 163, 224)",
            "rgb(194, 133, 255)",
            "rgb(136, 136, 136)",
            "rgb(161,   0,   0)",
            "rgb(178, 107,   0)",
            "rgb(178, 178,   0)",
            "rgb(  0,  97,   0)",
            "rgb(  0,  71, 178)",
            "rgb(107,  36, 178)",
            "rgb( 68,  68,  68)",
            "rgb( 92,   0,   0)",
            "rgb(102,  61,   0)",
            "rgb(102, 102,   0)",
            "rgb(  0,  55,   0)",
            "rgb(  0,  41, 102)",
            "rgb( 61,  20,  10)",
          ],
        },
      ],
      ["clean"], //清空
      ["emoji"], //emoji表情，设置了才能显示
      ["video2"], //我自定义的视频图标，和插件提供的不一样，所以设置为video2
    ],
    //   handlers: {
    //     'image': this.imageHandler.bind(this), //点击图片标志会调用的方法
    //     'video2': this.showVideoModal.bind(this),
    //   },
  },
  // ImageExtend: {
  //   loading: true,
  //   name: 'img',
  //   action: RES_URL + "connector?isRelativePath=true",
  //   response: res => FILE_URL + res.info.url
  // },
  // ImageDrop: true,
  "emoji-toolbar": true, //是否展示出来
  "emoji-textarea": false, //我不需要emoji展示在文本框所以设置为false
  "emoji-shortname": true,
};
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
      <Input
        placeholder="在这里输入标题"
        style={{
          fontSize: "2.1rem",
          border: "none",
          outline: "none",
          boxShadow: "none",
        }}
      />

      <div style={{ minHeight: "300px" }}>
        <TextBody id="content" theme="snow" modules={modules} />
      </div>
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

const TextBody = styled(ReactQuill)`
  & > .ql-container {
    min-height: 230px;
  }
`;
