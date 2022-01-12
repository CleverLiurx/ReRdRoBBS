import React, { useEffect, useState } from "react";
import { useAuth } from "context/auth-context";
import { ReactComponent as SoftwareLogo } from "assets/img/logo-name.svg";
import styled from "@emotion/styled";
import { Row } from "components/lib";
import { Button, Dropdown, Input, Menu } from "antd";
import { Navigate, Route, Routes } from "react-router";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { resetRoute } from "utils";
import { HomePage } from "./home";
import { TerminalPage } from "./terminal";
import { SearchOutlined } from "@ant-design/icons";
import { TopicDetail } from "./topic-detail";
import { ReleaseRapidly } from "./release-rapidly";
import { ReleaseComplete } from "./release-complete";
import { ClassPage } from "./class";
import { PersonalPage } from "./personal";
const suffix = (
  <SearchOutlined
    style={{
      fontSize: 16,
      color: "#ccc",
    }}
    className="btn"
  />
);
/**
 * grid 和 flex 各自的应用场景
 * 1. 要考虑，是一维布局 还是 二维布局
 * 一般来说，一维布局用flex，二维布局用grid
 * 2. 是从内容出发还是从布局出发？
 * 从内容出发：你先有一组内容(数量一般不固定),然后希望他们均匀的分布在容器中，由内容自己的大小决定占据的空间
 * 从布局出发：先规划网格(数量一般比较固定)，然后再把元素往里填充
 * 从内容出发，用flex
 * 从布局出发，用grid
 *
 */

export const AuthenticatedApp = () => {
  return (
    <Container>
      <PageHeader />
      <Main>
        <Routes>
          <Route path={"home"} element={<HomePage />} />
          <Route path={"terminal"} element={<TerminalPage />} />
          <Route path={"topic/:id"} element={<TopicDetail />} />
          <Route path={"release-rapidly"} element={<ReleaseRapidly />} />
          <Route path={"release-complete"} element={<ReleaseComplete />} />
          <Route path={"class/:id"} element={<ClassPage />} />
          <Route path={"personal/:id"} element={<PersonalPage />} />
          <Route path="*" element={<Navigate to="home" />} />
        </Routes>
      </Main>
    </Container>
  );
};

const usePath = (callback: (name: string) => void) => {
  const { pathname } = useLocation();
  useEffect(() => {
    const name = pathname.split("/")[1] || "";
    callback(name);
    // eslint-disable-next-line
  }, [pathname]);
};

const ToLogin = () => {
  let navigate = useNavigate();
  const handleClick = () => {
    navigate("/auth");
  };
  return (
    <Button onClick={handleClick} type="primary" style={{ marginLeft: "30px" }}>
      登录
    </Button>
  );
};

const ToLogout = () => {
  let navigate = useNavigate();
  const { logout } = useAuth();
  const handleClick = () => {
    logout();
    navigate("/auth");
  };
  return <DrowItem onClick={handleClick}>退出登录</DrowItem>;
};
const PageHeader = () => {
  let navigate = useNavigate();
  const { user } = useAuth();
  const [path, setPath] = useState("");
  usePath(setPath);
  return (
    <div style={{ height: "64px" }}>
      <Header between={true}>
        <HeaderLeft gap={true}>
          <SoftwareLogo
            onClick={resetRoute}
            width={"18rem"}
            color={"rgb(38, 132, 255)"}
            cursor={"pointer"}
          />
          <LinkItem to={"home"} className={path === "home" ? "active" : ""}>
            文章
          </LinkItem>
          <LinkItem
            to={"terminal"}
            className={path === "terminal" ? "active" : ""}
          >
            工具
          </LinkItem>
        </HeaderLeft>
        <HeaderRight>
          <CircleInput placeholder="搜索标题" suffix={suffix} />
          {user ? (
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item key={"userpage"}>
                    <DrowItem onClick={() => navigate(`/personal/${user._id}`)}>
                      个人主页
                    </DrowItem>
                  </Menu.Item>
                  <Menu.Item key={"logout"}>
                    <ToLogout />
                  </Menu.Item>
                </Menu>
              }
            >
              <Button type={"link"} onClick={(e) => e.preventDefault()}>
                Hi, {user?.username}
              </Button>
            </Dropdown>
          ) : (
            <ToLogin />
          )}
        </HeaderRight>
      </Header>
    </div>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
`;

// grid-area 用来给grid子元素起名字
const Header = styled(Row)`
  width: 100%;
  height: 64px;
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
  background-color: #fff;
  position: fixed;
  left: 0;
  top: 0;
`;

const DrowItem = styled.div`
  font-size: 1rem;
  text-align: center;
`;

const CircleInput = styled(Input)`
  border-radius: 17px;
  width: 120px;
  &:hover {
    width: 200px;
    .btn {
      color: #fff !important;
      padding: 5px;
      border-radius: 50%;
      background-color: #f77c34;
      cursor: pointer;
    }
  }
  & > input {
    font-size: 1rem;
  }
`;

const LinkItem = styled(Link)`
  color: #000;
  &.active {
    color: #ea540b;
    font-weight: 600;
  }
`;

const HeaderLeft = styled(Row)``;
const HeaderRight = styled(Row)``;
const Main = styled.main``;
