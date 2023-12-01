import { Button, Divider } from "antd";
import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import JobList from "./JobList";

function JobManage() {
  return (
    <>
      <Divider plain>
        <h2>Danh sách việc làm</h2>
      </Divider>

      <Link to="/create-job">
        <Button icon={<PlusOutlined />}>Tạo việc mới</Button>
      </Link>
      <JobList className="mt-20" />
    </>
  );
}

export default JobManage;
