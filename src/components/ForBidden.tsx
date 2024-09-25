import React from "react";
import { Button, Result } from "antd";
import { ResultStatusType } from "antd/es/result";

interface ForBiddenParams {
  title: string;
  status: ResultStatusType;
  subTitle: string;
}

const ForBidden: React.FC<ForBiddenParams> = React.memo(
  ({ title, status, subTitle }) => {
    return (
      <Result
        status={status}
        title={title}
        subTitle={subTitle}
        extra={
          <Button type="primary" className="bg-[#1677ff]">
            Trở về trang chủ
          </Button>
        }
      />
    );
  },
);

export default ForBidden;
