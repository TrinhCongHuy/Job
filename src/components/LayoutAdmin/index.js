import { Button, Layout, Space } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Footer } from "antd/es/layout/layout";
import "./LayoutAdmin.scss";
import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import {
  HomeOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import MenuSider from "./MenuSider";

function LayoutAdmin() {
  const [collapse, setCollapse] = useState(false);
  return (
    <>
      <Layout className="layout__admin">
        <header className="layout__admin--header">
          <div
            className={
              collapse
                ? "layout__header-logo layout__header-logo-collapse"
                : "layout__header-logo"
            }
          >
            <Link to="/">
                {collapse ? <span>IT</span> : <span>IT Admin</span>}
            </Link>
          </div>
          <div className="layout__header-nav">
            <div className="layout__header-nav-left">
              <MenuFoldOutlined
                className="logo__bars"
                onClick={() => setCollapse(!collapse)}
              />
            </div>
            <div className="layout__header-nav-right">
              <Space size="large">
                <Button icon={<HomeOutlined />}>
                  <NavLink to="">Trang chủ</NavLink>
                </Button>
                <Button type="primary" icon={<LogoutOutlined />}>
                  <NavLink to="/logout">Đăng xuất</NavLink>
                </Button>
              </Space>
            </div>
          </div>
        </header>
        <Layout className="layout__admin--main">
          <Sider className="layout__sider" theme="light" collapsed={collapse}>
            <MenuSider />
          </Sider>
          <Content className="layout__content">
            <Outlet />
          </Content>
        </Layout>
        <Footer className="layout__admin--footer">Footer</Footer>
      </Layout>
    </>
  );
}

export default LayoutAdmin;
