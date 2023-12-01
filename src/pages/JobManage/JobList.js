/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Space, Table, Tag, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { getListJob } from "../../services/jobService";
import { getCookie } from "../../helpers/cookie";
import { Link } from "react-router-dom";
import { EyeOutlined } from "@ant-design/icons";
import EditJob from "./EditJob";
import DeleteJob from "./DeleteJob";

function JobList() {
  const idCompany = getCookie("id");
  const [data, setData] = useState();
  const columns = [
    {
      title: "Tên Job",
      dataIndex: "name",
      key: "name",
      align: "center"
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      align: "center",
      render: (_, record) => (
        <>
          {(record.tags || []).map((tag, index) => (
            <Tag color="blue" key={index}>
              {tag}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: "Mức lương ($)",
      dataIndex: "salary",
      key: "salary",
      align: "center"
    },
    {
      title: "Thời gian",
      key: "time",
      align: "center",
      render: (_, record) => (
        <>
          <small>Ngày tạo: {record.createAt}</small>
          <br />
          <small>Cập nhật: {record.updateAt}</small>
        </>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (_, record) => (
        <>
          {record.status ? (
            <Tag color="green">Đang bật</Tag>
          ) : (
            <Tag color="orange">Đang tắt</Tag>
          )}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <>
          <Space size="small">
            <Link to={`/detail-job/${record.id}`}>
              <Tooltip title="Xem chi tiết">
                <Button icon={<EyeOutlined />} />
              </Tooltip>
            </Link>
            <EditJob record={record} onReload={handleReload} />
            <DeleteJob record={record} onReload={handleReload} />
          </Space>
        </>
      ),
    },
  ];

  const fetchApi = async () => {
    const response = await getListJob(idCompany);
    if (response) {
      setData(response);
    }
  };
  fetchApi();

  useEffect(() => {
    fetchApi();
  }, []);

  const handleReload = () => {
    fetchApi();
  };

  return (
    <>
      <Table className="mt-20" columns={columns} dataSource={data} rowKey="id" />;
    </>
  );
}

export default JobList;
