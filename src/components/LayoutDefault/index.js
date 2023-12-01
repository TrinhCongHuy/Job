import { Button, Layout, Space } from "antd";
import { Content, Footer } from "antd/es/layout/layout";
import { NavLink, Outlet } from "react-router-dom";
import "./LayoutDefault.scss";
import { getCookie } from "../../helpers/cookie";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

function LayoutDefault() {
  const token = getCookie("token");
  // eslint-disable-next-line no-unused-vars
  const isLogin = useSelector((state) => state.loginReducer);
  return (
    <>
      <Layout className="layout__default">
        <header className="layout__default--header">
          <div className="header">
            <div className="header__logo">
              <span>IT Jobs</span>
            </div>
            <div className="header__menu">
                <Button type="text">
                  <NavLink to="/">Home</NavLink>
                </Button>
            </div>
            <div className="header__account">
              {token ? (
                <>
                  <Space size="middle">
                    <Button icon={<UserOutlined />}>
                      <NavLink to="/admin">Quản lý</NavLink>
                    </Button>
                    <Button type="primary" icon={<LogoutOutlined />}>
                      <NavLink to="/logout">Đăng xuất</NavLink>
                    </Button>
                  </Space>
                </>
              ) : (
                <>
                  <Space size="middle">
                    <Button>
                      <NavLink to="/login">Đăng nhập</NavLink>
                    </Button>
                    <Button type="primary">
                      <NavLink to="/register">Đăng ký</NavLink>
                    </Button>
                  </Space>
                </>
              )}
            </div>
          </div>
        </header>
        <Content className="layout__default--main">
          <Outlet />
        </Content>
        <Footer className="layout__default--footer">
          Copyright 2023 by TrinhCongHuy
        </Footer>
      </Layout>
    </>
  );
}

export default LayoutDefault;
