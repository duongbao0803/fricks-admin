import React, { useCallback, useMemo, useState } from "react";
import { Button, Image, Input, Table, Tooltip } from "antd";
import type { TablePaginationConfig, TableProps } from "antd";
import { BookOutlined, FilterOutlined } from "@ant-design/icons";
import { useFetchPosts } from "@/hooks/useFetchPosts";
import AddPostModal from "./AddPostModal";
import { formatTimestampWithHour, timeAgo } from "@/utils/validate";
import DropdownPostFunc from "./DropdownPostFunc";
import { useNavigate } from "react-router-dom";
import { PostData } from "@/types/post.types";
import parse from "html-react-parser";

const PostList: React.FC = React.memo(() => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = React.useState(10);
  const [, setPostId] = useState<number | null>(null);

  const { data, isFetching, totalCount, refetch } = useFetchPosts(
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
      setPostId(record);
      navigate(`/post/${record}`);
    },
    [navigate],
  );

  const columns: TableProps<PostData>["columns"] = useMemo(
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
        className: "first-column",
        width: "20%",
        onCell: (record) => {
          return {
            onClick: () => {
              handleRowClick(record.id);
            },
          };
        },
      },
      {
        title: "Nội dung",
        dataIndex: "content",
        width: "15%",
        render: (content) => {
          return <div className="line-clamp-2">{parse(content)}</div>;
        },
      },

      {
        title: "Sản phẩm",
        dataIndex: "productName",
        width: "15%",
      },

      {
        title: "Thời gian tạo",
        dataIndex: "createDate",
        width: "10%",
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
        title: "Chỉnh sửa",
        dataIndex: "updateDate",
        width: "10%",
        render: (updateDate) => {
          if (updateDate) {
            return (
              <Tooltip title={formatTimestampWithHour(updateDate)}>
                {timeAgo(updateDate)}
              </Tooltip>
            );
          } else {
            return "-";
          }
        },
      },

      {
        title: "Chức năng",
        width: "8%",
        dataIndex: "",
        render: (_, record) => (
          <>
            <DropdownPostFunc
              postId={record.id}
              handleRefetch={handleRefetch}
            />
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
