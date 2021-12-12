import React from "react";
import styled from "@emotion/styled";
import { EditAction } from "./edit-action";
import { Banner } from "./banner";
import { TopicList } from "./topic";
import { useDocumentTitle } from "utils";

export const HomePage = () => {
  useDocumentTitle("全部文章");

  return (
    <Main>
      <MainContainterLeft>
        <Banner></Banner>
        <TopicList />
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
