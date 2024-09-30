import React from "react";
import { Modal } from "antd";

const DeleteProductModal: React.FC<{
  deleteProductItem: (id: number) => void;
  productId: number;
}> = ({ deleteProductItem, productId }) => {
  const confirm = Modal.confirm;
  confirm({
    title: "Xóa nhà xe",
    content: `Bạn có muốn xóa sản phẩm này không. Sản phẩm này không thể được khôi phục`,
    okText: "Có",
    okType: "danger",
    cancelText: "Không",
    onOk() {
      deleteProductItem(productId);
    },
  });
  return null;
};

export default DeleteProductModal;
