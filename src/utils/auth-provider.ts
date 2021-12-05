import { User } from "screens/authenticated-app/project-list/search-panel";

const localStorageKey = "__auth_provider_token__";

export const getToken = () => window.localStorage.getItem(localStorageKey);

export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorageKey, user.token || "");
  return user;
};

export const login = async (data: { username: string; password: string }) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  return {
    id: "1",
    name: "章三",
    token: "xxxx",
  };
  // return fetch(`${apiUrl}/login`, {
  //     headers: {
  //         'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(data)
  // }).then(
  // async (response) => {
  //     if (response.ok) {
  //         return handleUserResponse(await response.json())
  //     } else {
  //         return Promise.reject(await response.json())
  //     }
  // });
};
export const register = (data: { username: string; password: string }) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  return fetch(`${apiUrl}/register`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      return handleUserResponse(await response.json());
    } else {
      return Promise.reject(await response.json());
    }
  });
};

export const logout = async () =>
  window.localStorage.removeItem(localStorageKey);
