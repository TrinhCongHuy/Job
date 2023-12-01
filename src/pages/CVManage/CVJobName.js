/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { getJobDetail } from "../../services/jobService";

function CVJobName(props) {
    const {record} = props;
    const [data, setData] = useState();
    useEffect(() => {
        const fetchApi = async () => {
            const response = await getJobDetail(record.idJob);
            if (response) {
                setData(response);
            }
        }
        fetchApi()
    }, []);
    return ( 
        <>
            {data && (
                <p>{data.name}</p>
            )}
        </>
     );
}

export default CVJobName;