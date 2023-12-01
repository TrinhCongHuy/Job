import { Button, Popconfirm, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { deleteJob } from "../../services/jobService";

function DeleteJob(props) {
    const {record, onReload} = props;
    const handleDelete = async () => {
        const response = await deleteJob(record.id);
        if (response) {
            onReload()
        }
    }
  return (
    <>
      <Tooltip title="Xoá bản ghi">
        <Popconfirm
          title="Bạn có chắc muốn xoá?"
          okText="Yes"
          cancelText="No"
          onConfirm={handleDelete}
        >
          <Button danger icon={<DeleteOutlined />} />
        </Popconfirm>
      </Tooltip>
    </>
  );
}

export default DeleteJob;
