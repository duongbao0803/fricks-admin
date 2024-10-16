"use client";
import React from "react";
import { Breadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

interface BreadcrumbItem {
  href?: string;
  title: React.ReactNode;
}

interface BreadScrumbProps {
  items: BreadcrumbItem[];
}

const BreadScrumb: React.FC<BreadScrumbProps> = ({ items }) => {
  const breadcrumbItems = [
    {
      href: "/",
      title: <HomeOutlined />,
    },
    ...items,
  ];

  return (
    <Breadcrumb>
      {breadcrumbItems.map((item, index) => (
        <Breadcrumb.Item key={index}>
          {item.href ? <Link to={item.href}>{item.title}</Link> : item.title}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default React.memo(BreadScrumb);