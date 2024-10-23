import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Table, Card, Tag, TablePaginationConfig, TableProps } from "antd";
import { useFetchWalletTransactions } from "@/hooks/useFetchWalletTransactions";
import { formatTimestampWithHour } from "@/utils/validate";
import { getStoreWallet } from "@/apis/walletApi";
import { CommonModel } from "@/types/common.types";

const Wallet: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = React.useState(10);
  const [storeWallet, setStoreWallet] = useState<WalletInfo>();

  const { data, isFetching, totalCount } = useFetchWalletTransactions(
    currentPage,
    pageSize,
  );

  const handleTableChange = useCallback((pagination: TablePaginationConfig) => {
    setCurrentPage(pagination.current || 1);
    setPageSize(pagination.pageSize || 10);
  }, []);

  const getStoreWalletInfo = async () => {
    try {
      const res = await getStoreWallet();
      if (res && res.status === 200) {
        setStoreWallet(res.data);
      }
    } catch (err) {
      console.log("Error fetching store wallet info: ", err);
    }
  };

  useEffect(() => {
    getStoreWalletInfo();
  }, []);

  interface WalletInfo extends CommonModel {
    storeId: number;
    storeName: string;
    balance: number;
  }

  const columns: TableProps<WalletInfo>["columns"] = useMemo(
    () => [
      {
        title: "STT",
        dataIndex: "index",
        key: "index",
        render: (_, _record, index) => index + 1,
      },
      {
        title: "Loại giao dịch",
        dataIndex: "transactionType",
        key: "transactionType",
        render: (type: "IN" | "OUT") => (
          <Tag color={type === "IN" ? "green" : "red"}>
            {type === "IN" ? "IN" : "OUT"}
          </Tag>
        ),
      },
      {
        title: "Số tiền",
        dataIndex: "amount",
        key: "amount",
        render: (amount: number) => amount.toLocaleString("vi-VN") + " VNĐ",
      },
      { title: "Mô tả", dataIndex: "description", key: "description" },
      {
        title: "Thời gian",
        dataIndex: "createDate",
        key: "createDate",
        render: (createDate: any) => {
          if (createDate) {
            return formatTimestampWithHour(createDate);
          } else {
            return <span>-</span>;
          }
        },
      },
    ],
    [],
  );

  //   const availableBalance = transactions.reduce(
  //     (acc, transaction) => acc + transaction.amount,
  //     0,
  //   );

  return (
    <div className="mx-auto p-4">
      <Card title="Cửa hàng" className="mb-4">
        <p className="text-2xl font-bold">{storeWallet?.storeName}</p>
      </Card>
      <Card title="Số dư khả dụng" className="mb-4">
        <p className="text-2xl font-bold">
          {storeWallet?.balance.toLocaleString("vi-VN") + " VNĐ"}
        </p>
      </Card>
      <Card title="Danh sách giao dịch">
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
      </Card>
    </div>
  );
};

export default Wallet;
