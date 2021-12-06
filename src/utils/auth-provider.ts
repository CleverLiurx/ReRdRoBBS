// import { User } from "screens/authenticated-app/project-list/search-panel";
import { User } from "types";

const localStorageKey = "__auth_provider_token__";
const apiUrl = process.env.REACT_APP_API_URL;

export const getToken = () => window.localStorage.getItem(localStorageKey);

// export const handleUserResponse = ({ user }: { user: User }) => {
//   window.localStorage.setItem(localStorageKey, user.token || "");
//   return user;
// };

interface Response {
  errmsg: string;
  errno: string;
  data: User;
}

const handleUserResponse = (res: Response) => {
  if (res.errno !== "0") {
    return Promise.reject({ message: res.errmsg });
  } else {
    return res.data;
  }
};

export const login = async (data: { phone: string; code: string }) => {
  return fetch(`${apiUrl}/api/v1/un_auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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
export const register = (data: { phone: string; code: string }) => {
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
