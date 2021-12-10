import React from "react";
import styled from "@emotion/styled";
import { EditAction } from "./edit-action";
import { Banner } from "./banner";

export const HomePage = () => {
  return (
    <Main>
      <MainContainterLeft>
        <Banner></Banner>
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
