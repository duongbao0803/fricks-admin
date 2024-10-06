import { FilterOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button, Image, Input, Table, TableProps } from "antd";
import React, { useMemo } from "react";

export interface StoreProductListProps {
  storeId: number;
}

export interface DataType {
  key: string;
  sku: string;
  image: string;
  name: string;
  unit: string;
  price: string;
  store: string;
}

const StoreProductList: React.FC<StoreProductListProps> = React.memo(() => {
  const dataSource = [
    {
      key: "1",
      sku: "SP001",
      image: "https://via.placeholder.com/100", // Link ảnh mẫu
      name: "Sản phẩm A",
      unit: "Chiếc",
      price: "200,000 VND",
      store: "Cửa hàng 1",
    },
    {
      key: "2",
      sku: "SP002",
      image: "https://via.placeholder.com/100",
      name: "Sản phẩm B",
      unit: "Hộp",
      price: "150,000 VND",
      store: "Cửa hàng 2",
    },
    {
      key: "3",
      sku: "SP003",
      image: "https://via.placeholder.com/100",
      name: "Sản phẩm C",
      unit: "Chai",
      price: "300,000 VND",
      store: "Cửa hàng 3",
    },
  ];

  const columns: TableProps<DataType>["columns"] = useMemo(
    () => [
      {
        title: "SKU",
        dataIndex: "sku",
        width: "5%",
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
        width: "15%",
        className: "first-column",
        onCell: () => {
          return {
            onClick: () => {
              //   setIsModalOpen(true);
            },
          };
        },
      },
      {
        title: "Đơn vị tính",
        dataIndex: "unit",
        width: "10%",
      },
      {
        title: "Giá (VNĐ)",
        dataIndex: "price",
        width: "15%",
      },
    ],
    [],
  );

  return (
    <>
      <p className="mb-3 text-[1.2rem] font-bold text-[#000000]">
        Danh sách sản phẩm
      </p>
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
            <Button type="primary">
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
        dataSource={dataSource}
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
});

export default StoreProductList;
