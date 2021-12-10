import React from "react";
import styled from "@emotion/styled";
import { EditAction } from "./edit-action";
import { Banner } from "./banner";
import { Topic } from "./topic";

const list = [
  {
    title: "title",
    createBy: "Liurx",
    content: "test",
    topicImage: "",
    hitsCount: 0,
    praiseCount: 11,
    starCount: 22,
    replyCount: 100,
  },
  {
    title: "哈哈哈",
    createBy: "Liurx",
    content: "test",
    topicImage: "",
    hitsCount: 0,
    praiseCount: 11,
    starCount: 22,
    replyCount: 100,
  },
  {
    title: "11",
    createBy: "Liurx",
    content: "test",
    topicImage: "",
    hitsCount: 0,
    praiseCount: 11,
    starCount: 22,
    replyCount: 100,
  },
  {
    title: "22",
    createBy: "Liurx",
    content: "test",
    topicImage: "",
    hitsCount: 0,
    praiseCount: 11,
    starCount: 22,
    replyCount: 100,
  },
  {
    title: "rr",
    createBy: "Liurx",
    content: "test",
    topicImage: "",
    hitsCount: 0,
    praiseCount: 11,
    starCount: 22,
    replyCount: 100,
  },
  {
    title: "hh",
    createBy: "Liurx",
    content: "test",
    topicImage: "",
    hitsCount: 0,
    praiseCount: 11,
    starCount: 22,
    replyCount: 100,
  },
  {
    title: "nn",
    createBy: "Liurx",
    content: "test",
    topicImage: "",
    hitsCount: 0,
    praiseCount: 11,
    starCount: 22,
    replyCount: 100,
  },
  {
    title: "mm",
    createBy: "Liurx",
    content: "test",
    topicImage: "",
    hitsCount: 0,
    praiseCount: 11,
    starCount: 22,
    replyCount: 100,
  },
];
export const HomePage = () => {
  return (
    <Main>
      <MainContainterLeft>
        <Banner></Banner>
        <Topic topicList={list}></Topic>
      </MainContainterLeft>
      <MainContainterRight>
        <EditAction />
      </MainContainterRight>
    </Main>
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
