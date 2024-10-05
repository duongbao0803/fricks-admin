import { PlusCircleOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
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
import { PriceInfo } from "@/types/product.types";
import { notify } from "@/components/Notification";
import { useNavigate } from "react-router-dom";
import { useFetchBrands } from "@/hooks/useFetchBrands";
import { useFetchCategories } from "@/hooks/useFetchCategories";
import { UploadImage } from "@/components";
import useStore from "@/hooks/useStore";
import { unitsByCategory } from "@/constants";
import { useAuthStore } from "@/hooks/useAuthStore";
import { addProduct } from "@/apis/productApi";
import { CategoryInfo } from "@/types/category.types";
import { BrandInfo } from "@/types/brand.types";
import AddBrandModal from "@/sections/brand/AddBrandModal";

const AddProduct: React.FC = () => {
  const [form] = Form.useForm();
  const { Option } = Select;
  const { TextArea } = Input;
  const [isOpenAdd, setIsOpenAdd] = useState<boolean>(false);
  const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false);
  const [currentRecord, setCurrentRecord] = useState<PriceInfo>();
  const [currentCate, setCurrentCate] = useState<string>("");
  const navigate = useNavigate();
  const { data: brandsData, refetch: refetchBrand } = useFetchBrands(1, 50);
  const { data: categoriesData } = useFetchCategories(1, 50);
  const [selectedUnit, setSelectedUnit] = useState<[]>([]);
  const [fileChange, setFileChange] = useState<string>("");
  const [productName, setProductName] = useState<string>("");
  const { data, setData } = useStore();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    form.setFieldsValue({ image: fileChange });
  }, [fileChange, form]);

  const brands = useMemo(() => brandsData?.data || [], [brandsData]);

  const otherBrand = { id: 0, name: "Khác" };
  const updateBrand = [...brands, otherBrand];

  const handleAddBrand = (values: number) => {
    const otherBrand = values === 0 ? true : false;
    if (otherBrand) {
      setIsOpen(true);
    }
  };

  const categories = useMemo(
    () => categoriesData?.data || [],
    [categoriesData],
  );

  const handleRefetch = useCallback(() => {
    refetchBrand();
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
    const { code, id } = JSON.parse(value);
    setSelectedUnit(unitsByCategory[code]);
    setCurrentCate(id);
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
        render: (text: any) => `${text} VND`,
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

  const onFinish = async (values: any) => {
    const updateData = {
      sku: values?.sku,
      name: values?.name,
      image: values?.image,
      categoryId: JSON.parse(values?.category)?.id,
      brandId: values?.brand,
      description: values?.description,
      quantity: values?.quantity,
      storeId: 0,
      productPrices: [
        {
          unitCode: data[0].unit,
          price: data[0].price,
        },
      ],
    };
    console.log("check updateData", JSON.stringify(updateData));
    try {
      const res = await addProduct(updateData);
      console.log("check res", res);
      if (res && res.status === 200) {
        notify("success", "Thêm sản phẩm mới thành công", 3);
        handleRefetch();
        setData([]);
        form.resetFields();
        // navigate("/store/product");
      }
    } catch (err: any) {
      console.error(err);
      notify("error", `${err.response.data.message}`, 3);
    }
  };

  const handleFileChange = useCallback((newFileChange: string) => {
    setFileChange(newFileChange);
  }, []);

  const filterOption = (
    input: string,
    option?: { label: string; value: string },
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

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
                  rules={[
                    { required: true, message: "Vui lòng nhập sku" },
                    { min: 10, message: "SKU phải có ít nhất 10 ký tự" },
                    { max: 10, message: "SKU không được vượt quá 10 ký tự" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="name"
                  label="Tên sản phẩm"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập tên sản phẩm",
                    },
                    {
                      pattern: /^(?!^\d+$)[\p{L}\d\s]*$/u,
                      message:
                        "Tên sản phẩm không được chỉ chứa số hoặc ký tự đặc biệt",
                    },
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
                    showSearch
                    optionFilterProp="children"
                    filterOption={filterOption}
                    onChange={handleAddBrand}
                  >
                    {updateBrand?.map((brand: BrandInfo) => (
                      <Option
                        key={brand.id}
                        value={brand.id}
                        label={brand.name}
                      >
                        {brand.name}
                      </Option>
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
                      <Option
                        key={category?.id}
                        value={JSON.stringify({
                          code: category?.code,
                          id: category?.id,
                        })}
                      >
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
                  <InputNumber min={1} type="number" />
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
              dataSource={data}
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
        productName={productName}
        cateCode={currentCate}
        selectedUnit={selectedUnit}
      />
      <EditProductPriceModal
        setIsOpen={setIsOpenEdit}
        isOpen={isOpenEdit}
        handleRefetch={handleRefetch}
        priceInfo={currentRecord}
        productName={productName}
      />
      <AddBrandModal
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        handleRefetch={handleRefetch}
      />
    </>
  );
};

export default AddProduct;
