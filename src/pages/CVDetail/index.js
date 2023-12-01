/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import GoBack from "../../components/GoBack";
import { useEffect, useState } from "react";
import { changeStatusCV, getDetailCV } from "../../services/cvService";
import { getJobDetail } from "../../services/jobService";
import { Card, Tag } from "antd";

function CVDetail() {
  const params = useParams();
  const [cv, setCV] = useState({});
  const [job, setJob] = useState({});

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getDetailCV(params.id);
      if (response) {
        const responseJob = await getJobDetail(response.idJob);
        if (responseJob) {
          setCV(response);
          setJob(responseJob);
        }
      }
      changeStatusCV(params.id, { statusRead: true });
    };
    fetchApi();
  }, []);

  return (
    <>
      <GoBack />
      <Card className="mt-20" title={`Ứng viên: ${cv.name}`}>
        <div className="mt-10">
          <span>Ngày gửi: </span>
          <strong>{cv.createAt}</strong>
        </div>
        <div className="mt-20">
          <span>Số điện thoại: </span>
          <strong>{cv.phone}</strong>
        </div>
        <div className="mt-20">
          <span>Email: </span>
          <strong>{cv.email}</strong>
        </div>
        <div className="mt-20">
          <span>Thành phố ứng tuyển: </span>
          <strong>{cv.city}</strong>
        </div>
        <div className="mt-20">
          <span>Giới thiệu bản thân : </span>
          <p>{cv.description}</p>
        </div>
        <div className="mt-20">
          <span>Link project : </span>
          <p>{cv.linkProject}</p>
        </div>
      </Card>
      <Card className="mt-20" title={`Thông tin job: ${job.name}`}>
        <div className="mt-10">
          <span>Tags: </span>
          {(job.tags || []).map((tag, index) => (
            <Tag color="blue" key={index}>{tag}</Tag>
          ))}
        </div>
        <div className="mt-20">
          <span>Mức lương: </span>
          <strong>{job.salary}$</strong>
        </div>
        <div className="mt-20">
          <span>Mô tả: </span>
          <p>{job.description}$</p>
        </div>
      </Card>
    </>
  );
}

export default CVDetail;
