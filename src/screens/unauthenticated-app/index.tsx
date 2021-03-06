/* eslint-disable jsx-a11y/anchor-is-valid */
import styled from "@emotion/styled";
import { Button, Card, Divider } from "antd";
import left from "assets/img/left.svg";
import right from "assets/img/right.svg";
import React, { useState } from "react";
import { LoginScreen } from "screens/unauthenticated-app/login";
import { RegisterScreen } from "screens/unauthenticated-app/register";
import { useDocumentTitle } from "utils/index";

export const UnauthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useDocumentTitle("登录或注册以继续");
  return (
    <Container>
      <Header />
      <Background />
      <ShadowCard>
        <Title>{isRegister ? "请注册" : "请登录"}</Title>
        <ErrorTip>{error?.message}</ErrorTip>
        {isRegister ? (
          <RegisterScreen onError={setError} />
        ) : (
          <LoginScreen onError={setError} />
        )}
        <Divider />
        <SwitchBtn onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? "已经有账号了？去登录" : "没有账号？注册新账号"}
        </SwitchBtn>
      </ShadowCard>
    </Container>
  );
};

export const LongButton = styled(Button)`
  width: 100%;
`;

const Title = styled.h2`
  /* margin-bottom: 1em; */
  text-align: center;
  color: rgb(94, 108, 132);
`;

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: left bottom, right bottom;
  background-size: calc(((100vw - 40rem) / 2) - 3.2rem),
    calc(((100vw - 40rem) / 2) - 3.2rem), cover;
  background-image: url(${left}), url(${right});
`;

const Header = styled.header`
  padding: 5rem 0;
  background-size: 8rem;
  width: 100%;
`;

const ShadowCard = styled(Card)`
  width: 40rem;
  min-height: 56rem;
  padding: 3.2rem 4rem;
  border-radius: 0.3rem;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
  /* text-align: center; */
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;

const ErrorTip = styled.div`
  color: #ff4d4f;
  text-align: center;
  height: 26px;
  margin: 1rem 0;
`;

const SwitchBtn = styled.div`
  text-align: center;
  color: #ea540b;
  cursor: pointer;
`;
