import { addRequestWithdrawStore } from "@/apis/walletApi";
import { notify } from "@/components/Notification";
import { WithdrawStatus, WithdrawStatusRender } from "@/enums";
import { useFetchWithdraws } from "@/hooks/useFetchWithdraws";
import { WithdrawInfo } from "@/types/withdraw.types";
import { formatTimestampWithHour, timeAgo } from "@/utils/validate";
import {
  Button,
  Form,
  InputNumber,
  Table,
  TablePaginationConfig,
  TableProps,
  Tag,
  Tooltip
} from "antd";
import React, { useCallback, useMemo, useState } from "react";

interface Withdrawal {
  amount: number;
  requester: string;
  status: string;
  createdDate: string;
  confirmedDate: string;
  note: string;
}
const WalletWithDraw: React.FC = React.memo(() => {
  const [form] = Form.useForm();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = React.useState(10);
  const { data, isFetching, totalCount, refetch } = useFetchWithdraws(
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

  const onFinish = async () => {
    try {
      const values = await form.validateFields();
      console.log("check value", values);

      setTimeout(async () => {
        try {
          await handleAddWithdraw(values);
        } catch (error) {}
      }, 1500);
    } catch (errorInfo) {
      console.error("Validation failed:", errorInfo);
    }
  };

  const handleAddWithdraw = useCallback(async (withDrawData: any) => {
    try {
      const res = await addRequestWithdrawStore(withDrawData);
      if (res && res.status === 200) {
        notify("success", "Gửi yêu cầu rút tiền thành công", 3);
        handleRefetch();
        form.resetFields();
      }
    } catch (err: any) {
      notify("error", `${err.response.data.message}`, 3);
    }
  }, []);

  const columns: TableProps<WithdrawInfo>["columns"] = useMemo(
    () => [
      {
        title: "STT",
        dataIndex: "index",
        key: "index",
        render: (_, _record, index) => index + 1,
      },
      {
        title: "Số tiền",
        dataIndex: "amount",
        key: "amount",
      },
      {
        title: "Yêu cầu",
        dataIndex: "requester",
        key: "requester",
      },
      {
        title: "Trạng thái",
        dataIndex: "status",
        key: "status",
        render: (status: string) => {
          let statusText = "";
          let tagColor = "";
          switch (status) {
            case WithdrawStatus.PENDING.toString():
              statusText = WithdrawStatusRender.PENDING.toString();
              tagColor = "orange";
              break;
            case WithdrawStatus.APPROVED.toString():
              statusText = WithdrawStatusRender.APPROVED.toString();
              tagColor = "green";
              break;
            case WithdrawStatus.REJECTED.toString():
              statusText = WithdrawStatusRender.REJECTED.toString();
              tagColor = "red";
              break;
            case WithdrawStatus.DONE.toString():
              statusText = WithdrawStatusRender.DONE.toString();
              tagColor = "blue";
              break;
            default:
              statusText = status;
              tagColor = "gray";
              break;
          }
          return <Tag color={tagColor}>{statusText}</Tag>;
        },
      },
      {
        title: "Ngày tạo",
        dataIndex: "createDate",
        key: "createDate",
        render: (createDate) => {
          if (createDate) {
            return (
              <Tooltip title={formatTimestampWithHour(createDate)}>
                {timeAgo(createDate)}
              </Tooltip>
            );
          } else {
            return "-";
          }
        },
      },
      {
        title: "Xác nhận bởi",
        dataIndex: "confirmBy",
        key: "confirmBy",
      },
      {
        title: "Ngày xác nhận",
        dataIndex: "confirmedDate",
        key: "confirmedDate",
      },
      {
        title: "Ghi chú",
        dataIndex: "note",
        key: "note",
      },
    ],
    [],
  );

  return (
    <div className="mx-auto p-4">
      <h2 className="mb-4 text-2xl font-bold">Yêu cầu rút tiền</h2>
      <Form form={form} onFinish={onFinish} className="mb-4">
        <Form.Item
          name="amount"
          rules={[
            { required: true, message: "Vui lòng nhập số tiền!" },
            {
              type: "number",
              min: 100000,
              max: 10000000,
              message: "Số tiền phải từ 100.000 đến 10.000.000 VNĐ",
            },
          ]}
        >
          <InputNumber
            className="w-full"
            placeholder="Số tiền"
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value: any) => value.replace(/\$\s?|(,*)/g, "")}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Tạo yêu cầu
          </Button>
        </Form.Item>
      </Form>
      <h2 className="mb-4 text-2xl font-bold">Lịch sử rút tiền</h2>
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
    </div>
  );
});

export default WalletWithDraw;
