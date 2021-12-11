import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { EditAction } from "./edit-action";
import { Banner } from "./banner";
import { TopicList } from "./topic";
import { useAsync } from "utils/use-async";
import { useHttp } from "utils/http";
import { Topic } from "types/topic";

const useProjects = () => {
  const client = useHttp();
  const { run, ...result } = useAsync<Topic[]>();

  useEffect(() => {
    run(client("/topic"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return result;
};

export const HomePage = () => {
  const { data: list } = useProjects();

  return (
    <Main>
      <MainContainterLeft>
        <Banner></Banner>
        <TopicList topicList={list || []} />
      </MainContainterLeft>
      <MainContainterRight>
        <EditAction />
      </MainContainterRight>
    </Main>
  );
};

const Main = styled.div`
  width: 1120px;
  margin: 20px auto 0;
`;
const MainContainterLeft = styled.div`
  width: 740px;
  float: left;
`;
const MainContainterRight = styled.div`
  width: 360px;
  float: right;
`;
