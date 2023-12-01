/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import GoBack from "../../components/GoBack";
import { useEffect, useState } from "react";
import { getDetailCompany } from "../../services/companyService";
import { getListJob } from "../../services/jobService";
import { Col, Row } from "antd";
import JobItem from "../../components/JobItem";

function CompanyDetail() {
    const params = useParams()
    const [dataCompany, setDataCompany] = useState();
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const response = await getDetailCompany(params.id);
            if (response) {
                setDataCompany(response);
            }
        }
        fetchApi();
    }, [])

    useEffect(() => {
        const fetchApi = async () => {
            const response = await getListJob(params.id);
            if (response) {
                setJobs(response);
            }
        }
        fetchApi();
    }, [])
    
    return ( 
        <>
            <GoBack />
            {dataCompany && (
                <>
                    <h1>{dataCompany.companyName}</h1>
                    <div className="mb-20">
                        Địa chỉ: <strong>{dataCompany.address}</strong>
                    </div>
                    <div className="mb-20">
                        Số lượng nhân sự: <strong>{dataCompany.quantityPeople}</strong>
                    </div>
                    <div className="mb-20">
                        Thời gian làm việc: <strong>{dataCompany.workingTime}</strong>
                    </div>
                    <div className="mb-20">
                        Link website: <strong>{dataCompany.website}</strong>
                    </div>
                    <div className="mb-10">Mô tả ngắn:</div>
                    <div className="mb-20">
                        {dataCompany.description}
                    </div>
                    <div className="mb-10">Mô tả chi tiết:</div>
                    <div className="mb-20">
                        {dataCompany.detail}
                    </div>
                    <div className="mb-10">Danh sách các job:</div>
                    <div className="mb-20">
                        <Row gutter={[20, 20]}>
                            {jobs.map((item, index) => (
                                <Col span={8} key={index}>
                                    <JobItem item={item} />
                                </Col>
                            ))}
                        </Row>
                    </div>
                </>
            )}
        </>
     );
}

export default CompanyDetail;