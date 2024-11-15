import { OrderStatus, OrderStatusRender } from "@/enums";
import { useFetchOrders } from "@/hooks/useFetchOrders";
import { OrderInfo } from "@/types/order.types";
import { formatTimestampWithHour, timeAgo } from "@/utils/validate";
import { FilterOutlined } from "@ant-design/icons";
import {
  Button,
  Input,
  Table,
  TablePaginationConfig,
  TableProps,
  Tag,
  Tooltip,
} from "antd";
import React, { useCallback, useMemo, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import EditOrderModal from "./EditOrderModal";
import ExportOrder from "../admin/ExportOrder";

const OrderList: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = React.useState(10);
  const [, setOrderId] = useState<number | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<OrderInfo>();
  const navigate = useNavigate();

  const { data, isFetching, totalCount, refetch } = useFetchOrders(
    currentPage,
    pageSize,
  );

  const handleRefetch = useCallback(() => {
    refetch();
  }, []);

  const handleTableChange = useCallback((pagination: TablePaginationConfig) => {
    setCurrentPage(pagination.current || 1);
    setPageSize(pagination.pageSize || 10);
  }, []);

  const handleRowClick = useCallback(
    (record: number) => {
      setOrderId(record);
      navigate(`/store/order/${record}`);
    },
    [navigate],
  );

  const columns: TableProps<OrderInfo>["columns"] = useMemo(
    () => [
      {
        title: "Mã đơn hàng",
        dataIndex: "code",
        key: "code",
        width: "10%",
        className: "first-column",
        onCell: (record) => {
          return {
            onClick: () => {
              handleRowClick(record.id);
            },
          };
        },
      },
      {
        title: "Khách hàng",
        dataIndex: "customerEmail",
        key: "customerEmail",
        width: "12%",
      },
      {
        title: "Số điện thoại",
        dataIndex: "customerPhone",
        key: "customerPhone",
        width: "8%",
      },
      {
        title: "Giá tiền",
        dataIndex: "total",
        key: "total",
        width: "8%",
        render: (total: number) => total.toLocaleString("vi-VN") + " VNĐ",
      },
      {
        title: "Ngày tạo",
        dataIndex: "createDate",
        key: "createDate",
        width: "12%",
        render: (createDate: any) => {
          if (createDate) {
            return formatTimestampWithHour(createDate);
          } else {
            return "-";
          }
        },
      },
      {
        title: "Phương thức",
        dataIndex: "paymentMethod",
        key: "paymentMethod",
        width: "5%",
      },
      {
        title: "Thanh toán",
        dataIndex: "paymentStatus",
        key: "paymentStatus",
        width: "10%",
        render: (paymentStatus: any) => {
          let statusText = "";
          let tagColor = "";
          switch (paymentStatus) {
            case "PAID":
              statusText = "THÀNH CÔNG";
              tagColor = "green";
              break;
            case "FAILED":
              statusText = "THẤT BẠI";
              tagColor = "pink";
              break;
            default:
              statusText = "ĐANG CHỜ";
              tagColor = "gray";
              break;
          }
          return <Tag color={tagColor}>{statusText}</Tag>;
        },
      },
      {
        title: "Ngày thanh toán",
        dataIndex: "paymentDate",
        key: "paymentDate",
        width: "10%",
        render: (paymentDate: any) => {
          if (paymentDate) {
            return (
              <p className="text-left">
                <Tooltip title={formatTimestampWithHour(paymentDate)}>
                  {timeAgo(paymentDate)}
                </Tooltip>
              </p>
            );
          } else {
            return <p className="text-left">-</p>;
          }
        },
      },
      {
        title: "Trạng thái",
        dataIndex: "status",
        key: "status",
        width: "10%",
        render: (paymentStatus: any) => {
          let statusText = "";
          let tagColor = "";
          switch (paymentStatus) {
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
        },
      },
      {
        title: "Chức năng",
        width: "8%",
        dataIndex: "",
        render: (_, record) => (
          <>
            <div className="flex w-full justify-center">
              <CiEdit
                className="cursor-pointer"
                onClick={() => {
                  setIsOpen(true);
                  setSelectedOrder(record);
                }}
              />
            </div>
          </>
        ),
      },
    ],
    [],
  );

  return (
    <>
      <div className="flex justify-between">
        <div className="flex gap-x-2">
          <Input
            placeholder="Tìm kiếm..."
            className="h-8 max-w-lg rounded-lg sm:mb-5 sm:w-[300px]"
          />
          <Button className="flex items-center" type="primary">
            <FilterOutlined className="align-middle" />
            Sắp xếp
          </Button>
        </div>
        <div className="flex gap-x-2">
          <div></div>
          <div>
            {/* <Button type="primary" onClick={() => setIsOpen(true)}>
              <div className="flex justify-center">
                <UserAddOutlined className="mr-1 text-lg" /> Thêm người dùng
              </div>
            </Button> */}
            <ExportOrder />
          </div>
        </div>
      </div>
      <Table
        className="pagination"
        id="myTable"
        columns={columns}
        dataSource={data?.data}
        pagination={{
          current: currentPage,
          total: totalCount || 0,
          pageSize: pageSize,
        }}
        onChange={handleTableChange}
        loading={isFetching}
      />
      <EditOrderModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        selectedOrder={selectedOrder}
        handleRefetch={handleRefetch}
      />
    </>
  );
};

export default OrderList;
