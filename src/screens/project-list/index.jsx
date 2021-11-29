import React from "react";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useEffect, useState } from "react";
import { cleanObject } from "./utils";
import qs from "qs";

const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
  const [users, setUsers] = useState([]);
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [list, setlist] = useState([]);

  useEffect(() => {
    fetch(`${apiUrl}/list?${qs.stringify(cleanObject(param))}`).then(
      async (response) => {
        if (response.ok) {
          setlist(await response.json());
        }
      }
    );
    const data = [
      {
        id: 1,
        name: "棋手管理",
        personId: 1,
        organization: "外卖组",
        created: 1604989757139,
      },
      {
        id: 2,
        name: "团购 APP",
        personId: 2,
        organization: "团购组",
        created: 1604989757139,
      },
      {
        id: 3,
        name: "测试",
        personId: 3,
        organization: "物料",
        created: 1604989757139,
      },
    ];
    setlist(data);
  }, [param]);
  useEffect(() => {
    const data = [
      {
        id: 1,
        name: "章三",
      },
      {
        id: 2,
        name: "莉丝",
      },
      {
        id: 3,
        name: "网舞",
      },
    ];
    setUsers(data);
  }, []);

  return (
    <div>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </div>
  );
};
