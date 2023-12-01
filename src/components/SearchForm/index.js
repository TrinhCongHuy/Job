import { useState, useEffect } from "react";
import { getListCity } from "../../services/cityService";
import { Button, Col, Form, Input, Row, Select } from "antd";
import { useNavigate } from "react-router-dom";
import './SearchForm.scss'

function SearchForm() {
  const [dataCity, setDataCity] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getListCity();
      if (response) {
        const objAll = {
          key: 0,
          value: "All",
        };
        setDataCity([objAll, ...response]);
      }
    };
    fetchApi();
  }, []);

  const options = dataCity;

  const handleFinish = (values) => {
    let city = values.city || "";
    city = values.city === "All" ? "" : city;
    navigate(`/search?city=${city}&keyword=${values.keyword || ""}`);
  };

  return (
    <>
      <div className="search__form">
        <h1>1000+ IT Jobs For Developers</h1>
        {dataCity && (
          <Form
            name="basic"
            style={{
              maxWidth: 600,
            }}
            onFinish={handleFinish}
          >
            <Row gutter={[12, 12]}>
              <Col xxl={6} xl={6} lg={6}>
                <Form.Item name="city">
                  <Select
                    placeholder="Chọn thành phố"
                    options={options}
                    allowClear
                  />
                </Form.Item>
              </Col>
              <Col xxl={15} xl={15} lg={15}>
                <Form.Item name="keyword">
                  <Input placeholder="Nhập từ khoá..." />
                </Form.Item>
              </Col>
              <Col xxl={3} xl={3} lg={3}>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Tìm kiếm
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        )}
      </div>
    </>
  );
}

export default SearchForm;
