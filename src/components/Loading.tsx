import React from "react";
import { Flex, Spin } from "antd";

interface LoadingParams {
  size?: "small" | "large" | "default";
  tip?: string;
}

const Loading: React.FC<LoadingParams> = React.memo(({ size, tip }) => {
  return (
    <Flex gap="small" vertical className="select-none">
      <Flex gap="small" align="center" justify="center">
        <Spin tip={tip} size={size}>
          <div className="p-[50px]" />
        </Spin>
      </Flex>
    </Flex>
  );
});

export default Loading;
