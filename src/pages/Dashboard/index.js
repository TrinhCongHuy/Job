import { Col, Divider, Row } from "antd";
import JobStatistic from "./JobStatistic";
import CVStatistic from "./CVStatistic";
import InfoCompany from "./InfoCompany";

function Dashboard() {
  return (
    <>
      <Divider plain>
        <h2>Tổng quan</h2>
      </Divider>
      
      <Row gutter={[20, 20]}>
        <Col span={12}>
          <InfoCompany />
        </Col>
        <Col span={12}>
          <JobStatistic />
        </Col>
        <Col span={12}>
          <CVStatistic />
        </Col>
      </Row>
    </>
  );
}

export default Dashboard;
