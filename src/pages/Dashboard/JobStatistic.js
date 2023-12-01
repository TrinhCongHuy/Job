/* eslint-disable react-hooks/exhaustive-deps */
import { getCookie } from "../../helpers/cookie";
import { useEffect, useState } from "react";
import { getListJob } from "../../services/jobService";
import { Card } from "antd";

function JobStatistic() {
    const idCompany = getCookie("id");
    const [data, setData] = useState();

    useEffect(() => {
        const fetchApi = async () => {
            const response = await getListJob(idCompany);
            if (response) {
                let obj = {
                    total: 0,
                    statusTrue: 0,
                    statusFalse: 0
                };
                obj.total = response.length;
                response.forEach(item => {
                    item.status ? obj.statusTrue++ : obj.statusFalse++
                });
                setData(obj);
            }
        }
        fetchApi()
    }, [])
    return ( 
        <>
            {data && (
                <Card title="Job" className="mb-20" size="small">
                    <div className="mt-20">
                        Số lượng job: <strong>{data.total}</strong>
                    </div>
                    <div className="mt-20">
                        Job đang bật: <strong>{data.statusTrue}</strong>
                    </div>
                    <div className="mt-20">
                        Job đang tắt: <strong>{data.statusFalse}</strong>
                    </div>
                </Card>
            )}
        </>
     );
}

export default JobStatistic;