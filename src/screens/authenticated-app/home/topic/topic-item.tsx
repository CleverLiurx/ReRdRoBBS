import React from "react";
import { Comment, Avatar, Tooltip } from "antd";
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
    </Tooltip>,
    <span style={{ paddingRight: "14px" }}>{topicItem.praiseCount}</span>,
    <Tooltip key="comment-basic-like" title="收藏">
      {star}
    </Tooltip>,
    <span style={{ paddingRight: "14px" }}>{topicItem.starCount}</span>,
    <span key="comment-basic-reply-to">回复</span>,
  ];

  return (
    <Comment
      actions={actions}
      author={<a>{topicItem.createBy.username}</a>}
      avatar={<Avatar src={topicItem.createBy.avator} alt="Han Solo" />}
      content={<ElliP>{topicItem.content}</ElliP>}
      datetime={
        <span>
          <span style={{ paddingRight: "10px" }}>
            {moment(topicItem.createTime).fromNow()}
          </span>
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
`;
