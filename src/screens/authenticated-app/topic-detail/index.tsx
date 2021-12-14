import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useDocumentTitle } from "utils";
import { Comment, Avatar, Tooltip, Image } from "antd";
import { useHttp } from "utils/http";
import moment from "moment";
import { useAsync } from "utils/use-async";
import { Topic } from "types/topic";
import { LikeOutlined, StarOutlined } from "@ant-design/icons";
import { useAuth } from "context/auth-context";

interface ParamType {
  topicId: string | undefined;
  type: string;
}

const useDetails = (param: string) => {
  const { user } = useAuth();
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
          {topicItem ? (
            <Comment
              actions={actions}
              author={<span>{topicItem.createBy.username}</span>}
              avatar={<Avatar src={topicItem.createBy.avator} alt="Han Solo" />}
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
                  来自<a>{topicItem.classFrom.classname}</a>
                </span>
              }
            />
          ) : null}
        </ContainerLeft>
      </MainContainterLeft>
      <MainContainterRight>
        <Author />
      </MainContainterRight>
    </Main>
  );
};

const Author = () => {
  return <ContainerRight>关于作者</ContainerRight>;
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
  padding: 20px 0;
  background-color: #fff;
  border-radius: 4px;
  padding-left: 20px;
`;
const ContainerLeft = styled.div`
  width: 740px;
  padding: 20px 0;
  background-color: #fff;
  border-radius: 4px;
  padding: 15px;
`;
