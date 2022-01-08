import React, { useEffect, useState } from "react";
import { Card, Dropdown, Menu } from "antd";
import styled from "@emotion/styled";
import { DownOutlined } from "@ant-design/icons";
import { TopicItem } from "./topic-item";
import { Topic } from "types/topic";
import { useHttp } from "utils/http";
import { useAsync } from "utils/use-async";
// import VirtualList from 'rc-virtual-list';
import { isElInViewport, useDebounce } from "utils";

enum Sort {
  createTime = "createTime",
  repliedTime = "repliedTime",
  replyCount = "replyCount",
  praiseCount = "praiseCount",
  starCount = "starCount",
}

interface ParamType {
  classFrom: string;
  createBy: string;
  sort: Sort;
  page: number;
  limit: number;
  key: number;
}
let limit = 0;
const useProjects = (param: ParamType) => {
  const client = useHttp();
  const { run, ...result } = useAsync<Topic[]>();

  useEffect(() => {
    if (!result.isLoading) {
      limit += 10;
      run(client("/topic", { data: { ...param, limit } }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);

  return result;
};

export const TopicList = ({ classFrom = "" }: { classFrom: string }) => {
  let [param, setParam] = useState<ParamType>({
    classFrom,
    createBy: "",
    sort: Sort.createTime,
    page: 1,
    limit: 10,
    key: 1,
  });
  const debouncedParam = useDebounce(param, 500);
  let { data: topicList, isLoading } = useProjects(debouncedParam);
  const [dom, setDom] = useState<HTMLDivElement | null>(null);

  const handleOnScroll = () => {
    if (dom && isElInViewport(dom)) {
      setParam({ ...param, key: param.key + 1 });
    }
  };
  useEffect(() => {
    document.addEventListener("scroll", handleOnScroll);
    return () => {
      document.removeEventListener("scroll", handleOnScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dom]);

  const menu = (
    <Menu>
      <Menu.Item key={"k1"}>
        <DrowItem
          onClick={() =>
            setParam({ ...param, limit: 10, sort: Sort.repliedTime })
          }
        >
          最新回复
        </DrowItem>
      </Menu.Item>
      <Menu.Item key={"k2"}>
        <DrowItem
          onClick={() =>
            setParam({ ...param, limit: 10, sort: Sort.createTime })
          }
        >
          发布时间
        </DrowItem>
      </Menu.Item>
      <Menu.Item key={"k3"}>
        <DrowItem
          onClick={() =>
            setParam({ ...param, limit: 10, sort: Sort.replyCount })
          }
        >
          回复数
        </DrowItem>
      </Menu.Item>
      <Menu.Item key={"k4"}>
        <DrowItem
          onClick={() =>
            setParam({ ...param, limit: 10, sort: Sort.praiseCount })
          }
        >
          点赞数
        </DrowItem>
      </Menu.Item>
      <Menu.Item key={"k5"}>
        <DrowItem
          onClick={() =>
            setParam({ ...param, limit: 10, sort: Sort.praiseCount })
          }
        >
          收藏数
        </DrowItem>
      </Menu.Item>
    </Menu>
  );

  const sortName = {
    repliedTime: "最新回复",
    createTime: "发布时间",
    replyCount: "回复数",
    praiseCount: "点赞数",
    starCount: "收藏数",
  };

  const HandleBtn = (
    <Dropdown overlay={menu}>
      <div style={{ fontSize: "1.4rem", cursor: "pointer", color: "#666" }}>
        {/* @ts-ignore */}
        {sortName[param.sort]}
        <DownOutlined />
      </div>
    </Dropdown>
  );

  return (
    <div id="topic-list" style={{ width: "740px" }}>
      {topicList &&
        topicList.map((topic, idx) => {
          if (idx === 0) {
            return (
              <Card
                key={topic._id}
                size="small"
                extra={HandleBtn}
                style={{ width: "100%" }}
              >
                <TopicItem topicItem={topic} showFrom={classFrom === ""} />
              </Card>
            );
          } else {
            return (
              <Card
                key={topic._id}
                size="small"
                style={{ width: "100%", marginTop: "10px" }}
              >
                <TopicItem topicItem={topic} showFrom={classFrom === ""} />
              </Card>
            );
          }
        })}
      {/* <LoadTip onClick={() => setParam({...param, page: param.page + 1})}>点击加载更多</LoadTip> */}
      <LoadTip id="load-more" ref={(dom) => setDom(dom)}>
        {isLoading ? "加载中～" : "没有更多啦"}
      </LoadTip>
    </div>
  );
};

const DrowItem = styled.div`
  font-size: 1rem;
  text-align: center;
  color: #666;
`;

const LoadTip = styled.div`
  font-size: 1.2rem;
  color: #ea540b;
  text-align: center;
  margin: 10px;
  cursor: pointer;
`;
