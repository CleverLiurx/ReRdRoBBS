import React from "react";
import { Card, Dropdown, Menu } from "antd";
import styled from "@emotion/styled";
import { DownOutlined } from "@ant-design/icons";
import { TopicItem } from "./topic-item";
import { Topic } from "types/topic";

export const TopicList = ({ topicList }: { topicList: Topic[] }) => {
  return (
    <div style={{ width: "740px", margin: "20px 0" }}>
      {topicList.map((topic, idx) => {
        if (idx === 0) {
          return (
            <Card
              key={topic._id}
              size="small"
              extra={HandleBtn}
              style={{ width: "100%" }}
            >
              <TopicItem topicItem={topic} />
            </Card>
          );
        } else {
          return (
            <Card
              key={topic.title}
              size="small"
              style={{ width: "100%", marginTop: "10px" }}
            >
              <TopicItem topicItem={topic} />
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
