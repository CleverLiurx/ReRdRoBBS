import React, { useEffect, useState } from "react";
import { User } from "types/user";
import { useDocumentTitle } from "utils";
import { useHttp } from "utils/http";
import { useAsync } from "utils/use-async";
import styled from "@emotion/styled";
import BGImage from "assets/img/personal-bg.png";
import { WomanOutlined, ManOutlined } from "@ant-design/icons";
import { Descriptions, List } from "antd";
import { useAuth } from "context/auth-context";
import { Topic } from "types/topic";
import { useNavigate } from "react-router";
import { EditInfoModel } from "./edit";

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
          <EditInfoModel userInfo={user} />
          <div className="user-info">
            <div>
              <span
                style={{
                  fontSize: "2.4rem",
                  color: "#000",
                  paddingRight: "8px",
                }}
              >
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

interface ParamType {
  classFrom: string;
  createBy: string;
  sort: string;
  page: number;
  limit: number;
}

const useTopic = (param: ParamType) => {
  const client = useHttp();
  const { run, ...result } = useAsync<Topic[]>();

  useEffect(() => {
    run(client("/topic", { data: { ...param } }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);

  return result;
};

interface StarType {
  topicId: Topic;
  _id: string;
}
const useStar = (id: string) => {
  const client = useHttp();
  const { run, ...result } = useAsync<StarType[]>();

  useEffect(() => {
    run(client("/star", { data: { userId: id } }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return result;
};

const Tab = () => {
  const { user } = useAuth();
  const id = window.location.pathname.split("personal/")[1];

  const isOwner = user?._id === id;

  let [param] = useState<ParamType>({
    classFrom: "",
    createBy: id,
    sort: "createTime",
    page: 1,
    limit: 999,
  });
  let { data: topicList } = useTopic(param);

  let navigate = useNavigate();

  let { data: starList } = useStar(id);

  return (
    <TabContainer>
      <ContainterLeft>
        <List
          header={<CardTitle>{isOwner ? "我的文章" : "TA的文章"}</CardTitle>}
          dataSource={topicList || []}
          split={false}
          renderItem={(item) => (
            <List.Item onClick={() => navigate(`/topic/${item._id}`)}>
              <ElliP>{item.title || item.content}</ElliP>
            </List.Item>
          )}
        />
      </ContainterLeft>
      <ContainterRight>
        <CardTitle style={{ padding: "12px 0" }}>
          {isOwner ? "关于我" : "关于TA"}
        </CardTitle>
        <div style={{ padding: "12px", fontSize: "14px" }}>
          这家伙很懒 什么都没写！
        </div>
      </ContainterRight>
      <ContainterRight>
        <List
          header={<CardTitle>收藏</CardTitle>}
          dataSource={starList || []}
          split={false}
          renderItem={(item) => (
            <List.Item>
              <ElliP>{item.topicId.title || item.topicId.content}</ElliP>
            </List.Item>
          )}
        />
      </ContainterRight>
    </TabContainer>
  );
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
  margin: 20px auto 0;
  background-color: #fff;
`;
const ContainterLeft = styled.div`
  width: 740px;
  float: left;
  background-color: #fff;
  margin-bottom: 15px;
`;
const ContainterRight = styled.div`
  width: 360px;
  float: right;
  background-color: #fff;
  margin-bottom: 15px;
`;
const ElliP = styled.p`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  cursor: pointer;
  margin: 0 12px;
  font-size: 16px;
`;
const CardTitle = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #333;
  margin-left: 20px;
`;
