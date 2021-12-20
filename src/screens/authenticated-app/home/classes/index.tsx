import React, { useEffect } from "react";
import { Classes } from "types/classes";
import styled from "@emotion/styled";
import { useHttp } from "utils/http";
import { useAsync } from "utils/use-async";

export const ClassContainer = () => {
  const client = useHttp();
  const { run, ...result } = useAsync<Classes[]>();

  useEffect(() => {
    run(client("/classes"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const classList = result.data;

  return (
    <Container>
      {classList?.map((c) => {
        return (
          <Block key={c._id}>
            <img
              src={c.icon}
              style={{ width: "70px", height: "70px", borderRadius: "5px" }}
              alt=""
            />
            <div style={{ color: "#333", fontSize: "1.4rem" }}>
              {c.classname}
            </div>
            <span style={{ color: "#999", fontSize: "1.2rem" }}>
              {c.description || "其他技术相关"}
            </span>
          </Block>
        );
      })}
    </Container>
  );
};

const Container = styled.div`
  margin-bottom: 20px;
  width: 360px;
  padding: 20px;
  background-color: #fff;
  border-radius: 4px;
  padding-left: 20px;
`;

const Block = styled.div`
  display: inline-block;
  width: 100px;
  margin: 3.33px;
  height: 120px;
  text-align: center;
  cursor: pointer;
`;
