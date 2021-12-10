import React from "react";
import styled from "@emotion/styled";
import { Button } from "antd";
import { EditOutlined } from "@ant-design/icons";

export const EditAction = () => {
  return (
    <Container>
      <Button
        type="primary"
        shape="round"
        icon={<EditOutlined />}
        size={"large"}
        style={{ width: "320px" }}
      >
        发布
      </Button>
    </Container>
  );
};

const Container = styled.div`
  margin-bottom: 20px;
  width: 360px;
  padding: 20px 0;
  background-color: #fff;
  border-radius: 4px;
  padding-left: 20px;
`;
