import React, { useCallback, useMemo, useState } from "react";
import { Button, Input, Popconfirm, Table, Tag } from "antd";
import type { TablePaginationConfig, TableProps } from "antd";
import { FilterOutlined, UserAddOutlined } from "@ant-design/icons";
import { UserInfo } from "@/types/auth.types";
import AddUserModal from "./AddUserModal";
import { useFetchUsers } from "@/hooks/useFetchUsers";
import { deleteUser } from "@/apis/userApi";
import { notify } from "@/components/Notification";
import { CustomError } from "@/types/error.types";

const UserList: React.FC = React.memo(() => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = React.useState(3);

  const { data, isFetching, totalCount, refetch } = useFetchUsers(
    currentPage,
    pageSize,
    "",
  );

  const handleDeleteUser = useCallback(async (userId: number) => {
    try {
      const res = await deleteUser(userId);
      console.log("check res", res);
      if (res && res.status === 200) {
        refetch();
        notify("success", `${res.data.message}`, 3);
      }
      refetch();
    } catch (err: any) {
      console.error("err", err);
      notify("error", `${err.response.data.message}`, 3);
    }
  }, []);

  const handleTableChange = useCallback((pagination: TablePaginationConfig) => {
    setCurrentPage(pagination.current || 1);
    setPageSize(pagination.pageSize || 10);
  }, []);

  const columns: TableProps<UserInfo>["columns"] = useMemo(
    () => [
      {
        title: "STT",
        dataIndex: "index",
        key: "index",
        render: (_, _record, index) => index + 1,
      },
      {
        title: "Email",
        dataIndex: "email",
        width: "20%",
      },
      {
        title: "Họ và tên",
        dataIndex: "full-name",
        width: "15%",
      },
      {
        title: "Ngày sinh",
        dataIndex: "dob",
        width: "15%",
      },
      {
        title: "Địa chỉ",
        dataIndex: "address",
        width: "17%",
      },
      {
        title: "Số điện thoại",
        dataIndex: "phone-number",
        width: "10%",
      },
      {
        title: "Vai trò",
        dataIndex: "role",
        width: "5%",
      },
      {
        title: "Trạng thái",
        dataIndex: "status",
        render: (status) => {
          let statusText = "";
          let tagColor = "";
          switch (status) {
            case "ACTIVE":
              statusText = "ACTIVE";
              tagColor = "green";
              break;
            case "INACTIVE":
              statusText = "INACTIVE";
              tagColor = "pink";
              break;
            default:
              statusText = "UNKNOWN";
              tagColor = "gray";
              break;
          }
          return <Tag color={tagColor}>{statusText}</Tag>;
        },
        width: "10%",
      },
      {
        title: "",
        dataIndex: "",
      },
      {
        title: "Actions",
        dataIndex: "",
        render: (_, record) => (
          <Popconfirm
            title="Are you sure to delete this user?"
            onConfirm={() => handleDeleteUser(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
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
            <Button type="primary" onClick={() => setIsOpen(true)}>
              <div className="flex justify-center">
                <UserAddOutlined className="mr-1 text-lg" /> Thêm người dùng
              </div>
            </Button>
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
        // rowKey={(record) => record.id}
      />
      <AddUserModal setIsOpen={setIsOpen} isOpen={isOpen} />
    </>
  );
});

export default UserList;
