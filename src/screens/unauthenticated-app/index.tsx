import styled from "@emotion/styled";
import { Card, Divider } from "antd";
import React from "react";
import { useState } from "react";
import { LoginScreen } from "./login";
import { RegisterScreen } from "./register";

export const UnauthentictedApp = () => {
  const [isRegister, setIsRegister] = useState(false);
  return (
    <Container>
      <ShodowCard>
        {isRegister ? <RegisterScreen /> : <LoginScreen />}
        <Divider></Divider>
        <button onClick={() => setIsRegister(!isRegister)}>
          切换到{isRegister ? "登录" : "注册"}
        </button>
      </ShodowCard>
    </Container>
  );
};

const ShodowCard = styled(Card)`
  width: 40rem;
  min-height: 56rem;
  padding: 3.2rem;
  border-radius: 0.3rem;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.1) 0 10px;
  text-align: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;
