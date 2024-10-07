import { useFetchCategories } from '@/hooks/useFetchCategories';
import { CategoryInfo } from '@/types/category.types';
import { formatDate2 } from '@/utils/validate';
import { FilterOutlined } from '@ant-design/icons';
import { Button, Input, Table, TablePaginationConfig, TableProps } from 'antd';
import React, { useCallback, useMemo, useState } from 'react'

const CategoryList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = React.useState(10);

  const { data, isFetching, totalCount } = useFetchCategories(
    currentPage,
    pageSize,
  );

  const columns: TableProps<CategoryInfo>["columns"] = useMemo(
    () => [
      {
        title: "STT",
        dataIndex: "index",
        key: "index",
        width: "10%",
        render: (_, _record, index) => index + 1,
      },
      {
        title: "Mã danh mục",
        dataIndex: "code",
        width: "20%",
      },
      {
        title: "Tên danh mục",
        dataIndex: "name",
        width: "30%",
      },
      {
        title: "Ngày tạo",
        dataIndex: "createDate",
        width: "30%",
        render: (createDate) => {
          if (createDate) {
            return formatDate2(createDate);
          } else {
            return "N/A";
          }
        },
      }
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
        <div></div>
        <div>
          {/* <Button type="primary">
            <div className="flex justify-center">
              <UserAddOutlined className="mr-1 text-lg" /> Thêm danh mục
            </div>
          </Button> */}
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
  </>
  )
}

export default CategoryList