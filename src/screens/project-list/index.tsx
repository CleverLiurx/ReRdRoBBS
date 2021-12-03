import React from "react";
import { SearchPanel } from "./search-panel";
import { List, Project } from "./list";
import { useEffect, useState } from "react";
import { cleanObject, useDebounce, useMount } from "../../utils";
import qs from "qs";
import { useHttp } from "utils/http";
import { useAsync } from "utils/use-async";

export const ProjectListScreen = () => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const [users, setUsers] = useState([]);
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const debouncedParam = useDebounce(param, 2000);
  const client = useHttp();
  const { run, isLoading, error, data: list } = useAsync<Project[]>();

  useEffect(() => {
    run(client("list", { data: cleanObject(debouncedParam) }));

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
  }, [debouncedParam]);

  useMount(() => {
    // client('users').then(setUsers)
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
    // @ts-ignore
    setUsers(data);
  });

  return (
    <div>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list || []} />
    </div>
  );
};
