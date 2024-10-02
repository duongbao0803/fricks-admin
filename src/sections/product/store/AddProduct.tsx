import { PlusCircleOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Input,
  Popconfirm,
  Row,
  Select,
  Space,
  Table,
} from "antd";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import AddProductPriceModal from "./AddProductPriceModal";
import EditProductPriceModal from "./EditProductPriceModal";
import { BrandInfo, CategoryInfo, PriceInfo } from "@/types/product.types";
import { notify } from "@/components/Notification";
import { useNavigate } from "react-router-dom";
import { useFetchBrands } from "@/hooks/useFetchBrands";
import { useFetchCategories } from "@/hooks/useFetchCategories";
import { UploadImage } from "@/components";

const AddProduct: React.FC = () => {
  const [form] = Form.useForm();
  const { Option } = Select;
  const { TextArea } = Input;
  const [isOpenAdd, setIsOpenAdd] = useState<boolean>(false);
  const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false);
  const [currentRecord, setCurrentRecord] = useState<PriceInfo>();
  const [currentCate, setCurrentCate] = useState<string>("");
  const navigate = useNavigate();
  const { data: brandsData } = useFetchBrands(1, 50);
  const { data: categoriesData } = useFetchCategories(1, 50);

  const [fileChange, setFileChange] = useState<string>("");

  useEffect(() => {
    form.setFieldsValue({ image: fileChange });
  }, [fileChange, form]);

  console.log("check fileChange", fileChange);

  const brands = useMemo(() => brandsData?.data || [], [brandsData]);
  const categories = useMemo(
    () => categoriesData?.data || [],
    [categoriesData],
  );

  const handleRefetch = useCallback(() => {
    // refetch();
  }, []);

  const showEditModal = (record: any) => {
    if (currentCate && currentCate !== "") {
      setCurrentRecord(record);
      setIsOpenEdit(true);
    } else {
      notify(
        "warning",
        "Vui lòng chọn danh mục trước khi chỉnh sửa giá sản phẩm",
        3,
      );
    }
  };

  const handleCategoryChange = (value: any) => {
    console.log("check cate", value);
    setCurrentCate(value);
  };

  const openAddProductPriceModal = () => {
    if (currentCate && currentCate !== "") {
      setIsOpenAdd(true);
    } else {
      notify(
        "warning",
        "Vui lòng chọn danh mục trước khi thêm giá sản phẩm",
        3,
      );
    }
  };

  const handleCancel = () => {
    navigate("/store/product");
  };

  // const categories = [
  //   {
  //     id: 1,
  //     name: "Cát, đá",
  //     code: "CT001",
  //   },
  //   {
  //     id: 2,
  //     name: "Xi măng, bột trét",
  //     code: "CT002",
  //   },
  //   {
  //     id: 3,
  //     name: "Gạch",
  //     code: "CT003",
  //   },
  //   {
  //     id: 4,
  //     name: "Sắt, thép",
  //     code: "CT004",
  //   },
  //   {
  //     id: 5,
  //     name: "Gỗ, ván ép",
  //     code: "CT005",
  //   },
  //   {
  //     id: 6,
  //     name: "Sơn",
  //     code: "CT006",
  //   },
  //   {
  //     id: 7,
  //     name: "Vật liệu cách nhiệt",
  //     code: "CT007",
  //   },
  //   {
  //     id: 8,
  //     name: "Dụng cụ xây dựng",
  //     code: "CT008",
  //   },
  //   {
  //     id: 9,
  //     name: "Ống nước, phụ kiện",
  //     code: "CT009",
  //   },
  //   {
  //     id: 10,
  //     name: "Thiết bị điện",
  //     code: "CT010",
  //   },
  //   {
  //     id: 11,
  //     name: "Thiết bị vệ sinh",
  //     code: "CT011",
  //   },
  //   {
  //     id: 12,
  //     name: "Phụ kiện khác",
  //     code: "CT012",
  //   },
  // ];

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
  ];

  const transformedData = dataSource.flatMap((product) =>
    product.price.map((priceDetail) => ({
      id: priceDetail.id,
      name: product.name,
      unit: priceDetail.unit.name,
      price: priceDetail.price,
    })),
  );

  const columns = useMemo(
    () => [
      {
        title: "Tên sản phẩm",
        dataIndex: "name",
        key: "name",
        with: "30%",
      },
      {
        title: "Đơn vị tính",
        dataIndex: "unit",
        key: "unit",
        with: "20%",
      },
      {
        title: "Giá",
        dataIndex: "price",
        key: "price",
        with: "30%",
        render: (text: any) => `${text.toLocaleString()} VND`,
      },
      {
        title: "Thao tác",
        dataIndex: "",
        render: (record: any) => (
          <>
            <Button
              size="small"
              className="border-none"
              onClick={() => showEditModal(record)}
            >
              <FaEdit />
            </Button>
            <Popconfirm
              title="Bạn có muốn xóa giá sản phẩm này không?"
              // onConfirm={() => handleDeleteUser(record.id)}
              okText="Có"
              cancelText="Không"
            >
              <Button
                size="small"
                className="border-none"
                style={{ marginLeft: 8 }}
              >
                <FaTrash />
              </Button>
            </Popconfirm>
          </>
        ),
      },
    ],
    [],
  );

  const onFinish = (values: any) => {
    console.log("check value", values);
  };

  const handleFileChange = useCallback((newFileChange: string) => {
    setFileChange(newFileChange);
  }, []);

  return (
    <>
      <Form
        form={form}
        onFinish={onFinish}
        name="product"
        layout="vertical"
        autoComplete="off"
      >
        <Row gutter={16}>
          <Col span={8} className="flex items-center justify-center">
            <Form.Item
              id="formItem"
              name="image"
              colon={true}
              labelCol={{ span: 24 }}
              className="formItem"
              rules={[{ required: true, message: "Vui lòng chọn ảnh" }]}
            >
              <UploadImage
                onFileChange={handleFileChange}
                initialImage={""}
                titleButton={"Thêm ảnh"}
              />
            </Form.Item>
          </Col>
          <Col span={16}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  id="formItem"
                  name="sku"
                  colon={true}
                  label="SKU"
                  labelCol={{ span: 24 }}
                  className="formItem"
                  rules={[{ required: true, message: "Vui lòng nhập sku" }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="name"
                  label="Tên sản phẩm"
                  rules={[
                    { required: true, message: "Vui lòng nhập tên sản phẩm" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16} className="relative mt-1">
              <Col span={12}>
                <Form.Item
                  id="formItem"
                  name="brand"
                  colon={true}
                  label="Thương hiệu"
                  labelCol={{ span: 24 }}
                  className="formItem"
                  rules={[
                    { required: true, message: "Vui lòng nhập thương hiệu" },
                  ]}
                >
                  <Select
                    placeholder="Chọn thương hiệu"
                    // onChange={handleCategoryChange}
                  >
                    {brands?.map((brand: BrandInfo) => (
                      <Option key={brand.id}>{brand.name}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="category"
                  id="formItem"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn danh mục",
                    },
                  ]}
                  label="Danh mục"
                  labelCol={{ span: 24 }}
                  className="formItem"
                >
                  <Select
                    placeholder="Chọn loại sản phẩm"
                    onChange={handleCategoryChange}
                  >
                    {categories?.map((category: CategoryInfo) => (
                      <Option key={category?.id} value={category?.code}>
                        {category?.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16} className="relative mt-1">
              <Col span={12}>
                <Form.Item
                  id="formItem"
                  name="quantity"
                  colon={true}
                  label="Số lượng"
                  labelCol={{ span: 24 }}
                  className="formItem"
                  rules={[
                    { required: true, message: "Vui lòng nhập số lượng" },
                  ]}
                >
                  <Input type="number" />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              name="description"
              colon={true}
              label="Mô tả sản phẩm"
              labelCol={{ span: 24 }}
              className="formItem"
              rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
            >
              <TextArea showCount placeholder="Mô tả sản phẩm" />
            </Form.Item>
            <div className="mb-4 flex justify-between">
              <div className="flex gap-x-2">
                <p className="text-[1.1rem] font-bold">Bảng giá</p>
              </div>
              <div className="flex gap-x-2">
                <div></div>
                <div>
                  <Button type="primary" onClick={openAddProductPriceModal}>
                    <div className="flex justify-center">
                      <PlusCircleOutlined className="mr-1 text-lg" /> Thêm giá
                    </div>
                  </Button>
                </div>
              </div>
            </div>
            <Table
              dataSource={transformedData}
              columns={columns}
              rowKey="id"
              pagination={false}
            />
            <Form.Item>
              <Space className="mt-5 flex justify-end">
                <Button htmlType="button" onClick={handleCancel}>
                  Hủy bỏ
                </Button>
                <Button type="primary" htmlType="submit">
                  Thêm sản phẩm
                </Button>
              </Space>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <AddProductPriceModal
        setIsOpen={setIsOpenAdd}
        isOpen={isOpenAdd}
        handleRefetch={handleRefetch}
        productName={dataSource[0]?.name}
        cateCode={currentCate}
      />
      <EditProductPriceModal
        setIsOpen={setIsOpenEdit}
        isOpen={isOpenEdit}
        handleRefetch={handleRefetch}
        priceInfo={currentRecord}
        productName={dataSource[0]?.name}
      />
    </>
  );
};

export default AddProduct;
