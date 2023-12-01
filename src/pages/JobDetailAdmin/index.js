/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getJobDetail } from "../../services/jobService";
import GoBack from "../../components/GoBack";
import { Tag } from "antd";

function JobDetailAdmin() {
  const params = useParams();
  const [data, setData] = useState();

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getJobDetail(params.id);
      if (response) {
        setData(response);
      }
    };
    fetchApi();
  }, []);


  return (
    <>
      <GoBack />
      {data && (
        <>
          <h2>Tên job: {data.name}</h2>
          <div className="mt-20">
            <span>Trạng thái: </span>
            {data.status ? (
                <Tag color="green">Đang bật</Tag>
            ) : (
                <Tag color="orange">Đang tắt</Tag>
            )}
          </div>
          <div className="mt-20">
            <span>Tags: </span>
            {data.tags.map((tag, index) => (
                <Tag color="blue" key={index}>{tag}</Tag>
            ))}
          </div>
          <div className="mt-20">
            <span>Mức lương: </span>
            <strong>{data.salary}$</strong>
          </div>
          <div className="mt-20">
            <span>Ngày tạo: </span>
            <strong>{data.createAt}</strong>
          </div>
          <div className="mt-20">
            <span>Cập nhật: </span>
            <strong>{data.updateAt}</strong>
          </div>
          <div className="mt-20">
            <span>Thành phố: </span>
            {data.city.map((city, index) => (
                <Tag color="orange" key={index}>{city}</Tag>
            ))}
          </div>
          <div className="mt-20">
            <span>Mô tả: </span>
            <p>{data.description}</p>
          </div>
        </>
      )}
    </>
  );
}

export default JobDetailAdmin;
