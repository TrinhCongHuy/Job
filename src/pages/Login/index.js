import { Button, Card, Col, Input, Row, Form, message } from "antd";
import * as company from "../../services/companyService";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../../helpers/cookie";
import { useDispatch } from "react-redux";
import { checkLogin } from "../../actions/login";
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const rules = [
    {
      required: true,
      message: "Please input your data!",
    },
  ];
  const handleFinish = async (values) => {
    const data = await company.login(values.email, values.password);
    if (data.length > 0) {
      const time = 1;
      setCookie("id", data[0].id, time);
      setCookie("company", data[0].company, time);
      setCookie("email", data[0].email, time);
      setCookie("token", data[0].token, time);
      dispatch(checkLogin(true));
      navigate("/");
    } else {
      messageApi.open({
        type: "error",
        content: "Tài khoản này đã tồn tại!",
      });
    }
  };
  return (
    <>
      {contextHolder}
      <Row justify="center">
        <Col span={10}>
          <Card title="Đăng nhập tài khoản">
            <Form layout="vertical" onFinish={handleFinish}>
              <Form.Item label="Email" name="email" rules={rules}>
                <Input />
              </Form.Item>
              <Form.Item label="Password" name="password" rules={rules}>
                <Input.Password />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Đăng nhập
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Login;
