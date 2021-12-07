import { User } from "types";
import NodeRSA from "node-rsa";

const apiUrl = process.env.REACT_APP_API_URL;

const _encrypt = (data: NodeRSA.Data, publicKey: NodeRSA.KeyBits) => {
  const nodersa = new NodeRSA(publicKey);
  const encrypted = nodersa.encrypt(data, "base64");
  return encrypted;
};

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

const getLoginPack = async () => {
  return fetch(`${apiUrl}/un_auth/loginPack`).then(async (response) => {
    const json = await response.json();
    const { ticket, publicKey } = json.data;
    return { ticket, publicKey: Buffer.from(publicKey.data) };
  });
};

export const login = async (data: { phone: string; password: string }) => {
  // 获取加密数据
  const pack = await getLoginPack();

  // 加密要传输的数据
  // @ts-ignore
  const text = _encrypt({ ...data, ticket: pack.ticket }, pack.publicKey);

  return fetch(`${apiUrl}/un_auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  }).then(async (response) => {
    if (response.ok) {
      return handleUserResponse(await response.json());
    } else {
      return Promise.reject(await response.json());
    }
  });
};

export const register = (data: { phone: string; password: string }) => {
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

export const logout = async () => {
  fetch(`${apiUrl}/user/logout`, { credentials: "include" });
};

export const getUserInfo = async () => {
  return fetch(`${apiUrl}/user`, { credentials: "include" }).then(
    async (response) => {
      if (response.ok) {
        return handleUserResponse(await response.json());
      } else {
        return Promise.reject(await response.json());
      }
    }
  );
};
