/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { editCompany, getDetailCompany } from "../../services/companyService";
import { getCookie } from "../../helpers/cookie";
import { Button, Card, Col, Form, Input, Row, Space, message } from "antd";

function InfoCompany() {
  const idCompany = getCookie("id");
  const [isEdit, setItEdit] = useState(false);
  const [data, setData] = useState();
  const { TextArea } = Input;
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  const rules = [
    {
      required: true,
      message: "Please input your data!",
    },
  ];

  const fetchApi = async () => {
    const response = await getDetailCompany(idCompany);
    if (response) {
      setData(response);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  const handleEdit = () => {
    setItEdit(true);
  };

  const handleCancel = () => {
    setItEdit(false);
    form.resetFields();
  };

  const handleFinish = async (values) => {
    const response = await editCompany(idCompany, values);
    if (response) {
      messageApi.open({
        type: "success",
        content: "Cập nhật thông tin thành công.",
      });
      fetchApi();
      setItEdit(false);
    }
  };

  return (
    <>
      {contextHolder}
      {data && (
        <Card
          title="Thông tin công ty"
          extra={
            !isEdit ? (
              <Button onClick={handleEdit}>Chỉnh sửa</Button>
            ) : (
              <Button onClick={handleCancel}>Huỷ</Button>
            )
          }
        >
          <Form
            layout="vertical"
            name="basic"
            initialValues={data}
            onFinish={handleFinish}
            disabled={!isEdit}
            form={form}
          >
            <Row gutter={20}>
              <Col span={24}>
                <Form.Item label="Tên công ty" name="companyName" rules={rules}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Email" name="email" rules={rules}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Số điện thoại" name="phone" rules={rules}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Địa chỉ" name="address" rules={rules}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="Số lượng nhân sự"
                  name="quantityPeople"
                  rules={rules}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="Thời gian làm việc"
                  name="workingTime"
                  rules={rules}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Link website" name="website" rules={rules}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Mô tả ngắn" name="description" rules={rules}>
                  <TextArea rows={4} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Mô tả chi tiết" name="detail" rules={rules}>
                  <TextArea rows={16} />
                </Form.Item>
              </Col>
              {isEdit && (
                <Col span={24}>
                  <Form.Item>
                    <Space size="middle">
                      <Button type="primary" htmlType="submit">
                        Cập nhật
                      </Button>
                      <Button onClick={handleCancel}>Huỷ</Button>
                    </Space>
                  </Form.Item>
                </Col>
              )}
            </Row>
          </Form>
        </Card>
      )}
    </>
  );
}

export default InfoCompany;
