import styled from "@emotion/styled";
import React from "react";

export const HomePage = () => {
  return (
    <Main>
      <MainContainterLeft>1</MainContainterLeft>
      <MainContainterRight>2</MainContainterRight>
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
