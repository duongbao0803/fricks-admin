import React, { useCallback, useMemo, useState } from "react";
import { Button, Input, Popconfirm, Table } from "antd";
import type { TablePaginationConfig, TableProps } from "antd";
import { FilterOutlined, PlusCircleOutlined, UserAddOutlined } from "@ant-design/icons";
import { notify } from "@/components/Notification";
import { Roles } from "@/enums";
import { FaBan } from "react-icons/fa";
import { useFetchBrands } from "@/hooks/useFetchBrands";
import { deleteBrand } from "@/apis/brandApi";
import { CiEdit } from "react-icons/ci";
import AddBrandModal from "./AddBrandModal";
import EditBrandModal from "./EditBrandModal";
import { useAuthStore } from "@/hooks/useAuthStore";
import { BrandInfo } from "@/types/brand.types";
import { formatDate2 } from "@/utils/validate";

export const BrandList: React.FC = React.memo(() => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedBrand, setSelectedBrand] = useState<BrandInfo | null>(null); // State to hold selected brand
  const userInfo = useAuthStore((s) => s.userInfo);

  const { data, isFetching, totalCount, refetch } = useFetchBrands(
    currentPage,
    pageSize,
  );

  const handleRefetch = useCallback(() => {
    refetch();
  }, []);

  const handleDeleteBrand = useCallback(async (brandId: number) => {
    try {
      const res = await deleteBrand(brandId);
      console.log("check res", res);
      if (res && res.status === 200) {
        handleRefetch();
        notify("success", `${res.data.message}`, 3);
      }
    } catch (err: any) {
      if (err && err.status === 403) {
        notify("error", "Bạn không có quyền xóa thương hiệu", 3);
      } else {
        notify("error", `${err.response.data.message}`, 3);
      }
    }
  }, []);

  const handleTableChange = useCallback((pagination: TablePaginationConfig) => {
    setCurrentPage(pagination.current || 1);
    setPageSize(pagination.pageSize || 10);
  }, []);

  const columns: TableProps<BrandInfo>["columns"] = useMemo(
    () => [
      {
        title: "STT",
        dataIndex: "index",
        key: "index",
        render: (_, _record, index) => index + 1,
      },
      {
        title: "Thương hiệu",
        dataIndex: "name",
      },
      {
        title: "Ngày tạo",
        dataIndex: "createDate",
        width: "15%",
        render: (createDate) => {
          if (createDate) {
            return formatDate2(createDate);
          } else {
            return "N/A";
          }
        },
      },
      {
        title: "Chức năng",
        dataIndex: "",
        render: (_, record: BrandInfo) => (
          <div className="flex items-center justify-center">
            {userInfo?.role === Roles.ADMIN && (
              <Popconfirm
                title="Bạn có muốn cấm người dùng này không?"
                onConfirm={() => handleDeleteBrand(record.id)}
                okText="Có"
                cancelText="Không"
              >
                <Button danger size="small" className="border-none">
                  <FaBan />
                </Button>
              </Popconfirm>
            )}
            <CiEdit
              className="ml-3 cursor-pointer"
              onClick={() => {
                setSelectedBrand(record);
                setIsOpenEdit(true);
              }}
            />
          </div>
        ),
      },
    ],
    [userInfo],
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
          <Button type="primary" onClick={() => setIsOpen(true)}>
            <div className="flex justify-center">
              <PlusCircleOutlined className="mr-1 text-lg" /> Thêm thương hiệu
            </div>
          </Button>
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
        rowKey={(record) => record.id.toString()}
      />
      <AddBrandModal
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        handleRefetch={handleRefetch}
      />
      <EditBrandModal
        setIsOpenEdit={setIsOpenEdit}
        isOpenEdit={isOpenEdit}
        handleRefetch={handleRefetch}
        selectedBrand={selectedBrand}
      />
    </>
  );
});

export default BrandList;
