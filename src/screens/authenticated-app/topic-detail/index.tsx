import React, { ReactElement, ReactNode, useEffect } from "react";
import styled from "@emotion/styled";
import { useDocumentTitle } from "utils";
import { Comment, Avatar, Tooltip, Image, CommentProps } from "antd";
import { useHttp } from "utils/http";
import moment from "moment";
import { useAsync } from "utils/use-async";
import { Reply, Topic } from "types/topic";
import { LikeOutlined, StarOutlined } from "@ant-design/icons";
import { useAuth } from "context/auth-context";

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
              style={{ color: topicItem.hadParise ? "#0052cc" : "" }}
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
              style={{ color: topicItem.hadStar ? "#0052cc" : "" }}
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
                    <span style={{ color: "#0052cc" }}>
                      {topicItem.classFrom.classname}
                    </span>
                  </span>
                }
              />
            ) : null}
          </div>
          <ReplyCart replys={topicItem?.reply || []} />
        </ContainerLeft>
      </MainContainterLeft>
      <MainContainterRight>
        <Author />
      </MainContainterRight>
    </Main>
  );
};

const Author = () => {
  const { user } = useAuth();
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
          <div style={{ color: "#0052cc" }}>{user?.record.topicCount}</div>
          <div>文章</div>
        </div>
        <div style={{ width: "33.33%", display: "inline-block" }}>
          <div style={{ color: "#0052cc" }}>{user?.record.bePraiseCount}</div>
          <div>被点赞</div>
        </div>
        <div style={{ width: "33.33%", display: "inline-block" }}>
          <div style={{ color: "#0052cc" }}>{user?.record.beStarCount}</div>
          <div>被收藏</div>
        </div>
      </div>
    </ContainerRight>
  );
};

const ReplyCart = ({ replys }: { replys: Reply[] }) => {
  const ExampleComment = ({
    children,
    reply,
  }: {
    children?: ReactNode;
    reply?: Reply;
  }) => (
    <Comment
      actions={
        reply?.hasChild ? [<span key="comment-nested-reply-to">回复</span>] : []
      }
      author={<span>{reply?.createBy.username}</span>}
      avatar={
        <Avatar
          size={!reply?.hasChild ? 20 : 32}
          src={reply?.createBy.avator}
          alt="Han Solo"
        />
      }
      content={<p style={{ fontSize: "1.3rem" }}>{reply?.content}</p>}
    >
      {children}
    </Comment>
  );
  return (
    <div>
      {replys.map((r1) => {
        return (
          <ExampleComment reply={r1}>
            {r1.reply.map((r2) => {
              return <ExampleComment reply={r2} />;
            })}
          </ExampleComment>
        );
      })}
    </div>
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
