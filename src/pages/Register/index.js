import { Button, Card, Col, Input, Row, Form, message } from "antd";
import * as company from "../../services/companyService";
import { generateToken } from "../../helpers/generateToken";
import { useNavigate } from "react-router-dom";
function Register() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const rules = [
    {
      required: true,
      message: "Please input your username!",
    },
  ];
  const handleFinish = async (values) => {
    values.token = generateToken();

    const checkExistEmail = await company.checkExits("email", values.email);
    const checkExistPhone = await company.checkExits("email", values.phone);

    if (checkExistEmail.length > 0) {
      messageApi.open({
        type: "error",
        content: "Email này đã tồn tại!",
      });
    } else if (checkExistPhone.length > 0) {
      messageApi.open({
        type: "error",
        content: "Số điện thoại này đã tồn tại!",
      });
    } else {
      const response = await company.createCompany(values);
      if (response) {
        navigate("/login");
      }
    }
  };
  return (
    <>
      {contextHolder}
      <Row justify="center">
        <Col span={10}>
          <Card title="Đăng ký tài khoản">
            <Form layout="vertical" onFinish={handleFinish}>
              <Form.Item label="Tên công ty" name="companyName" rules={rules}>
                <Input />
              </Form.Item>
              <Form.Item label="Email" name="email" rules={rules}>
                <Input />
              </Form.Item>
              <Form.Item label="Số điện thoại" name="phone">
                <Input />
              </Form.Item>
              <Form.Item label="Password" name="password" rules={rules}>
                <Input.Password />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Đăng ký
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Register;
