import { formatDate2 } from "@/utils/validate";
import { FilterOutlined } from "@ant-design/icons";
import { Button, Input, Table, Tag } from "antd";
import React from "react";

const OrderList: React.FC = () => {

  interface OrderInfo {
    code: string;
    createdate: string;
    paymentdate: string;
    paymentstatus: string;
    paymentmethod: string;
    store: string;
    total: number;
  }
  

  const orderData: OrderInfo[] = [
    {
      code: 'ORD001',
      createdate: '2024-10-01',
      paymentdate: '2024-10-02',
      paymentstatus: 'Paid',
      paymentmethod: 'Credit Card',
      store: 'Store A',
      total: 150.0,
    },
    {
      code: 'ORD002',
      createdate: '2024-10-01',
      paymentdate: '2024-10-02',
      paymentstatus: 'Pending',
      paymentmethod: 'PayPal',
      store: 'Store B',
      total: 200.0,
    },
    {
      code: 'ORD003',
      createdate: '2024-10-01',
      paymentdate: '2024-10-02',
      paymentstatus: 'Failed',
      paymentmethod: 'Bank Transfer',
      store: 'Store C',
      total: 300.0,
    },
  ];
  

  const columns = [
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Create Date",
      dataIndex: "createdate",
      key: "createdate",
      render: (createdate: any) => {
        if (createdate) {
          return formatDate2(createdate);
        } else {
          return "N/A";
        }
      },
    },
    {
      title: "Payment Date",
      dataIndex: "paymentdate",
      key: "paymentdate",
      render: (paymentdate: any) => {
        if (paymentdate) {
          return formatDate2(paymentdate);
        } else {
          return "N/A";
        }
      },
    },
    {
      title: "Payment Status",
      dataIndex: "paymentstatus",
      key: "paymentstatus",
      render: (paymentstatus: any) => {
        let statusText = "";
        let tagColor = "";
        switch (paymentstatus) {
          case "Paid":
            statusText = "THÀNH CÔNG";
            tagColor = "green";
            break;
          case "Failed":
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
      title: "Payment Method",
      dataIndex: "paymentmethod",
      key: "paymentmethod",
    },
    {
      title: "Store",
      dataIndex: "store",
      key: "store",
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
    },
  ];

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
          </div>
        </div>
      </div>
      <Table
        className="pagination"
        id="myTable"
        columns={columns}
        dataSource={orderData}
        // pagination={{
        //   current: currentPage,
        //   total: totalCount || 0,
        //   pageSize: pageSize,
        // }}
        // onChange={handleTableChange}
        // loading={isFetching}
        // rowKey={(record) => record.id}
      />
    </>
  );
};

export default OrderList;
