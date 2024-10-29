import React, { useEffect, useMemo, useState } from "react";
import { Table, TableProps, Tag } from "antd";
import { OrderDetails, OrderInfo } from "@/types/order.types";
import { getOrderDetail } from "@/apis/orderApi";
import { formatTimestampWithHour } from "@/utils/validate";
import { OrderStatus, OrderStatusRender } from "@/enums";

export interface OrderDetailProps {
  orderId: number;
}

const OrderDetail: React.FC<OrderDetailProps> = React.memo((props) => {
  const { orderId } = props;
  const [orderData, setOrderData] = useState<OrderInfo>();

  useEffect(() => {
    if (orderId) {
      async function fetchOrderData() {
        const res = await getOrderDetail(orderId);
        if (res && res.status === 200) {
          setOrderData(res.data);
        }
      }
      fetchOrderData();
    }
  }, [orderId]);
  //     code: "ST03_OD_20241014104903",
  //     shipFee: null,
  //     discount: null,
  //     total: 20000,
  //     status: "SUCCESS",
  //     paymentStatus: "PAID",
  //     paymentDate: "2024-10-14T10:49:40.3826726",
  //     paymentMethod: "VNPAY",
  //     bankTranNo: "VNP14613155",
  //     bankCode: "NCB",
  //     transactionNo: "14613155",
  //     userId: 71,
  //     customerName: "Gia Đức Đặng",
  //     customerAddress: "Long An",
  //     customerEmail: "[MASKED]",
  //     customerPhone: "0909113114",
  //     storeId: 3,
  //     storeName: "VLXD Đức Đặng",
  //     storePhone: "0909113114",
  //     storeAddress: "[MASKED] 6, Hiệp Phú, TP. Thủ Đức, TP.HCM",
  //     voucherId: null,
  //     orderDetails: [
  //       {
  //         id: 101,
  //         orderId: 80,
  //         productId: 5,
  //         price: 20000,
  //         quantity: 1,
  //         productUnit: null,
  //         product: {
  //           id: 5,
  //           sku: "ST03_0002",
  //           name: "Cầu dao điện",
  //           image:
  //             "[MASKED]/v0/b/exe201-9459a.appspot.com/o/Fricks%2F8_0040_LS_EBN203c_125A_700x700.webp?alt=media&token=82749cfa-b250-4e4a-8296-389772a1e1e5",
  //           categoryId: 21,
  //           brandId: 14,
  //           description: "Cầu dao điện",
  //           quantity: 5,
  //           storeId: 3,
  //           soldQuantity: 7,
  //           isAvaiable: null,
  //           brand: null,
  //           category: null,
  //           price: [],
  //           createDate: "2024-10-04T00:52:04.7122772",
  //           updateDate: "2024-10-14T13:23:58.2999689",
  //           isDeleted: false,
  //           version: "AAAAAAAAEbo=",
  //         },
  //       },
  //     ],
  //     id: 80,
  //     createDate: "2024-10-14T10:49:03.6716346",
  //     updateDate: "2024-10-14T10:49:40.3827611",
  //   };

  const columns: TableProps<OrderDetails>["columns"] = useMemo(
    () => [
      {
        title: "Mã sản phẩm",
        dataIndex: ["product", "sku"],
        key: "sku",
      },
      {
        title: "Tên sản phẩm",
        dataIndex: ["product", "name"],
        key: "name",
      },
      {
        title: "Đơn vị tính",
        dataIndex: "productUnit",
        key: "productUnit",
      },
      {
        title: "Số lượng",
        dataIndex: "quantity",
        key: "quantity",
      },
      {
        title: "Giá",
        dataIndex: "price",
        key: "price",
        render: (price: number) => `${price.toLocaleString("vi-VN") + " VNĐ"}`,
      },
    ],
    [],
  );

  const getStatusText = (status: string | undefined): any => {
    if (status === undefined) {
      return <Tag color={'gray'}>-</Tag>;;
    }
    let statusText = "";
    let tagColor = "";
    switch (status) {
      case OrderStatus.DONE.toString():
        statusText = OrderStatusRender.DONE.toString();
        tagColor = "green";
        break;
      case OrderStatus.DELIVERY.toString():
        statusText = OrderStatusRender.DELIVERY.toString();
        tagColor = "orange";
        break;
      case OrderStatus.CANCELED.toString():
        statusText = OrderStatusRender.CANCELED.toString();
        tagColor = "pink";
        break;
      default:
        statusText = OrderStatusRender.PENDING.toString();
        tagColor = "gray";
        break;
    }
    return <Tag color={tagColor}>{statusText}</Tag>;
  };

  return (
    <div className="mx-auto p-2">
      <div className="mb-4 rounded-lg bg-white p-4 shadow">
        <table className="w-full table-auto">
          <tbody>
            <tr>
              <td className="px-4 py-2">
                <strong>Mã đơn hàng:</strong>
              </td>
              <td className="px-4 py-2">{orderData?.code}</td>
            </tr>
            <tr>
              <td className="px-4 py-2">
                <strong>Cửa hàng:</strong>
              </td>
              <td className="px-4 py-2">{orderData?.storeName}</td>
            </tr>
            <tr>
              <td className="px-4 py-2">
                <strong>Tên khách hàng:</strong>
              </td>
              <td className="px-4 py-2">{orderData?.customerName}</td>
            </tr>
            <tr>
              <td className="px-4 py-2">
                <strong>Địa chỉ khách hàng:</strong>
              </td>
              <td className="px-4 py-2">{orderData?.customerAddress}</td>
            </tr>
            <tr>
              <td className="px-4 py-2">
                <strong>Email khách hàng:</strong>
              </td>
              <td className="px-4 py-2">{orderData?.customerEmail}</td>
            </tr>
            <tr>
              <td className="px-4 py-2">
                <strong>Số điện thoại khách hàng:</strong>
              </td>
              <td className="px-4 py-2">{orderData?.customerPhone}</td>
            </tr>
            <tr>
              <td className="px-4 py-2"><strong>Phí giao hàng:</strong></td>
              <td className="px-4 py-2">{orderData?.shipFee?.toLocaleString("vi-VN") + " VNĐ"}</td>
            </tr>
            <tr>
              <td className="px-4 py-2"><strong>Giảm giá:</strong></td>
              <td className="px-4 py-2">{orderData?.discount?.toLocaleString("vi-VN") + " VNĐ"}</td>
            </tr>
            <tr>
              <td className="px-4 py-2">
                <strong>Tổng tiền:</strong>
              </td>
              <td className="px-4 py-2">
                {orderData?.total.toLocaleString("vi-VN") + " VNĐ"}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2">
                <strong>Trạng thái:</strong>
              </td>
              <td className="px-4 py-2">{getStatusText(orderData?.status)}</td>
            </tr>
            <tr>
              <td className="px-4 py-2">
                <strong>Phương thức thanh toán:</strong>
              </td>
              <td className="px-4 py-2">{orderData?.paymentMethod}</td>
            </tr>
            <tr>
              <td className="px-4 py-2">
                <strong>Ngày thanh toán:</strong>
              </td>
              <td className="px-4 py-2">
                {formatTimestampWithHour(orderData?.paymentDate)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Table
        columns={columns}
        dataSource={orderData?.orderDetails}
        rowKey="id"
        pagination={false}
      />
    </div>
  );
});

export default OrderDetail;
