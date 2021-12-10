import React from "react";
import { Card, Dropdown, Menu } from "antd";
import styled from "@emotion/styled";
import { DownOutlined } from "@ant-design/icons";

interface topic {
  title: string;
  createBy: string;
  content: string;
  topicImage: string;
  hitsCount: number;
  praiseCount: number;
  starCount: number;
  replyCount: number;
}

export const Topic = ({ topicList }: { topicList: topic[] }) => {
  return (
    <div style={{ width: "740px", margin: "20px 0" }}>
      {topicList.map((topic, idx) => {
        if (idx === 0) {
          return (
            <Card
              key={topic.title}
              size="small"
              extra={HandleBtn}
              style={{ width: "100%" }}
            >
              <p>Card content</p>
              <p>Card content</p>
              <p>Card content</p>
            </Card>
          );
        } else {
          return (
            <Card
              key={topic.title}
              size="small"
              style={{ width: "100%", marginTop: "10px" }}
            >
              <p>Card content</p>
              <p>Card content</p>
              <p>Card content</p>
            </Card>
          );
        }
      })}
    </div>
  );
};

const DrowItem = styled.div`
  font-size: 1rem;
  text-align: center;
  color: #666;
`;

const menu = (
  <Menu>
    <Menu.Item key={"k1"}>
      <DrowItem>最新回复</DrowItem>
    </Menu.Item>
    <Menu.Item key={"k2"}>
      <DrowItem>发布时间</DrowItem>
    </Menu.Item>
    <Menu.Item key={"k3"}>
      <DrowItem>回复数</DrowItem>
    </Menu.Item>
    <Menu.Item key={"k4"}>
      <DrowItem>点赞数</DrowItem>
    </Menu.Item>
  </Menu>
);

const HandleBtn = (
  <Dropdown overlay={menu}>
    <div style={{ fontSize: "1.4rem", cursor: "pointer", color: "#666" }}>
      发布时间
      <DownOutlined />
    </div>
  </Dropdown>
);
