import React, { useCallback, useMemo, useState } from "react";
import { Button, Image, Input, Table } from "antd";
import type { TablePaginationConfig, TableProps } from "antd";
import { FilterOutlined, PlusCircleOutlined } from "@ant-design/icons";
import "react-loading-skeleton/dist/skeleton.css";
import { ProductInfo } from "@/types/product.types";
import DropdownProductFunc from "./DropdownProductFunc";
import { useFetchProducts } from "@/hooks/useFetchProducts";

export interface DataType {
  key: string;
  sku: string;
  image: string;
  name: string;
  unit: string;
  price: string;
  store: string;
}

const ProductList: React.FC = () => {
  const [,setIsOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = React.useState(10);
  const { data, isFetching, totalCount } = useFetchProducts(
    currentPage,
    pageSize,
    0,
    0,
    0,
  );

  const columns: TableProps<ProductInfo>["columns"] = useMemo(
    () => [
      {
        title: "STT",
        dataIndex: "index",
        key: "index",
        width: "5%",
        render: (_, _record, index) => index + 1,
      },
      {
        title: "SKU",
        dataIndex: "sku",
        width: "10%",
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
              objectFit: "contain",
            }}
          />
        ),
      },
      {
        title: "Tên sản phẩm",
        dataIndex: "name",
        width: "15%",
        className: "first-column",
      },
      {
        title: "Loại",
        dataIndex: "categoryName",
        width: "15%",
      },
      {
        title: "Thương hiệu",
        dataIndex: "brandName",
        width: "8%",
      },
      {
        title: "Số lượng",
        dataIndex: "quantity",
        width: "8%",
      },
      {
        title: "Cửa hàng",
        dataIndex: "storeName",
        width: "10%",
      },
      {
        title: "Chức năng",
        width: "8%",
        dataIndex: "",
        render: (_, record) => (
          <>
            <DropdownProductFunc productId={record.id} />
          </>
        ),
      },
    ],
    [],
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
          <div>{/* <ExportProduct /> */}</div>
          <div>
            <Button type="primary" onClick={() => setIsOpen(true)}>
              <div className="flex justify-center">
                <PlusCircleOutlined className="mr-1 text-lg" />
                Thêm sản phẩm
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
    </>
  );
};

export default ProductList;
