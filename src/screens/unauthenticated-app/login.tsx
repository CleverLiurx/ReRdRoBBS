import { Form, Input } from "antd";
import { useAuth } from "context/auth-context";
import { useNavigate } from "react-router";
import { LongButton } from "screens/unauthenticated-app/index";
import { useAsync } from "utils/use-async";

// interface Base {
//   id: number
// }
//
// interface Advance extends Base {
//   name: string
// }
//
// const test = (p: Base) => {
// }
//
// // 鸭子类型(duck typing)：面向接口编程 而不是 面向对象编程
// const a = {id: 1, name: 'jack'}
// test(a)

export const LoginScreen = ({
  onError,
}: {
  onError: (error: Error) => void;
}) => {
  const { login } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });
  let navigate = useNavigate();

  // HTMLFormElement extends Element
  const handleSubmit = async (values: { phone: string; password: string }) => {
    await run(login(values))
      .then(() => {
        navigate("/");
      })
      .catch((error) => onError(error));
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={"phone"}
        rules={[{ required: true, message: "请输入手机号" }]}
      >
        <Input placeholder={"手机号"} type="text" id={"phone"} />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input placeholder={"密码"} type="password" id={"password"} />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} htmlType={"submit"} type={"primary"}>
          登录
        </LongButton>
      </Form.Item>
    </Form>
  );
};
