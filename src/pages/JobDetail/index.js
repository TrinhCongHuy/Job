/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getJobDetail } from "../../services/jobService";
import { getDetailCompany } from "../../services/companyService";
import GoBack from "../../components/GoBack";
import { Button, Card, Col, Form, Input, Row, Select, Tag, notification } from "antd";
import { getTimeCurrent } from "../../helpers/getTime";
import {createCV} from '../../services/cvService'

function JobDetail() {
  const params = useParams();
  const [ form ]= Form.useForm();
  const { Option } = Select;
  const { TextArea } = Input;
  const [noti, contextHolder]  = notification.useNotification()
  const [dataJob, setDataJob] = useState();
  const rules = [
    {
      required: true,
      message: "Please input your username!",
    },
  ];

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getJobDetail(params.id);
      const infoCompany = await getDetailCompany(response.idCompany);
      const dataFinal = {
        ...response,
        infoCompany: infoCompany,
      };
      setDataJob(dataFinal);
    };
    fetchApi();
  }, []);


  const handleFinish = async (values) => {
    values.idJob = dataJob.id;
    values.idCompany = dataJob.infoCompany.id;
    values.createAt = getTimeCurrent();
    const response = await createCV(values);

    if (response) {
        form.resetFields();
        noti.success({
            message: 'Gửi yêu cầu thành công!',
            description: 'Nhà tuyển dụng sẽ liên hệ với bạn trong thời gian sớm nhất.',
            duration: 3
        })
    }else {
        noti.error({
            message: 'Gửi yêu cầu không thành công!',
            description: 'Hệ thống đang gặp lỗi, vui lòng thử lại sau.',
            duration: 3
        })
    }
  };

  return (
    <>
    {contextHolder}
      <GoBack />
      {dataJob && (
        <>
          <h1>{dataJob.name}</h1>
          <Button
            type="primary"
            size="large"
            className="mb-20"
            href="#formApply"
          >
            Ứng tuyển ngay
          </Button>

          <div className="mb-20">
            <span>Tags: </span>
            {(dataJob.tags || []).map((item, index) => (
              <Tag color="blue" key={index}>
                {item}
              </Tag>
            ))}
          </div>
          <div className="mb-20">
            <span>Thành phố: </span>
            {(dataJob.city || []).map((item, index) => (
              <Tag color="orange" key={index}>
                {item}
              </Tag>
            ))}
          </div>
          <div className="mb-20">
            Mức lương: <strong>{dataJob.salary}$</strong>
          </div>
          <div className="mb-20">
            Địa chỉ công ty: <strong>{dataJob.infoCompany.address}</strong>
          </div>
          <div className="mb-20">
            Thời gian đăng bài: <strong>{dataJob.createAt}</strong>
          </div>
          <div className="mb-20">
            <div className="mb-10">Mô tả công việc:</div>
            <div>{dataJob.description}</div>
          </div>
          <div className="mb-20">
            <div className="mb-10">Giới thiệu công ty:</div>
            <div>{dataJob.infoCompany.description}</div>
          </div>

          <Card title="Ứng tuyển ngay" id="formApply">
            <Form
              name="form_apply"
              form={form}
              layout="vertical"
              onFinish={handleFinish}
            >
              <Row gutter={20}>
                <Col span={6}>
                  <Form.Item label="Họ tên" name="name" rules={rules}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item label="Số điện thoại" name="phone" rules={rules}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item label="Email" name="email" rules={rules}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item label="Thành phố" name="city" rules={rules}>
                    <Select>
                      {dataJob.city.map((item, index) => (
                        <Option value={item} label={item} key={index}></Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    label="Giới thiệu bản thân"
                    name="description"
                    rules={rules}
                  >
                    <TextArea rows={5}/>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    label="Danh sách các project đã làm"
                    name="linkProject"
                    rules={rules}
                  >
                    <TextArea rows={5}/>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">Gửi yêu cầu</Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Card>
        </>
      )}
    </>
  );
}

export default JobDetail;
