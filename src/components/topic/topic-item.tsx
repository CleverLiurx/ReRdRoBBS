import React, { useState } from "react";
import { Comment, Avatar, Tooltip, Image } from "antd";
import moment from "moment";
import { Topic } from "types/topic";
import styled from "@emotion/styled";
import { useHttp } from "utils/http";
import { useNavigate } from "react-router";
import PariseImg from "assets/img/parise.png";
import starImg from "assets/img/star.png";
import LazyLoad from "react-lazyload";

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
        <PImg
          style={
            topicItem.hadStar
              ? {
                  border: "1px solid #EA540B",
                  background: "rgba(255,125,65,.1)",
                }
              : {}
          }
        >
          <img src={starImg} alt="" />
          <span>{topicItem.starCount}</span>
        </PImg>
      </span>
    </Tooltip>,
    <ReplyCart key="comment-basic-reply-to">
      <i>回复</i>
      <span>{topicItem.replyCount}</span>
    </ReplyCart>,
  ];

  let navigate = useNavigate();

  return (
    <Comment
      actions={actions}
      author={<span>{topicItem.createBy.username}</span>}
      avatar={
        <span onClick={() => navigate(`/personal/${topicItem.createBy._id}`)}>
          <Avatar src={topicItem.createBy.avator} alt="" />
        </span>
      }
      content={
        <div>
          <h2
            style={{ fontSize: "18px", cursor: "pointer" }}
            onClick={() => {
              navigate(`/topic/${topicItem._id}`);
            }}
          >
            {topicItem.title}
          </h2>
          <ElliP
            onClick={() => {
              navigate(`/topic/${topicItem._id}`);
            }}
          >
            {topicItem.content}
          </ElliP>
          <LazyLoad height={120} once>
            <Image.PreviewGroup>
              {topicItem.topicImage.map((img) => (
                <Image
                  key={img._id}
                  width={120}
                  height={120}
                  style={{ padding: "5px", borderRadius: "12px" }}
                  src={img.url}
                  fallback="data:image/png;base64,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"
                />
              ))}
            </Image.PreviewGroup>
          </LazyLoad>
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

const ReplyCart = styled.div`
  height: 32px;
  width: 40px;
  font-size: 1.2rem;
  position: relative;
  cursor: pointer;
  span,
  i {
    position: absolute;
    top: 22px;
  }
  span {
    right: 0;
  }
`;
