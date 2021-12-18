import React, { ReactNode, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useDocumentTitle } from "utils";
import { Comment, Avatar, Tooltip, Image, Form, Button } from "antd";
import { useHttp } from "utils/http";
import moment from "moment";
import { useAsync } from "utils/use-async";
import { Reply, Topic } from "types/topic";
import { UserMini } from "types/user";
import {
  LikeOutlined,
  StarOutlined,
  SmileOutlined,
  PictureOutlined,
} from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";

interface ParamType {
  topicId: string | undefined;
  type: string;
}

const useDetails = (param: string) => {
  const client = useHttp();
  const { run, ...result } = useAsync<Topic>();

  useEffect(() => {
    run(client(`topic/${param}`));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);

  return result;
};
export const TopicDetail = () => {
  useDocumentTitle("文章详情");

  const id = window.location.pathname.split("topic/")[1];
  let { data: topicItem, setData } = useDetails(id);

  const TopicHandle = (param: ParamType) => {
    const client = useHttp();
    client(`/${param.type}`, {
      data: { topicId: param.topicId },
      method: "PATCH",
    }).then(setData);
  };

  const actions = topicItem
    ? [
        <Tooltip
          key="comment-basic-like"
          title={topicItem.hadParise ? "取消点赞" : "点赞"}
        >
          <span
            onClick={() => {
              TopicHandle({ topicId: topicItem?._id, type: "parise" });
            }}
          >
            <LikeOutlined
              style={{ color: topicItem.hadParise ? "#EA540B" : "" }}
            />
            <span style={{ padding: "0 14px 0 2px" }}>
              {topicItem.praiseCount}
            </span>
          </span>
        </Tooltip>,
        <Tooltip
          key="comment-basic-like"
          title={topicItem.hadStar ? "取消收藏" : "收藏"}
        >
          <span
            onClick={() => {
              TopicHandle({ topicId: topicItem?._id, type: "star" });
            }}
          >
            <StarOutlined
              style={{ color: topicItem.hadStar ? "#EA540B" : "" }}
            />
            <span style={{ padding: "0 14px 0 2px" }}>
              {topicItem.starCount}
            </span>
          </span>
        </Tooltip>,
      ]
    : [<div></div>];
  return (
    <Main>
      <MainContainterLeft>
        <ContainerLeft>
          <div>
            {topicItem ? (
              <Comment
                actions={actions}
                author={<span>{topicItem.createBy.username}</span>}
                avatar={
                  <Avatar src={topicItem.createBy.avator} alt="Han Solo" />
                }
                content={
                  <div>
                    <h2 style={{ fontSize: "18px" }}>{topicItem.title}</h2>
                    <p>{topicItem.content}</p>
                    {topicItem.topicImage.map((img) => (
                      <Image key={img._id} src={img.url} preview={false} />
                    ))}
                  </div>
                }
                datetime={
                  <span>
                    <span style={{ paddingRight: "10px" }}>
                      {moment(topicItem.createTime).fromNow()}
                    </span>
                    来自
                    <span style={{ color: "#EA540B" }}>
                      {topicItem.classFrom.classname}
                    </span>
                  </span>
                }
              />
            ) : null}
          </div>
          {/* <div style={{ borderBottom: "1px solid #DDD" }}></div> */}
          {/* <Editor></Editor> */}
          {topicItem?._id ? (
            <ReplyCart
              topicId={topicItem?._id || ""}
              replys={topicItem?.reply || []}
            />
          ) : null}
        </ContainerLeft>
      </MainContainterLeft>
      <MainContainterRight>
        <Author user={topicItem?.createBy} />
      </MainContainterRight>
    </Main>
  );
};

const Author = ({ user }: { user?: UserMini }) => {
  // const { user } = useAuth();
  return (
    <ContainerRight>
      <img
        style={{
          width: "90px",
          height: "90px",
          borderRadius: "50%",
          margin: "20px",
        }}
        src={user?.avator}
        alt={user?.username}
      />
      <div style={{ color: "#9B9B9B", fontSize: "1.2rem", margin: "5px" }}>
        {user?.username}
      </div>
      <div style={{ color: "#9B9B9B", fontSize: "1.2rem", margin: "5px" }}>
        {user?.email || "13131451002@163.com"}
      </div>
      <div style={{ marginTop: "20px" }}>
        <div style={{ width: "33.33%", display: "inline-block" }}>
          <div style={{ color: "#EA540B" }}>{user?.record.topicCount}</div>
          <div>文章</div>
        </div>
        <div style={{ width: "33.33%", display: "inline-block" }}>
          <div style={{ color: "#EA540B" }}>{user?.record.bePraiseCount}</div>
          <div>被点赞</div>
        </div>
        <div style={{ width: "33.33%", display: "inline-block" }}>
          <div style={{ color: "#EA540B" }}>{user?.record.beStarCount}</div>
          <div>被收藏</div>
        </div>
      </div>
    </ContainerRight>
  );
};

const ReplyCart = ({
  replys,
  topicId,
}: {
  replys: Reply[];
  topicId: string;
}) => {
  let [activeReply, setActiveReply] = useState({
    topicId,
    pid: "",
    // centent: ""
  });

  const ExampleComment = ({
    children,
    reply,
  }: {
    children?: ReactNode;
    reply?: Reply;
  }) => (
    <Comment
      actions={
        reply?.hasChild
          ? [
              <span
                key="comment-nested-reply-to"
                onClick={() =>
                  setActiveReply({ ...activeReply, pid: reply?._id })
                }
              >
                回复
              </span>,
            ]
          : []
      }
      author={<span>{reply?.createBy.username}</span>}
      avatar={
        <img
          src={reply?.createBy.avator}
          style={
            !reply?.hasChild
              ? { width: "20px", height: "20px", borderRadius: "50%" }
              : { width: "32px", height: "32px", borderRadius: "50%" }
          }
          alt="Avactor"
        />
      }
      content={<p style={{ fontSize: "1.3rem" }}>{reply?.content}</p>}
    >
      {activeReply.pid === reply?._id ? (
        <Editor
          topicId={activeReply.topicId}
          pid={activeReply.pid}
          callback={() => setActiveReply({ ...activeReply, pid: "" })}
        />
      ) : null}
      {children}
    </Comment>
  );
  return (
    <div>
      <Editor topicId={activeReply.topicId} pid={""} />
      {replys.map((r1) => {
        return (
          <ExampleComment key={r1._id} reply={r1}>
            {r1.reply.map((r2) => {
              return <ExampleComment key={r2._id} reply={r2} />;
            })}
          </ExampleComment>
        );
      })}
    </div>
  );
};

const Editor = ({
  topicId,
  pid,
  callback,
}: {
  topicId: string;
  pid: string;
  callback?: () => void;
}) => {
  let [value, setValue] = useState("");
  const client = useHttp();
  const publishReply = () => {
    client("/reply", {
      data: { topicId, pid, content: value },
      method: "POST",
    }).then(() => {
      setValue("");
      callback && callback();
    });
  };
  return (
    <TextBody>
      <TextArea
        autoSize={{ minRows: 2, maxRows: 2 }}
        bordered={false}
        placeholder="评论一下～"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Contral>
        <SmileOutlined style={{ paddingRight: "20px" }} />
        <PictureOutlined />
        <ReplyBtn onClick={publishReply} type="primary" shape="round">
          发布
        </ReplyBtn>
      </Contral>
      <div style={{ clear: "both" }}></div>
    </TextBody>
  );
};

const Main = styled.div`
  width: 1120px;
  margin: 20px auto 0;
`;
const MainContainterLeft = styled.div`
  width: 740px;
  float: left;
`;
const MainContainterRight = styled.div`
  width: 360px;
  float: right;
`;

const ContainerRight = styled.div`
  margin-bottom: 20px;
  width: 360px;
  padding: 20px;
  background-color: #fff;
  border-radius: 4px;
  padding-left: 20px;
  text-align: center;
`;
const ContainerLeft = styled.div`
  width: 740px;
  padding: 20px;
  background-color: #fff;
  border-radius: 4px;
  padding: 15px;
`;

const TextBody = styled.div`
  border-radius: 5px;
  height: 95px;
  border: 1px solid #eee;
  &:hover {
    border: 1px solid #ea540b;
  }
`;

const Contral = styled.div`
  margin: 8px 0 5px 10px;
  color: #666;
`;

const ReplyBtn = styled(Button)`
  background: #ea540b;
  border: none;
  height: 25px;
  font-size: 1.4rem;
  float: right;
  margin-right: 20px;
`;
