import { Button, Col, Form, Input, Row, Select, Switch, message } from "antd";
import GoBack from "../../components/GoBack";
import { useEffect, useState } from "react";
import { getListTag } from "../../services/tagService";
import { getListCity } from "../../services/cityService";
import { getCookie } from "../../helpers/cookie";
import { getTimeCurrent } from "../../helpers/getTime";
import { createJob } from "../../services/jobService";

function CreateJob() {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const { TextArea } = Input;
  const [tags, setTags] = useState([]);
  const [city, setCity] = useState([]);
  const idCompany = getCookie("id");
  const rules = [
    {
      required: true,
      message: "Please input your username!",
    },
  ];

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getListTag();
      if (response) {
        setTags(response);
      }
    };
    fetchApi();
  }, []);

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getListCity();
      if (response) {
        setCity(response);
      }
    };
    fetchApi();
  }, []);

  const handleFinish = async (values) => {
    values.idCompany = idCompany;
    values.createAt = getTimeCurrent();
    const response = await createJob(values);
    if (response) {
      form.resetFields();
      messageApi.open({
        type: "success",
        content: "Tạo mới job thành công.",
        duration: 5
      });
    }else {
      messageApi.open({
        type: "error",
        content: "Tạo mới job không thành công.",
        duration: 5
      });
    }
  };
  return (
    <>
      {contextHolder}
      <GoBack />
      <h2>Tạo Job mới</h2>
      <Form
        form={form}
        name="createJob"
        layout="vertical"
        onFinish={handleFinish}
      >
        <Row gutter={[10, 10]}>
          <Col span={24}>
            <Form.Item label="Tên Job" name="name" rules={rules}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={16}>
            <Form.Item label="Tags" name="tags" rules={rules}>
              <Select mode="multiple" allowClear options={tags} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Mức lương" name="salary" rules={rules}>
              <Input addonAfter="$" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Thành phố" name="city" rules={rules}>
              <Select mode="multiple" allowClear options={city} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Mô tả" name="description">
              <TextArea rows={6} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Trạng thái"
              name="status"
              rules={rules}
              valuePropName="defaultChecked"
            >
              <Switch checkedChildren="Bật" unCheckedChildren="Tắt" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Tạo mới
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default CreateJob;
