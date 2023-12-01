import { Button, Col, Form, Input, Modal, Row, Select, Switch, message } from "antd";
import { useEffect, useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import { getListTag } from "../../services/tagService";
import { getListCity } from "../../services/cityService";
import { getTimeCurrent } from "../../helpers/getTime";
import { updateJob } from "../../services/jobService";

function EditJob(props) {
  const { record, onReload } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tags, setTags] = useState([]);
  const [city, setCity] = useState([]);
  const { TextArea } = Input;
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

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

  const rules = [
    {
      required: true,
      message: "Please input your data!",
    },
  ];
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  const handleFinish = async (values) => {
    values.updateAt = getTimeCurrent();
    const response = await updateJob(record.id, values)
    if (response) {
      setIsModalOpen(false);
      onReload();
      messageApi.open({
        type: 'success',
        content: 'Cập nhật Job thành công.',
        duration: 5
      });
      
    }else {
      messageApi.open({
        type: 'error',
        content: 'Cập nhật Job không thành công.',
        duration: 5
      });
    }
  };

  return (
    <>
    {contextHolder}
      <Button type="primary" onClick={showModal} icon={<EditOutlined />} />
      <Modal
        title="Chỉnh sửa"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          name="editJob"
          layout="vertical"
          onFinish={handleFinish}
          initialValues={record}
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
              <Form.Item label="Mô tả" name="description" rules={rules}>
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
                  Cập nhật
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
}

export default EditJob;
