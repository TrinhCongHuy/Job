import { useEffect, useState } from "react";
import { getAllCompany } from "../../services/companyService";
import { Button, Card, Col, Row } from "antd";
import { Link } from "react-router-dom";

function CompanyList() {
  const [dataCompany, setDataCompany] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getAllCompany();
      if (response) {
        setDataCompany(response);
      }
    };
    fetchApi();
  }, []);
  console.log(dataCompany);
  return (
    <>
      <h2>Danh sách các công ty</h2>
      <Row gutter={[20, 20]}>
        {dataCompany.map((item) => (
          <Col span={8} key={item.id}>
            <Link to={`/company/${item.id}`}>
              <Card>
                <div className="mb-10">
                    Công ty: <strong>{item.companyName}</strong>
                </div>
                <div className="mb-10">
                    Số nhân sự: <strong>{item.quantityPeople}</strong>
                </div>
                <div className="mb-10">
                    Địa chỉ: <strong>{item.address}</strong>
                </div>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
      <Link to={`/company`}>
        <Button className="mt-20">Xem thêm</Button>
      </Link>
    </>
  );
}

export default CompanyList;
