import React, { useCallback, useMemo, useState } from "react";
import { Button, Image, Input, Table } from "antd";
import type { TablePaginationConfig, TableProps } from "antd";
import { FilterOutlined, PlusCircleOutlined } from "@ant-design/icons";
import "react-loading-skeleton/dist/skeleton.css";
import AddProductModal from "./AddProductModal";
import DropdownProductFunc from "./DropdownProductFunc";
import { ProductInfo } from "@/types/product.types";
import { useNavigate } from "react-router-dom";
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
  // const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = React.useState(10);

  const { data, isFetching, totalCount, refetch } = useFetchProducts(
    currentPage,
    pageSize,
    0,
    0,
  );

  // const { Products, totalCount, isFetching, fetchProductDetail } =
  //   useProductService();
  // const [currentPage, setCurrentPage] = useState<number>(1);
  // const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // const [productDetail, setProductDetail] = useState<ProductInfo>();
  // const { TextArea } = Input;
  // const { statusText, tagColor } =
  //   productDetail && !productDetail?.isDeleted
  //     ? renderStatusTag(!productDetail?.isDeleted)
  //     : { statusText: <Skeleton count={1} width={90} />, tagColor: "" };
  // const [form] = Form.useForm();

  // const fetchData = async (ProductId: number) => {
  //   try {
  //     const res = await fetchProductDetail(ProductId);
  //     if (res && res.status === 200) {
  //       setProductDetail(res.data);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching route detail:", error);
  //   }
  // };

  // const handleTableChange = useCallback((pagination: TablePaginationConfig) => {
  //   setCurrentPage(pagination.current || 1);
  // }, []);

  // const handleRowClick = async (record: number) => {
  //   setProductDetail(undefined);
  //   // await fetchData(record);
  // };

  const handleTableChange = useCallback((pagination: TablePaginationConfig) => {
    setCurrentPage(pagination.current || 1);
    setPageSize(pagination.pageSize || 10);
  }, []);

  const handleAddProduct = () => {
    navigate("/store/product/add");
  };

  const dataSource = [
    {
      id: 1,
      sku: "BM_21",
      name: "Ống nước phi 21",
      image: "https://via.placeholder.com/100",
      categoryId: 5,
      brandId: 3,
      description: "Đây là ống nước",
      quantity: 50,
      storeId: 1,
      soldQuantity: 0,
      brand: {
        id: 3,
        name: "Bình Minh",
      },
      category: {
        id: 5,
        name: "Ống nước & Phụ kiện",
      },
      price: [
        {
          id: 1,
          productId: 1,
          unitId: 1,
          price: 100000,
          unit: {
            id: 1,
            name: "Cây",
          },
        },
        {
          id: 2,
          productId: 1,
          unitId: 2,
          price: 20000,
          unit: {
            id: 2,
            name: "Mét",
          },
        },
      ],
      createDate: "2024-09-25T22:27:01.7236043",
      updateDate: null,
      isDeleted: false,
      version: "AAAAAAAAD88=",
    },
    {
      id: 2,
      sku: "BM_22",
      name: "Ống nước phi 22",
      image: "https://via.placeholder.com/100",
      categoryId: 5,
      brandId: 3,
      description: "Đây là ống nước phi 22",
      quantity: 30,
      storeId: 1,
      soldQuantity: 5,
      brand: {
        id: 3,
        name: "Bình Minh",
      },
      category: {
        id: 5,
        name: "Ống nước & Phụ kiện",
      },
      price: [
        {
          id: 3,
          productId: 2,
          unitId: 1,
          price: 120000,
          unit: {
            id: 1,
            name: "Cây",
          },
        },
        {
          id: 4,
          productId: 2,
          unitId: 2,
          price: 25000,
          unit: {
            id: 2,
            name: "Mét",
          },
        },
      ],
      createDate: "2024-09-26T10:15:00.0000000",
      updateDate: null,
      isDeleted: false,
      version: "AAAAAAAAD89=",
    },
    {
      id: 3,
      sku: "BM_23",
      name: "Ống nước phi 23",
      image: "https://via.placeholder.com/100",
      categoryId: 5,
      brandId: 3,
      description: "Đây là ống nước phi 23",
      quantity: 40,
      storeId: 1,
      soldQuantity: 10,
      brand: {
        id: 3,
        name: "Bình Minh",
      },
      category: {
        id: 5,
        name: "Ống nước & Phụ kiện",
      },
      price: [
        {
          id: 5,
          productId: 3,
          unitId: 1,
          price: 130000,
          unit: {
            id: 1,
            name: "Cây",
          },
        },
        {
          id: 6,
          productId: 3,
          unitId: 2,
          price: 27000,
          unit: {
            id: 2,
            name: "Mét",
          },
        },
      ],
      createDate: "2024-09-27T14:45:00.0000000",
      updateDate: null,
      isDeleted: false,
      version: "AAAAAAAAD90=",
    },
    {
      id: 4,
      sku: "BM_24",
      name: "Ống nước phi 24",
      image: "https://via.placeholder.com/100",
      categoryId: 5,
      brandId: 3,
      description: "Đây là ống nước phi 24",
      quantity: 20,
      storeId: 1,
      soldQuantity: 2,
      brand: {
        id: 3,
        name: "Bình Minh",
      },
      category: {
        id: 5,
        name: "Ống nước & Phụ kiện",
      },
      price: [
        {
          id: 7,
          productId: 4,
          unitId: 1,
          price: 140000,
          unit: {
            id: 1,
            name: "Cây",
          },
        },
        {
          id: 8,
          productId: 4,
          unitId: 2,
          price: 28000,
          unit: {
            id: 2,
            name: "Mét",
          },
        },
      ],
      createDate: "2024-09-28T09:30:00.0000000",
      updateDate: null,
      isDeleted: false,
      version: "AAAAAAAAD91=",
    },
  ];

  const columns: TableProps<ProductInfo>["columns"] = useMemo(
    () => [
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
              objectFit: "cover",
            }}
          />
        ),
      },
      {
        title: "Tên sản phẩm",
        dataIndex: "name",
        width: "20%",
        className: "first-column",
      },
      {
        title: "Loại",
        dataIndex: ["category", "name"],
        width: "15%",
      },
      {
        title: "Thương hiệu",
        dataIndex: ["brand", "name"],
        width: "15%",
      },
      {
        title: "Số lượng",
        dataIndex: "quantity",
        width: "10%",
      },
      {
        title: "Đã bán",
        dataIndex: "soldQuantity",
        width: "10%",
      },
      {
        title: "Chức năng",
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
            <Button type="primary" onClick={handleAddProduct}>
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
        // dataSource={Products?.map(
        //   (record: { id: unknown; "create-date": string | Date }) => ({
        //     ...record,
        //     key: record.id,
        //     "create-date": formatDate2(record["create-date"]),
        //   }),
        // )}
        // pagination={{
        //   current: currentPage,
        //   total: totalCount || 0,
        //   pageSize: 5,
        // }}
        // onChange={handleTableChange}
        // loading={isFetching}
        // rowKey={(record) => record.id}
        // onRow={(record) => ({
        //   onClick: () => handleRowClick(record.id),
        // })}
      />
      {/* <AddProductModal setIsOpen={setIsOpen} isOpen={isOpen} /> */}
      {/* <Modal
        title={
          <p className="text-lg font-bold text-[red]">
            Chi tiết nhà xe &nbsp;
            {!ProductDetail?.isDeleted && (
              <Tag color={tagColor}>{statusText}</Tag>
            )}
          </p>
        }
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        {ProductDetail ? (
          <Form name="normal_login" className="login-form" form={form}>
            <Row gutter={16} className="relative mt-1">
              <Col span={12}>
                <Form.Item
                  label="Tên nhà xe"
                  labelCol={{ span: 24 }}
                  className="formItem"
                >
                  <Input
                    prefix={
                      <EnvironmentOutlined className="site-form-item-icon mr-1" />
                    }
                    className="p-2"
                    defaultValue={ProductDetail?.name}
                    readOnly
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Email quản lý"
                  labelCol={{ span: 24 }}
                  className="formItem"
                >
                  <Input
                    prefix={
                      <MailOutlined className="site-form-item-icon mr-1" />
                    }
                    className="p-2"
                    defaultValue={ProductDetail?.["manager-email"]}
                    readOnly
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16} className="relative mt-1">
              <Col span={12}>
                <Form.Item
                  label="Ngày tạo"
                  labelCol={{ span: 24 }}
                  className="formItem"
                >
                  <DatePicker
                    picker="date"
                    format="DD/MM/YYYY"
                    className="formItem w-full p-2"
                    defaultValue={dayjs(ProductDetail["create-date"])}
                    disabled
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Ngày chỉnh sửa"
                  labelCol={{ span: 24 }}
                  className="formItem"
                >
                  <DatePicker
                    picker="date"
                    format="DD/MM/YYYY"
                    className="formItem w-full p-2"
                    defaultValue={dayjs(ProductDetail["update-date"])}
                    disabled
                  />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              label="Mô tả ngắn gọn"
              labelCol={{ span: 24 }}
              className="formItem"
            >
              <Input
                prefix={
                  <EnvironmentOutlined className="site-form-item-icon mr-1" />
                }
                className="p-2"
                defaultValue={ProductDetail?.["short-description"]}
                readOnly
              />
            </Form.Item>
            <Form.Item
              name="full-description"
              rules={[
                {
                  required: true,
                },
              ]}
              colon={true}
              label="Mô tả chi tiết"
              labelCol={{ span: 24 }}
              className="formItem"
            >
              <TextArea
                showCount
                placeholder="Mô tả chi tiết"
                defaultValue={ProductDetail?.["full-description"]}
              />
            </Form.Item>

            <Image
              src={ProductDetail["img-url"]}
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "100%",
                objectFit: "cover",
              }}
            />
          </Form>
        ) : (
          <>
            <Skeleton count={1} width={100} className="mb-2" />
            <Skeleton count={10} className="mb-2" />
            <Skeleton count={1} width={100} className="mb-2" />
            <Skeleton count={10} className="mb-2" />
          </>
        )}
      </Modal> */}
    </>
  );
};

export default ProductList;
