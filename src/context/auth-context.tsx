import React, { ReactNode } from "react";
import * as auth from "utils/auth-provider";
import { User } from "types";
import { useMount } from "utils";
import { useAsync } from "utils/use-async";
import { FullPageLoading } from "components/lib";
import { useNavigate } from "react-router";

interface LoginForm {
  phone: string;
  password: string;
}

interface RegisterForm {
  phone: string;
  password: string;
  code: string;
}

const bootstrapUser = async () => {
  const user = await auth.getUserInfo();
  return user;
};

const AuthContext = React.createContext<
  | {
      user: User | null;
      register: (form: RegisterForm) => Promise<void>;
      login: (form: LoginForm) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);
AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // const [user, setUser] = useState<User | null>(null);
  const {
    data: user,
    // error,
    isLoading,
    isIdle,
    // isError,
    run,
    setData: setUser,
  } = useAsync<User | null>();
  const login = (form: LoginForm) => auth.login(form).then(setUser);
  const register = (form: RegisterForm) => auth.register(form).then(setUser);
  const logout = () => auth.logout().then(() => setUser(null));

  useMount(() => {
    run(bootstrapUser());
  });

  if (isIdle || isLoading) {
    return <FullPageLoading />;
  }

  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    />
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth必须在AuthProvider中使用");
  }
  return context;
};
