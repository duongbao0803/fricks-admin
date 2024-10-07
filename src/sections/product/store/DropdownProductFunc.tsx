import React, { useState } from "react";
import { Dropdown } from "antd";
import { DeleteOutlined, EditOutlined, MoreOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import EditProductModal from "./EditProductModal";

export interface DropdownProductFuncProps {
  productId: number;
}

const DropdownProductFunc: React.FC<DropdownProductFuncProps> = React.memo(
  (props) => {
    const [isOpen, setIsOpen] = useState(false);
    // const { deleteProductItem } = useProductService();
    const { productId } = props;
    // const busproductId = productInfo?.id;

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
                    to={`/store/product/${productId}`}
                    // onClick={openEditModal}
                  >
                    <EditOutlined className="pr-2" />
                    Chỉnh sửa sản phẩm
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
                    Xóa sản phẩm
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
