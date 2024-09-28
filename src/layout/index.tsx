import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FloatButton, Layout, Menu } from "antd";
import {
  PieChartOutlined,
  HomeOutlined,
  PushpinOutlined,
  SmileOutlined,
  BellOutlined,
} from "@ant-design/icons";
import LogoWeb from "@/assets/images/logo/logo_web.png";

import { IoDocumentTextOutline } from "react-icons/io5";
import { notify } from "@/components/Notification";
import { useAuthStore } from "@/hooks/useAuthStore";
import ADMIN from "@/assets/images/avatar/avatar_admin.jpg";
import STORE from "@/assets/images/avatar/avatar_staff.jpg";
import { Roles } from "@/enums";
import { Loading } from "@/components";

interface LayoutProps {
  children: React.ReactNode;
}
interface MenuItem {
  key: string;
  icon?: React.ReactNode;
  label?: string;
  path?: string;
  children?: MenuItem[];
}

const { Content, Sider, Footer } = Layout;

function getItem(
  label: React.ReactNode,
  key: React.ReactNode,
  icon?: React.ReactNode,
  children?: MenuItem[],
  path?: string,
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    path,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Thống kê", "1", <PieChartOutlined />, undefined, "/chart"),
  getItem("Người dùng", "2", <PushpinOutlined />, undefined, "/user"),
  getItem("Cửa hàng", "3", <HomeOutlined />, undefined, "/store"),
  getItem("Đơn hàng", "4", <IoDocumentTextOutline />, undefined, "/order"),
  getItem("Thông báo", "9", <BellOutlined />, undefined, "/notification"),
  getItem("Thông tin", "10", <SmileOutlined />, undefined, "/personal"),
];

const DashboardLayout: React.FC<LayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const userInfo = useAuthStore((s) => s.userInfo);
  const isLoading = useAuthStore((s) => s.isLoading);

  const logout = useAuthStore((s) => s.logout);

  const navigate = useNavigate();

  const storeDefaultSelectedKeys = (key: string) => {
    sessionStorage.setItem("keys", key);
  };

  const resetDefaultSelectedKeys = () => {
    const selectedKeys = sessionStorage.getItem("keys");
    return selectedKeys ? selectedKeys.split(",") : ["1"];
  };

  const defaultSelectedKeys = useMemo(() => resetDefaultSelectedKeys(), []);

  const renderMenuItems = (items: MenuItem[]) => {
    return items.map((item) => {
      if (
        item &&
        "children" in item &&
        item.children &&
        item.children.length > 0
      ) {
        return (
          <Menu.SubMenu key={item.key} icon={item.icon} title={item.label}>
            {renderMenuItems(item.children)}
          </Menu.SubMenu>
        );
      } else {
        return (
          <Menu.Item
            key={item.key}
            icon={item.icon}
            onClick={() => storeDefaultSelectedKeys(item.key)}
          >
            {item.path ? <Link to={item.path}>{item.label}</Link> : item.label}
          </Menu.Item>
        );
      }
    });
  };

  const handleLogout = () => {
    notify("success", "Đăng xuất thành công", 2);
    logout();
    navigate("/");
  };

  return (
    <Layout className="min-h-screen">
      <Sider
        width={230}
        breakpoint="lg"
        collapsedWidth="55"
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        className={`scrollbar sider bottom-0 left-0 top-0 z-[1000] box-border min-h-screen flex-none overflow-auto overflow-y-auto ${collapsed ? "collapsed" : ""}`}
        theme="light"
        collapsible
      >
        <div className="demo-logo-vertical" />
        <div className="my-7 flex justify-center">
          <img
            className=" w-7/12 select-none object-cover"
            src={LogoWeb}
            alt=""
          />
        </div>
        <Menu
          theme="light"
          defaultSelectedKeys={defaultSelectedKeys}
          mode="inline"
          className="select-none"
        >
          {renderMenuItems(items)}
        </Menu>
      </Sider>
      <Layout
        className="scrollbar right-bar ease overflow-y-auto transition-all duration-150 ease-in-out"
        style={{ marginLeft: collapsed ? 55 : 230 }}
      >
        <div className="header fixed z-[999] flex h-16 items-center justify-end gap-2 bg-[#f8f8f8] bg-opacity-80 pr-4 shadow-none backdrop-blur-[6px]">
          {isLoading ? (
            <Loading></Loading>
          ) : (
            <>
              <img
                className="h-[42px] w-[42px] rounded-full border object-cover ring-2 ring-gray-300 hover:ring-[#0077ff]"
                src={
                  userInfo && userInfo?.role?.includes(Roles.ADMIN)
                    ? ADMIN
                    : STORE
                }
              />
              <div className="flex flex-col">
                <strong>{userInfo?.fullName || "Null"}</strong>
                <div
                  className="cursor-pointer font-semibold text-[#5099ff] hover:underline"
                  onClick={handleLogout}
                >
                  Đăng xuất
                </div>
              </div>
            </>
          )}
        </div>
        <Content className="mx-4 mt-[80px]">
          <div className="min-w-[250px] overflow-x-auto rounded-xl ">
            {children}
          </div>
        </Content>
        <Footer className="text-center">
          Copyright &copy;2024 Fricks.inc. All right reserved
        </Footer>
        <FloatButton.BackTop />
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
