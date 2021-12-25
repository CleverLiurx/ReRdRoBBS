import React, { useState } from "react";
import { Comment, Avatar, Tooltip, Image } from "antd";
import moment from "moment";
import { Topic } from "types/topic";
import styled from "@emotion/styled";
import { LikeOutlined, StarOutlined } from "@ant-design/icons";
import { useHttp } from "utils/http";
import { useNavigate } from "react-router";

interface ParamType {
  topicId: string;
  type: string;
}

export const TopicItem = ({ topicItem: topic }: { topicItem: Topic }) => {
  let [topicItem, setTopicItem] = useState(topic);
  const TopicHandle = (param: ParamType) => {
    const client = useHttp();
    client(`/${param.type}`, {
      data: { topicId: param.topicId },
      method: "PATCH",
    }).then(setTopicItem);
  };
  const actions = [
    <Tooltip
      key="comment-basic-like"
      title={topicItem.hadParise ? "取消点赞" : "点赞"}
    >
      <span
        onClick={() => {
          TopicHandle({ topicId: topicItem._id, type: "parise" });
        }}
      >
        <LikeOutlined style={{ color: topicItem.hadParise ? "#EA540B" : "" }} />
        <span style={{ padding: "0 14px 0 2px" }}>{topicItem.praiseCount}</span>
      </span>
    </Tooltip>,
    <Tooltip
      key="comment-basic-like"
      title={topicItem.hadStar ? "取消收藏" : "收藏"}
    >
      <span
        onClick={() => {
          TopicHandle({ topicId: topicItem._id, type: "star" });
        }}
      >
        <StarOutlined style={{ color: topicItem.hadStar ? "#EA540B" : "" }} />
        <span style={{ padding: "0 14px 0 2px" }}>{topicItem.starCount}</span>
      </span>
    </Tooltip>,
    <span key="comment-basic-reply-to">
      回复
      <span style={{ padding: "0 14px 0 2px" }}>{topicItem.replyCount}</span>
    </span>,
  ];

  let navigate = useNavigate();

  return (
    <Comment
      actions={actions}
      author={<span>{topicItem.createBy.username}</span>}
      avatar={<Avatar src={topicItem.createBy.avator} alt="Han Solo" />}
      content={
        <div>
          <h2 style={{ fontSize: "18px" }}>{topicItem.title}</h2>
          <ElliP
            onClick={() => {
              navigate(`/topic/${topicItem._id}`);
            }}
          >
            {topicItem.content}
          </ElliP>
          <Image.PreviewGroup>
            {topicItem.topicImage.map((img) => (
              <Image
                key={img._id}
                width={120}
                height={120}
                style={{ padding: "5px", borderRadius: "12px" }}
                src={img.url}
              />
            ))}
          </Image.PreviewGroup>
        </div>
      }
      datetime={
        <span>
          <span style={{ paddingRight: "10px" }}>
            {moment(topicItem.createTime).fromNow()}
          </span>
          来自
          {/* eslint-disable-next-line */}
          <a onClick={() => navigate(`/class/${topicItem.classFrom._id}`)}>
            {topicItem.classFrom.classname}
          </a>
        </span>
      }
    />
  );
};

const ElliP = styled.p`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  cursor: pointer;
`;
