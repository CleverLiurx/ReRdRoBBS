import { Button, Col, Form, Input, Row } from "antd";
import { useAuth } from "context/auth-context";
import { LongButton } from "screens/unauthenticated-app";
import { useHttp } from "utils/http";
import { useAsync } from "utils/use-async";

export const RegisterScreen = ({
  onError,
}: {
  onError: (error: Error) => void;
}) => {
  const { register } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });
  const client = useHttp();
  const [form] = Form.useForm();

  // HTMLFormElement extends Element
  const handleSubmit = async (values: {
    phone: string;
    code: string;
    password: string;
  }) => {
    await run(register(values)).catch((error) => onError(error));
  };

  const sendSMS = () => {
    const phone = form.getFieldValue("phone");
    run(client("/un_auth/sms", { data: { phone }, method: "POST" })).catch(
      (error) => onError(error)
    );
  };
  return (
    <Form onFinish={handleSubmit} form={form}>
      <Form.Item
        name="phone"
        rules={[{ required: true, message: "请输入手机号" }]}
      >
        <Input placeholder={"手机号"} type="text" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input placeholder={"密码"} type="password" />
      </Form.Item>
      <Form.Item
        name="username"
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input placeholder={"用户名"} type="text" />
      </Form.Item>
      <Form.Item>
        <Row gutter={8}>
          <Col span={14}>
            <Form.Item
              name="code"
              noStyle
              rules={[{ required: true, message: "请输入6位验证码" }]}
            >
              <Input placeholder={"验证码"} type="text" id={"code"} />
            </Form.Item>
          </Col>
          <Col span={10}>
            <Button type="link" style={{ fontSize: "10px" }} onClick={sendSMS}>
              发送验证码
            </Button>
          </Col>
        </Row>
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} htmlType={"submit"} type={"primary"}>
          注册并登录
        </LongButton>
      </Form.Item>
    </Form>
  );
};
