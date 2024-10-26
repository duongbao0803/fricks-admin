import { useFetchBanners } from "@/hooks/useFetchBanner";
import { BannerData } from "@/types/banner.types";
import { formatTimestampWithHour, timeAgo } from "@/utils/validate";
import { BookOutlined, FilterOutlined } from "@ant-design/icons";
import { Button, Image, Input, Table, TableProps, Tooltip } from "antd";
import React, { useMemo, useState } from "react";

const BannerList: React.FC = React.memo(() => {

  const [, setIsOpen] = useState<boolean>(false);
  const { data, isFetching } = useFetchBanners();

  const columns: TableProps<BannerData>["columns"] = useMemo(
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
        width: "25%",

        render: (image) => (
          <Image
            src={image}
            style={{
              width: "250px",
              height: "100px",
              objectFit: "cover",
            }}
          />
        ),
      },
      // {
      //   title: "Tiêu đề",
      //   dataIndex: "title",
      //   className: "first-column",
      //   width: "20%",
      //   onCell: (record) => {
      //     return {
      //       onClick: () => {
      //         handleRowClick(record.id);
      //       },
      //     };
      //   },
      // },
      {
        title: "Vị trí",
        dataIndex: "index",
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
        // render: (_, record) => (
        //   <>
        //     <DropdownPostFunc
        //       postId={record.id}
        //       handleRefetch={handleRefetch}
        //     />
        //   </>
        // ),
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
                <BookOutlined className="mr-1 text-lg" /> Thêm hình ảnh
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
        // onChange={handleTableChange}
        loading={isFetching}
        // rowKey={(record) => record.id}
      />
      {/* <AddPostModal
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        handleRefetch={handleRefetch}
      /> */}
    </>
  );
});

export default BannerList;
