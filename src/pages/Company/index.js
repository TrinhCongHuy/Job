import { useEffect, useState } from "react";
import { getAllCompany } from "../../services/companyService";
import { Card, Col, Row } from "antd";
import { Link } from "react-router-dom";
import GoBack from "../../components/GoBack";

function Company() {
  const [dataCompany, setDataCompany] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getAllCompany();
      if (response) {
        setDataCompany(response);
      }
    };
    fetchApi();
  });
  return (
    <>
    <GoBack />
      <h1>Danh sách công ty</h1>

      <Row gutter={[20, 20]}>
        {dataCompany.map((item) => (
          <Col span={8} key={item.id}>
            <Link to={`/company/${item.id}`}>
              <Card>
                <div className="mb-10">
                  Công ty: <strong>{item.companyName}</strong>
                </div>
                <div className="mb-10">
                  Số điện thoại: <strong>{item.phone}</strong>
                </div>
                <div className="mb-10">
                  Số nhân sự: <strong>{item.quantityPeople}</strong>
                </div>
                <div className="mb-10">
                  Website: <strong>{item.website}</strong>
                </div>
                <div className="mb-10">
                  Địa chỉ: <strong>{item.address}</strong>
                </div>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Company;
