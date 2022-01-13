import React, { useEffect, useRef, useState } from "react";
import { Card, Dropdown, Menu } from "antd";
import styled from "@emotion/styled";
import { DownOutlined } from "@ant-design/icons";
import { TopicItem } from "./topic-item";
import { Topic } from "types/topic";
import { useHttp } from "utils/http";
import { useAsync } from "utils/use-async";
import { isElInViewport } from "utils";

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
  kw: string;
}

// 获取文章列表
const useProjects = (param: ParamType) => {
  const client = useHttp();
  const { run, ...result } = useAsync<Topic[]>();

  useEffect(() => {
    if (!result.isLoading) {
      run(client("/topic", { data: param }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);

  return result;
};

export const TopicList = ({
  classFrom = "",
  kw = "",
}: {
  classFrom?: string;
  kw?: string;
}) => {
  // 监控的dom，此dom出现在视野时说明可能要加载
  const listenerRef = useRef<HTMLElement>(null);

  // 分页参数
  const [param, setParam] = useState<ParamType>({
    classFrom,
    createBy: "",
    sort: Sort.createTime,
    page: 1,
    limit: 10,
    kw,
  });

  useEffect(() => {
    setParam((old) => ({ ...old, kw }));
  }, [kw]);

  // 显示的总数据
  const [lazyData, setLazyData] = useState<Topic[]>([]);

  // 每次获取的数据
  const { data: topicList, isLoading } = useProjects(param);

  useEffect(() => {
    if (topicList && topicList.length > 0) {
      if (param.page === 1) {
        // 切换排序
        setLazyData(topicList);
      } else {
        // 加载更多
        setLazyData((old) => [...old, ...topicList]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topicList]);

  useEffect(() => {
    const handleOnScroll = () => {
      if (
        listenerRef.current &&
        isElInViewport(listenerRef.current) &&
        !isLoading &&
        topicList?.length
      ) {
        setParam({ ...param, page: param.page + 1 });
      }
    };
    document.addEventListener("scroll", handleOnScroll);
    return () => {
      document.removeEventListener("scroll", handleOnScroll);
    };
  }, [param, isLoading, topicList]);

  const menu = (
    <Menu>
      <Menu.Item key={"k1"}>
        <DrowItem
          onClick={() =>
            setParam({ ...param, page: 1, limit: 10, sort: Sort.repliedTime })
          }
        >
          最新回复
        </DrowItem>
      </Menu.Item>
      <Menu.Item key={"k2"}>
        <DrowItem
          onClick={() =>
            setParam({ ...param, page: 1, limit: 10, sort: Sort.createTime })
          }
        >
          发布时间
        </DrowItem>
      </Menu.Item>
      <Menu.Item key={"k3"}>
        <DrowItem
          onClick={() =>
            setParam({ ...param, page: 1, limit: 10, sort: Sort.replyCount })
          }
        >
          回复数
        </DrowItem>
      </Menu.Item>
      <Menu.Item key={"k4"}>
        <DrowItem
          onClick={() =>
            setParam({ ...param, page: 1, limit: 10, sort: Sort.praiseCount })
          }
        >
          点赞数
        </DrowItem>
      </Menu.Item>
      <Menu.Item key={"k5"}>
        <DrowItem
          onClick={() =>
            setParam({ ...param, page: 1, limit: 10, sort: Sort.praiseCount })
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
        {sortName[param.sort]}
        <DownOutlined />
      </div>
    </Dropdown>
  );

  return (
    <div style={{ width: "740px" }}>
      {lazyData &&
        lazyData.map((topic, idx) => {
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
      <LoadTip id="load-more" ref={listenerRef as any}>
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
