import React from "react";
import styled from "@emotion/styled";
import { Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { useAuth } from "context/auth-context";

export const EditAction = ({ classId }: { classId?: string }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const link2Publish = () => {
    user
      ? navigate("/release-rapidly", { state: { classId } })
      : navigate("/auth");
  };
  return (
    <Container>
      <Button
        type="primary"
        shape="round"
        icon={<EditOutlined />}
        size={"large"}
        style={{ width: "320px" }}
        onClick={link2Publish}
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
