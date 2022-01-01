import React, { useEffect } from "react";
import { User } from "types/user";
import { useDocumentTitle } from "utils";
import { useHttp } from "utils/http";
import { useAsync } from "utils/use-async";
import styled from "@emotion/styled";
import BGImage from "assets/img/personal-bg.png";
import { WomanOutlined, ManOutlined } from "@ant-design/icons";
import { Button, Descriptions } from "antd";

const useDetails = (_id: string) => {
  const client = useHttp();
  const { run, ...result } = useAsync<User>();

  useEffect(() => {
    run(client("/user", { data: { _id } }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_id]);

  return result;
};

export const PersonalPage = () => {
  useDocumentTitle("个人主页");

  const id = window.location.pathname.split("personal/")[1];
  let { data: user } = useDetails(id);

  return (
    <div>
      <Header>
        <img src={BGImage} alt="" />
      </Header>
      <div style={{ backgroundColor: "#fff" }}>
        <Detail>
          <div className="avator">
            <img src={user?.avator} alt="" />
          </div>
          <div className="edit">
            <Button style={{ color: "#ea540b" }}>编辑个人资料</Button>
          </div>
          <div className="user-info">
            <div>
              <span style={{ fontSize: "2.4rem", color: "#000" }}>
                {user?.username}
              </span>
              {user?.sex ? (
                <ManOutlined style={{ fontSize: "2.4rem", color: "#3590FF" }} />
              ) : (
                <WomanOutlined
                  style={{ fontSize: "2.4rem", color: "#FDDDED" }}
                />
              )}
            </div>
            <div className="record">
              <RecordItem>
                <i>{user?.record.bePraiseCount}</i>
                <span>被点赞</span>
              </RecordItem>
              <RecordItem>
                <i>{user?.record.praiseCount}</i>
                <span>点赞</span>
              </RecordItem>
              <RecordItem>
                <i>{user?.record.beStarCount}</i>
                <span>被收藏</span>
              </RecordItem>
              <RecordItem>
                <i>{user?.record.starCount}</i>
                <span>收藏</span>
              </RecordItem>
            </div>
            <Descriptions style={{ marginTop: "20px" }}>
              <Descriptions.Item
                contentStyle={{ fontSize: "1.2rem" }}
                labelStyle={{ fontSize: "1.2rem" }}
                label="邮箱"
              >
                {user?.email || "暂无"}
              </Descriptions.Item>
              <Descriptions.Item
                contentStyle={{ fontSize: "1.2rem" }}
                labelStyle={{ fontSize: "1.2rem" }}
                label="生日"
              >
                {user?.birthday || "暂无"}
              </Descriptions.Item>
              <Descriptions.Item
                contentStyle={{ fontSize: "1.2rem" }}
                labelStyle={{ fontSize: "1.2rem" }}
                label="星座"
              >
                暂无
              </Descriptions.Item>
              <Descriptions.Item
                contentStyle={{ fontSize: "1.2rem" }}
                labelStyle={{ fontSize: "1.2rem" }}
                label="爱好"
              >
                暂无
              </Descriptions.Item>
              <Descriptions.Item
                contentStyle={{ fontSize: "1.2rem" }}
                labelStyle={{ fontSize: "1.2rem" }}
                label="城市"
              >
                暂无
              </Descriptions.Item>
              <Descriptions.Item
                contentStyle={{ fontSize: "1.2rem" }}
                labelStyle={{ fontSize: "1.2rem" }}
                label="毕业院校"
              >
                暂无
              </Descriptions.Item>
              <Descriptions.Item
                contentStyle={{ fontSize: "1.2rem" }}
                labelStyle={{ fontSize: "1.2rem" }}
                label="家乡"
              >
                暂无
              </Descriptions.Item>
            </Descriptions>
          </div>
        </Detail>
      </div>
      <Tab />
    </div>
  );
};

const Tab = () => {
  return <TabContainer>hahah</TabContainer>;
};

const Header = styled.div`
  width: 100%;
  min-width: 1120px;
  height: 290px;
  img {
    width: 100%;
    height: 100%;
  }
`;

const Detail = styled.div`
  width: 1120px;
  height: 220px;
  margin: 0 auto;
  position: relative;

  .avator {
    position: absolute;
    width: 120px;
    height: 120px;
    top: -60px;
    left: 0;
    img {
      border-radius: 100%;
      width: 100%;
      height: 100%;
      border: 3px solid #fff;
    }
  }

  .edit {
    position: absolute;
    right: 20px;
    top: 20px;
  }

  .user-info {
    width: 960px;
    float: left;
    margin: 20px 0 20px 120px;
  }
`;

const RecordItem = styled.div`
  display: inline-block;
  padding-right: 20px;
  font-size: 14px;
  color: #999;
  i {
    color: #333;
    font-size: 18px;
    font-weight: 700;
    margin-right: 4px;
  }
`;
const TabContainer = styled.div`
  width: 1120px;
  margin: 10px auto;
  background-color: #fff;
`;
