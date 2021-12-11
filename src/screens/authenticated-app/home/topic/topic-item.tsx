import React from "react";
import { Comment, Avatar, Tooltip, Image } from "antd";
import moment from "moment";
import { Topic } from "types/topic";
import styled from "@emotion/styled";
import { LikeOutlined, LikeFilled, StarOutlined } from "@ant-design/icons";

export const TopicItem = ({ topicItem }: { topicItem: Topic }) => {
  const parise = topicItem.hadParise ? <LikeFilled /> : <LikeOutlined />;
  const star = topicItem.hadStar ? <StarOutlined /> : <StarOutlined />;
  const actions = [
    <Tooltip key="comment-basic-like" title="点赞">
      {parise}
      <span style={{ padding: "0 14px 0 2px" }}>{topicItem.praiseCount}</span>
    </Tooltip>,
    <Tooltip key="comment-basic-like" title="收藏">
      {star}
      <span style={{ padding: "0 14px 0 2px" }}>{topicItem.starCount}</span>
    </Tooltip>,
    <span key="comment-basic-reply-to">
      回复
      <span style={{ padding: "0 14px 0 2px" }}>{topicItem.replyCount}</span>
    </span>,
  ];

  return (
    <Comment
      actions={actions}
      author={<span>{topicItem.createBy.username}</span>}
      avatar={<Avatar src={topicItem.createBy.avator} alt="Han Solo" />}
      content={
        <div>
          <h2 style={{ fontSize: "18px" }}>{topicItem.title}</h2>
          <ElliP>{topicItem.content}</ElliP>
          <Image.PreviewGroup>
            {topicItem.topicImage.map((img) => (
              <Image key={img._id} width={100} height={100} src={img.url} />
            ))}
          </Image.PreviewGroup>
        </div>
      }
      datetime={
        <span>
          <span style={{ paddingRight: "10px" }}>
            {moment(topicItem.createTime).fromNow()}
          </span>
          {/* eslint-disable-next-line */}
          来自<a>{topicItem.classFrom.classname}</a>
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
