import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { Classes } from "types/classes";
import { EditAction } from "./edit-action";
import { TopicList } from "./topic";
import { useDocumentTitle } from "utils";
import { useLocation } from "react-router";
import { useHttp } from "utils/http";
import { useAsync } from "utils/use-async";

const useDetails = (param: string) => {
  const client = useHttp();
  const { run, ...result } = useAsync<Classes>();

  useEffect(() => {
    run(client(`/classes/${param}`));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);

  return result;
};

export const ClassPage = () => {
  const location = useLocation();
  // @ts-ignore
  let classes = location.state?.classes;
  const classId = window.location.pathname.split("class/")[1];
  const { data } = useDetails(classId);
  if (!classes) {
    classes = data;
  }
  useDocumentTitle(classes?.classname || "");

  return (
    <Main>
      <MainContainterLeft>
        <TopicList classFrom={classes?._id} />
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
