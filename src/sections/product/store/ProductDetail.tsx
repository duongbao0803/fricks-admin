import { editProduct, getDetailProduct } from "@/apis/productApi";
import { UploadImage } from "@/components";
import { notify } from "@/components/Notification";
import { useFetchBrands } from "@/hooks/useFetchBrands";
import { useFetchCategories } from "@/hooks/useFetchCategories";
import AddBrandModal from "@/sections/brand/AddBrandModal";
import { BrandInfo } from "@/types/brand.types";
import { CategoryInfo } from "@/types/category.types";
import { PriceInfo, ProductInfo, Unit } from "@/types/product.types";
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
  Table,
} from "antd";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import AddProductPriceModal from "./AddProductPriceModal";
import EditProductPriceModal from "./EditProductPriceModal";

const ProductDetail: React.FC = () => {
  const [form] = Form.useForm();
  const { Option } = Select;
  const { TextArea } = Input;
  const { id } = useParams();
  const navigate = useNavigate();
  const [isOpenAdd, setIsOpenAdd] = useState<boolean>(false);
  const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false);
  const [currentRecord, setCurrentRecord] = useState<PriceInfo>();
  const [currentCate] = useState<string>("");
  const { data: categoriesData } = useFetchCategories(1, 50);
  const [selectedUnit] = useState<Unit[]>([]);
  const [fileChange, setFileChange] = useState<string>("");
  const [productDetail, setProductDetail] = useState<ProductInfo>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { data: brandsData, refetch: refetchBrand } = useFetchBrands(1, 50);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const res = await getDetailProduct(Number(id));
          if (res && res.status === 200) {
            setProductDetail(res.data);
            form.setFieldsValue({
              ...res.data,
              brand: res?.data?.brand?.id,
              category: res?.data?.category?.id,
            });
          }
        } catch (err) {
          console.error("Error get detail product", err);
        }
      };
      fetchData();
    }
  }, [id]);

  useEffect(() => {
    form.setFieldsValue({ image: fileChange });
  }, [fileChange, form]);

  const handleFileChange = useCallback((newFileChange: string) => {
    setFileChange(newFileChange);
  }, []);

  const brands = useMemo(() => brandsData?.data || [], [brandsData]);
  const updateBrand = [...brands, { id: 0, name: "Khác" }];

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
    setCurrentRecord(record);
    setIsOpenEdit(true);
  };

  const handleCancel = () => {
    navigate("/store/product");
  };

  const columns = useMemo(
    () => [
      {
        title: "Tên sản phẩm",
        key: "name",
        width: "30%",
        render: () => `${productDetail?.name || "N/A"}`,
      },
      {
        title: "Đơn vị tính",
        key: "unitPrice",
        width: "30%",
        render: (_: any, record: { unit: { name: string } }) =>
          record.unit?.name || "N/A",
      },
      {
        title: "Giá",
        dataIndex: "price",
        width: "25%",
      },
      {
        title: "Thao tác",
        dataIndex: "",
        key: "actions",
        width: "30%",
        render: (record: any) => (
          <>
            <Button
              size="small"
              className="border-none"
              onClick={() => showEditModal(record)}
            >
              <FaEdit />
            </Button>
            {/* <Popconfirm
              title="Bạn có muốn xóa giá sản phẩm này không?"
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
            </Popconfirm> */}
          </>
        ),
      },
    ],
    [productDetail],
  );

  const onFinish = async (values: any) => {
    const updateData = {
      id: Number(id),
      name: values?.name,
      image: values?.image,
      categoryId: values?.category,
      brandId: values?.brand,
      description: values?.description,
      quantity: values?.quantity,
      storeId: productDetail?.storeId,
    };
    try {
      const res = await editProduct(updateData);
      if (res && res.status === 200) {
        notify("success", "Cập nhật sản phẩm thành công", 3);
        handleRefetch();
        form.resetFields();
        navigate("/store/product");
      }
    } catch (err: any) {
      console.error(err);
      notify("error", `${err.response.data.message}`, 3);
    }
  };

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
                initialImage={productDetail?.image}
                titleButton={"Thêm ảnh"}
              />
            </Form.Item>
          </Col>
          <Col span={16}>
            <Row gutter={16} className="relative mt-1">
              <Col span={12}>
                <Form.Item
                  name="sku"
                  label="Mã sản phẩm"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input readOnly />
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
                    // onChange={handleCategoryChange}
                  >
                    {categories?.map((category: CategoryInfo) => (
                      <Option
                        key={category?.id}
                        value={category?.id}
                        label={category?.name}
                      >
                        {category?.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={8} className="relative mt-1">
              <Col span={4}>
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
              <Col span={4}>
                <Form.Item
                  id="formItem"
                  name="soldQuantity"
                  colon={true}
                  label="Số lượng đã bán"
                  labelCol={{ span: 24 }}
                  className="formItem"
                  // rules={[
                  //   { required: true, message: "Vui lòng nhập số lượng" },
                  // ]}
                >
                  <InputNumber type="number" readOnly />
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
              {/* <div className="flex gap-x-2">
                <div></div>
                <div>
                  <Button type="primary" onClick={openAddProductPriceModal}>
                    <div className="flex justify-center">
                      <PlusCircleOutlined className="mr-1 text-lg" /> Thêm giá
                    </div>
                  </Button>
                </div>
              </div> */}
            </div>
            <Table
              dataSource={productDetail?.price}
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
                  Chỉnh sửa
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
        productName={productDetail?.name}
        cateCode={currentCate}
        selectedUnit={selectedUnit}
      />
      <EditProductPriceModal
        setIsOpen={setIsOpenEdit}
        isOpen={isOpenEdit}
        handleRefetch={handleRefetch}
        priceInfo={currentRecord}
        productDetail={productDetail}
      />
      <AddBrandModal
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        handleRefetch={handleRefetch}
      />
    </>
  );
};

export default React.memo(ProductDetail);
