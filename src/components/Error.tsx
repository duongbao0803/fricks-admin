import React from "react";
import { Button, Result } from "antd";
import { Link } from "react-router-dom";
import { ResultStatusType } from "antd/es/result";

interface ErrorParams {
  title?: string;
  status?: ResultStatusType;
  subTitle?: string;
  path?: string;
}

const Error: React.FC<ErrorParams> = React.memo(
  ({ title, status, subTitle, path }) => {
    return (
      <Result
        status={status}
        title={title}
        subTitle={subTitle}
        extra={
          <Button type="primary" className="bg-[#1677ff]">
            <Link to={path}>Trở về trang chủ</Link>
          </Button>
        }
      />
    );
  },
);

export default Error;
