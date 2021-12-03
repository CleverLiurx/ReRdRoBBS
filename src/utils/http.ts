import qs from "qs";
import * as auth from "auth-provider";
import { useAuth } from "context/auth-context";

const apiUrl = process.env.REACT_APP_API_URL;

interface Config extends RequestInit {
  token?: string;
  data?: object;
}

// axios 和 http 不一样 axios当状态不是2xx时候会呗catch捕获 而fetch不会 fetch只会捕获断网等情况
export const http = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: Config = {}
) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bear ${token}` : "",
      "Content-Type": data ? "application/json" : "",
    },
    ...customConfig,
  };

  if (config.method.toUpperCase() === "GET") {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }
  return window.fetch(`${apiUrl}${endpoint}`, config).then(async (response) => {
    if (response.status === 401) {
      await auth.logout();
      window.location.reload();
      return Promise.reject({ message: "请重新登录" });
    }
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      return Promise.reject(data);
    }
  });
};

export const useHttp = () => {
  const { user } = useAuth();
  // type uid = string | number // 类型别名  大多数情况和interface一样
  // return ([endpoint, config]: [string, Config]) => http(endpoint, {...config, token: user?.token})
  // ts 的 typeof 是静态运行 js的是在runtime运行的
  return (...[endpoint, config]: Parameters<typeof http>) =>
    http(endpoint, { ...config, token: user?.token });
};

// type Person = {
//   name: string,
//   age: number
// }

// const xiaoMing: Partial<Person> = {name: 'xiaoming'}
// const shenMiRen1: Omit<Person, 'name'> = {age:13}
// const shenMiRen2: Omit<Person, 'name' | 'age'> = {}