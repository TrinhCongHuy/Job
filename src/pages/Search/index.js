/* eslint-disable react-hooks/exhaustive-deps */
import {useSearchParams} from 'react-router-dom'
import {useState, useEffect} from 'react'
import { getAllJob } from '../../services/jobService';
import { Tag } from 'antd';
import SearchList from './SearchList';

function Search() {
    // eslint-disable-next-line
    const [searchParams, setSearchParams] = useSearchParams();
    const [dataSearch, setDataSearch]= useState();
    const citySearch = searchParams.get("city" || "");
    const keywordSearch = searchParams.get("keyword" || "");

    useEffect(() => {
        const fetchApi = async () => {
            const response = await getAllJob();
            if (response) {
                const newData = response.filter((item) => {
                    const city = citySearch ? item.city?.includes(citySearch) : true;
                    const keyword = keywordSearch ? item.tags?.includes(keywordSearch) : true;
                    const status = item.status;
                    return city && keyword && status;
                })
                setDataSearch(newData.reverse());
            }
        }
        fetchApi();
    }, [])

    return ( 
        <>
            <div>
                <strong>Kết quả tìm kiếm: </strong>
                {citySearch && <Tag>{citySearch}</Tag>}
                {keywordSearch && <Tag>{keywordSearch}</Tag>}
            </div>
            {dataSearch && (
                <SearchList data={dataSearch}/>
            )}
        </>
     );
}

export default Search;