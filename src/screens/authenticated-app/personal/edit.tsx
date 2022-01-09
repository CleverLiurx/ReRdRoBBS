import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { User } from "types/user";
import { Modal, Button, Form, Input, Radio, DatePicker } from "antd";
import moment from "moment";
import { useHttp } from "utils/http";

export const EditInfoModel = ({ userInfo }: { userInfo: User | null }) => {
  const client = useHttp();
  const [visible, setVisible] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = () => {
    setConfirmLoading(true);

    client("/user", { data: { ...user }, method: "PUT" }).then(() =>
      window.location.reload()
    );
  };

  useEffect(() => {
    setUser(userInfo);
  }, [userInfo]);

  return (
    <>
      <Edit
        style={{ color: "#ea540b" }}
        htmlType="submit"
        onClick={() => setVisible(true)}
      >
        编辑个人资料
      </Edit>
      <Modal
        title="编辑个人资料"
        visible={visible}
        onCancel={() => setVisible(false)}
        width={720}
        footer={false}
        getContainer={false}
      >
        {user ? (
          <Form
            name="userinfo"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            initialValues={{
              ...user,
              birthday: moment(user.birthday || new Date()),
            }}
            onFinish={handleOk}
            autoComplete="off"
          >
            <Form.Item
              label="用户名"
              name="username"
              rules={[
                { required: true, message: "请输入用户名" },
                { min: 2, message: "请输入2-10位用户名" },
                { max: 10, message: "请输入2-10位用户名" },
              ]}
            >
              <Input
                onChange={(e) => setUser({ ...user, username: e.target.value })}
              />
            </Form.Item>
            <Form.Item
              label="性别"
              name="sex"
              rules={[{ required: true, message: "请输入选择性别" }]}
            >
              <Radio.Group
                onChange={(e) => setUser({ ...user, sex: e.target.value })}
                value={user.sex}
              >
                <Radio value={1}>男</Radio>
                <Radio value={0}>女</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              label="生日"
              name="birthday"
              rules={[{ required: true, message: "请选择生日" }]}
            >
              <DatePicker
                onChange={(data, dateString) =>
                  setUser({ ...user, birthday: dateString })
                }
              />
            </Form.Item>

            <Form.Item
              label="邮箱"
              name="email"
              rules={[
                { required: true, message: "请输入邮箱" },
                {
                  pattern: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
                  message: "请输入正确的邮箱格式",
                },
              ]}
            >
              <Input
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button
                style={{ float: "right" }}
                type="primary"
                htmlType="submit"
                loading={confirmLoading}
              >
                确认修改
              </Button>
            </Form.Item>
          </Form>
        ) : null}
      </Modal>
    </>
  );
};

const Edit = styled(Button)`
  position: absolute;
  right: 20px;
  top: 20px;
`;
