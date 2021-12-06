import { Form, Input } from "antd";
import { useAuth } from "context/auth-context";
import { LongButton } from "screens/unauthenticated-app";
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

export const RegisterScreen = ({
  onError,
}: {
  onError: (error: Error) => void;
}) => {
  const { register } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });

  // HTMLFormElement extends Element
  const handleSubmit = async (values: { phone: string; code: string }) => {
    // try {
    //     await run(register(values));
    // } catch (error) {
    //     onError(error)
    // }
    await run(register(values)).catch((error) => onError(error));
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={"phone"}
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input placeholder={"用户名"} type="text" id={"phone"} />
      </Form.Item>
      <Form.Item
        name={"code"}
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input placeholder={"密码"} type="password" id={"code"} />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} htmlType={"submit"} type={"primary"}>
          注册并登录
        </LongButton>
      </Form.Item>
    </Form>
  );
};
