import React, { useCallback, useMemo, useState } from "react";
import { Button, Image, Input, Table } from "antd";
import type { TablePaginationConfig, TableProps } from "antd";
import { BookOutlined, FilterOutlined } from "@ant-design/icons";
import { UserInfo } from "@/types/auth.types";
import { useFetchPosts } from "@/hooks/useFetchPosts";
import AddPostModal from "./AddPostModal";
import { formatTimestampWithHour } from "@/utils/validate";
import DropdownPostFunc from "./DropdownPostFunc";

const PostList: React.FC = React.memo(() => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = React.useState(10);

  const { data, isFetching, totalCount, refetch } = useFetchPosts(
    currentPage,
    pageSize,
  );

  const handleRefetch = useCallback(() => {
    refetch();
  }, []);

  // const handleDeleteUser = useCallback(async (userId: number) => {
  //   try {
  //     const res = await deleteUser(userId);
  //     console.log("check res", res);
  //     if (res && res.status === 200) {
  //       handleRefetch();
  //       notify("success", `${res.data.message}`, 3);
  //     }
  //   } catch (err: any) {
  //     console.error("err", err);
  //     notify("error", `${err.response.data.message}`, 3);
  //   }
  // }, []);

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
        width: "5%",
        render: (_, _record, index) => index + 1,
      },
      {
        title: "Hình ảnh",
        dataIndex: "image",
        width: "10%",

        render: (image) => (
          <Image
            src={image}
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "100%",
              objectFit: "cover",
            }}
          />
        ),
      },
      {
        title: "Tiêu đề",
        dataIndex: "title",
        width: "20%",
      },
      {
        title: "Nội dung",
        dataIndex: "content",
        width: "15%",
        render: (content) => {
          return <div className="line-clamp-2">{content}</div>;
        },
      },

      {
        title: "Sản phẩm",
        dataIndex: "productName",
        width: "15%",
      },

      {
        title: "Ngày tạo",
        dataIndex: "createDate",
        width: "10%",
        render: (createDate) => {
          if (createDate) {
            return formatTimestampWithHour(createDate);
          } else {
            return "N/A";
          }
        },
      },
      {
        title: "Chỉnh sửa",
        dataIndex: "updateDate",
        width: "10%",
        render: (updateDate) => {
          if (updateDate) {
            return formatTimestampWithHour(updateDate);
          } else {
            return "N/A";
          }
        },
      },

      {
        title: "Chức năng",
        width: "8%",
        dataIndex: "",
        render: (_, record) => (
          <>
            <DropdownPostFunc postId={record.id} handleRefetch={handleRefetch} />
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
            <Button type="primary" onClick={() => setIsOpen(true)}>
              <div className="flex justify-center">
                <BookOutlined className="mr-1 text-lg" /> Thêm bài viết
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
      <AddPostModal
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        handleRefetch={handleRefetch}
      />
    </>
  );
});

export default PostList;
