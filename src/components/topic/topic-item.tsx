import React, { useState } from "react";
import { Comment, Avatar, Tooltip, Image } from "antd";
import moment from "moment";
import { Topic } from "types/topic";
import styled from "@emotion/styled";
import { StarOutlined } from "@ant-design/icons";
import { useHttp } from "utils/http";
import { useNavigate } from "react-router";
import PariseImg from "assets/img/parise.png";

interface ParamType {
  topicId: string;
  type: string;
}

export const TopicItem = ({
  topicItem: topic,
  showFrom = true,
}: {
  topicItem: Topic;
  showFrom: boolean;
}) => {
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
        {/* <LikeOutlined style={{ color: topicItem.hadParise ? "#EA540B" : "" }} /> */}
        <PImg
          style={
            topicItem.hadParise
              ? {
                  border: "1px solid #EA540B",
                  background: "rgba(255,125,65,.1)",
                }
              : {}
          }
        >
          <img src={PariseImg} alt="" />
          <span>{topicItem.praiseCount}</span>
        </PImg>
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
          {showFrom ? (
            <>
              来自
              {/* eslint-disable-next-line */}
              <a onClick={() => navigate(`/class/${topicItem.classFrom._id}`)}>
                {topicItem.classFrom.classname}
              </a>
            </>
          ) : null}
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

const PImg = styled.div`
  width: 60px;
  height: 32px;
  display: inline-block;
  margin-right: 12px;
  border: 1px solid #eee;
  border-radius: 16px;
  padding: 0px 9px;
  &:hover {
    border: 1px solid #ea540b;
  }

  img {
    width: 24px;
    height: 24px;
    margin: 3px 4px 0 0;
  }

  span {
    color: #999;
    float: right;
    line-height: 32px;
  }
`;
