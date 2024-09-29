import React from "react";

export interface StoreProductListProps {
  storeId: number;
}

const StoreProductList: React.FC<StoreProductListProps> = React.memo(
  (props) => {
    const { storeId } = props;

    return <div>StoreProductList... {storeId}</div>;
  },
);

export default StoreProductList;
