import React from "react";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useEffect, useState } from "react";
import { cleanObject } from "./utils";
import qs from "qs";

export const ProjectListScreen = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  console.log(process.env);

  const [users, setUsers] = useState([]);
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [list, setlist] = useState([]);
  const debouncedParam = useDebounce(param, 2000);
  useEffect(() => {
    fetch(`${apiUrl}/list?${qs.stringify(cleanObject(debouncedParam))}`).then(
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
  }, [debouncedParam]);
  useMount(() => {
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
  });

  return (
    <div>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </div>
  );
};

export const useMount = (callback) => {
  useEffect(() => {
    callback();
  }, []);
};

export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // 每次在value变化后设置一个定时器
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    // useEffect里的return会在上一个useEffect处理完之后在运行
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};
