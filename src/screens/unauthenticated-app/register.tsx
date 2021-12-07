import { Form, Input } from "antd";
import { useAuth } from "context/auth-context";
import { LongButton } from "screens/unauthenticated-app";
import { useAsync } from "utils/use-async";

export const RegisterScreen = ({
  onError,
}: {
  onError: (error: Error) => void;
}) => {
  const { register } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });

  // HTMLFormElement extends Element
  const handleSubmit = async (values: { phone: string; password: string }) => {
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
        name={"password"}
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input placeholder={"密码"} type="password" id={"password"} />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} htmlType={"submit"} type={"primary"}>
          注册并登录
        </LongButton>
      </Form.Item>
    </Form>
  );
};
