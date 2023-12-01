import {
  CopyOutlined,
  UsergroupAddOutlined,
  RadarChartOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { Link } from "react-router-dom";

function MenuSider() {
  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  const items = [
    getItem(<Link to="/admin">Tổng quan</Link>, "1", <RadarChartOutlined />),
    getItem(
      <Link to="/info-company">Thông tin công ty</Link>,
      "2",
      <UsergroupAddOutlined />
    ),
    getItem(
      <Link to="/job-manage">Quản lý việc làm</Link>,
      "3",
      <UnorderedListOutlined />
    ),
    getItem(<Link to="/cv-manage">Quản lý CV</Link>, "4", <CopyOutlined />),
  ];
  return (
    <>
      <Menu
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        theme="light"
        items={items}
      />
    </>
  );
}

export default MenuSider;
