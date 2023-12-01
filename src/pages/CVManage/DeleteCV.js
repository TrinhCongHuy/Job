import { Button, Popconfirm, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { deleteCV } from "../../services/cvService";

function DeleteCV(props) {
  const { record, onReload } = props;
  const handleDelete = async () => {
    const response = await deleteCV(record.id);
    if (response) {
      onReload();
    }
  };
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

export default DeleteCV;
