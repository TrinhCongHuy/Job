import { Divider } from "antd";
import CVList from "./CVList";

function CVManage() {
    return ( 
        <>
            <Divider plain>
                <h2>Danh sách CV</h2>
            </Divider>
            
            <CVList />
        </>
     );
}

export default CVManage;