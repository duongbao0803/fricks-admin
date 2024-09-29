import React, { useState } from "react";
import { Dropdown } from "antd";
import { DeleteOutlined, EditOutlined, MoreOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import EditProductModal from "./EditProductModal";
import { ProductInfo } from "@/types/product.types";

export interface DropdownProductFuncProps {
  productInfo: ProductInfo;
}

const DropdownProductFunc: React.FC<DropdownProductFuncProps> = React.memo(
  () => {
    const [isOpen, setIsOpen] = useState(false);
    // const { deleteProductItem } = useProductService();
    // const { productInfo } = props;
    // const busproductId = productInfo?.id;

    const openEditModal = () => {
      setIsOpen(true);
    };

    return (
      <>
        <Dropdown
          menu={{
            items: [
              {
                key: "1",
                label: (
                  <Link
                    rel="noopener noreferrer"
                    to="#"
                    onClick={openEditModal}
                  >
                    <EditOutlined className="pr-2" />
                    Chỉnh sửa cửa hàng
                  </Link>
                ),
              },
              {
                key: "2",
                label: (
                  <Link
                    rel="noopener noreferrer"
                    to="#"
                    // onClick={() =>
                    //   DeleteProductModal({
                    //     busproductId,
                    //     deleteProductItem,
                    //   })
                    // }
                  >
                    <DeleteOutlined className="pr-2" />
                    Xóa cửa hàng
                  </Link>
                ),
              },
            ],
          }}
          trigger={["click"]}
        >
          <MoreOutlined className="rotate-90" />
        </Dropdown>

        <EditProductModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          // productInfo={productInfo}
        />
      </>
    );
  },
);

export default DropdownProductFunc;
