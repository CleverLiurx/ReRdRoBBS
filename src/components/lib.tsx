import React from "react";
import { Spin } from "antd";
import styled from "@emotion/styled";

const FullPage = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const FullPageLoading = () => (
  <FullPage>
    <Spin size={"large"}></Spin>
  </FullPage>
);
