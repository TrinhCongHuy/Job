/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { getDetailCompany } from "../../services/companyService";
import { getCookie } from "../../helpers/cookie";
import { Card } from "antd";

function InfoCompany() {
  const idCompany = getCookie("id");
  const [data, setData] = useState();

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getDetailCompany(idCompany);
      if (response) {
        setData(response);
      }
    };
    fetchApi();
  }, []);

  return (
    <>
    
      {data && (
        <Card title="Company" className="mb-20" size="small">
          <div className="mt-20">
            Tên công ty: <strong>{data.companyName}</strong>
          </div>
          <div className="mt-20">
            Email: <strong>{data.email}</strong>
          </div>
          <div className="mt-20">
            Số điện thoại: <strong>{data.phone}</strong>
          </div>
          <div className="mt-20">
            Số nhân viên: <strong>{data.quantityPeople}</strong>
          </div>
        </Card>
      )}
    </>
  );
}

export default InfoCompany;
