/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Table, Tag, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { getCookie } from "../../helpers/cookie";
import { useEffect, useState } from "react";
import { getListCV } from "../../services/cvService";
import {EyeOutlined} from '@ant-design/icons'
import CVJobName from "./CVJobName";
import DeleteCV from "./DeleteCV";

function CVList() {
  const idCompany = getCookie("id");
  const [dataCV, setDataCV] = useState([]);

  const fetchApi = async () => {
    const response = await getListCV(idCompany);
    if (response) {
      setDataCV(response);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  const handleReload = () => {
    fetchApi();
  }

  const columns = [
    {
      title: "Tên Job",
      dataIndex: "idJob",
      key: "idJob",
      render: (_, record) => <CVJobName record={record} />,
    },
    {
      title: "Họ tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Ngày gửi",
      dataIndex: "createAt",
      key: "createAt",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (_, record) => (
        <>
          {record.statusRead ? (
            <Tag color="green">Đã đọc</Tag>
          ) : (
            <Tag color="orange">Chưa đọc</Tag>
          )}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <Link to={`/detail-cv/${record.id}`}>
            <Tooltip title="Xem chi tiết">
              <Button icon={<EyeOutlined />}/>
            </Tooltip>
          </Link>
          <DeleteCV record={record} onReload={handleReload}/>
        </>
      ),
    },
  ];
  return (
    <>
      <Table columns={columns} dataSource={dataCV} rowKey="id" />;
    </>
  );
}

export default CVList;
