import React, { useCallback, useMemo, useState } from "react";
import { Button, Image, Input, Table, Tag } from "antd";
import type { TablePaginationConfig, TableProps } from "antd";
import { FilterOutlined, PlusCircleOutlined } from "@ant-design/icons";
import "react-loading-skeleton/dist/skeleton.css";
import AddStoreModal from "./AddStoreModal";
import { useNavigate } from "react-router-dom";
import { StoreInfo } from "@/types/store.types";
import { useFetchStores } from "@/hooks/useFetchStores";
import { formatTimestampWithHour } from "@/utils/validate";

const StoreList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = React.useState(10);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // const { Stores, totalCount, isFetching, fetchStoreDetail } =
  //   useStoreService();
  // const [currentPage, setCurrentPage] = useState<number>(1);
  // const [storeDetail, setStoreDetail] = useState<StoreInfo>();
  const [, setStoreId] = useState<number | null>(null);
  // const { TextArea } = Input;
  const navigate = useNavigate();
  // const { statusText, tagColor } =
  //   storeDetail && !storeDetail?.isDeletedd
  //     ? renderStatusTag(!storeDetail?.isDeletedd)
  //     : { statusText: <Skeleton count={1} width={90} />, tagColor: "" };
  // const [form] = Form.useForm();

  // const fetchData = async (StoreId: number) => {
  //   try {
  //     const res = await fetchStoreDetail(StoreId);
  //     if (res && res.status === 200) {
  //       setStoreDetail(res.data);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching route detail:", error);
  //   }
  // };

  const { data, isFetching, totalCount, refetch } = useFetchStores(
    currentPage,
    pageSize,
  );

  const handleRefetch = useCallback(() => {
    refetch();
  }, []);

  // const dataSource = [
  //   {
  //     id: 1,
  //     name: "Cửa hàng A",
  //     image: "https://via.placeholder.com/100",
  //     accountManager: "manager_a",
  //     address: "TPHCM",
  //     taxCode: "1234567890",
  //     createDate: "2023-01-10",
  //     updateDate: null,
  //     isDeleted: false,
  //   },
  //   {
  //     id: 2,
  //     name: "Cửa hàng B",
  //     image: "https://via.placeholder.com/100",
  //     accountManager: "manager_b",
  //     address: "TPHCM",
  //     taxCode: "1234567890",
  //     createDate: "2023-02-15",
  //     updateDate: null,
  //     isDeleted: true,
  //   },
  //   {
  //     id: 3,
  //     name: "Cửa hàng C",
  //     image: "https://via.placeholder.com/100",
  //     accountManager: "manager_c",
  //     address: "TPHCM",
  //     taxCode: "1234567890",
  //     createDate: "2023-03-05",
  //     updateDate: null,
  //     isDeleted: false,
  //   },
  // ];

  const columns: TableProps<StoreInfo>["columns"] = useMemo(
    () => [
      {
        title: "STT",
        dataIndex: "index",
        key: "index",
        render: (_, _record, index) => index + 1,
      },
      {
        title: "Tên cửa hàng",
        dataIndex: "name",
        width: "15%",
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
        title: "Tài khoản quản lý",
        dataIndex: "managerEmail",
        width: "15%",
      },
      {
        title: "Địa chỉ",
        dataIndex: "address",
        width: "20%",
      },
      {
        title: "Mã số thuế",
        dataIndex: "taxCode",
        width: "15%",
      },
      {
        title: "Ngày tạo",
        dataIndex: "createDate",
        width: "13%",
        render: (createDate) => {
          if (createDate) {
            return formatTimestampWithHour(createDate);
          } else {
            return "N/A";
          }
        },
      },
      {
        title: "Trạng thái",
        dataIndex: "isDeleted",
        render: (isDeleted) => {
          let statusText = "";
          let tagColor = "";
          switch (isDeleted) {
            case false:
              statusText = "ACTIVE";
              tagColor = "green";
              break;
            case true:
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
    ],
    [],
  );

  const handleRowClick = useCallback(
    (record: number) => {
      setStoreId(record);
      navigate(`/store/${record}`);
    },
    [navigate],
  );

  const handleTableChange = useCallback((pagination: TablePaginationConfig) => {
    setCurrentPage(pagination.current || 1);
    setPageSize(pagination.pageSize || 10);
  }, []);

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
          <div>{/* <ExportStore /> */}</div>
          <div>
            <Button type="primary" onClick={() => setIsOpen(true)}>
              <div className="flex justify-center">
                <PlusCircleOutlined className="mr-1 text-lg" />
                Thêm cửa hàng
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
      />
      <AddStoreModal
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        handleRefetch={handleRefetch}
      />
    </>
  );
};

export default StoreList;
