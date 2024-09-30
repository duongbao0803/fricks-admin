import { PlusCircleOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Image,
  Input,
  Popconfirm,
  Row,
  Select,
  Space,
  Table,
} from "antd";
import React, { useCallback, useMemo, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import AddProductPriceModal from "./AddProductPriceModal";
import EditProductPriceModal from "./EditProductPriceModal";
import { PriceInfo } from "@/types/product.types";

const ProductDetail: React.FC = () => {
  const [form] = Form.useForm();
  const { Option } = Select;
  const { TextArea } = Input;
  const [isOpenAdd, setIsOpenAdd] = useState<boolean>(false);
  const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false);
  const [currentRecord, setCurrentRecord] = useState<PriceInfo>();

  const handleRefetch = useCallback(() => {
    // refetch();
  }, []);

  const showEditModal = (record: any) => {
    setCurrentRecord(record);
    setIsOpenEdit(true);
    
  };

  const categories = [
    {
      id: 1,
      name: "Xi măng, bộ trét",
    },
    {
      id: 2,
      name: "Gạch",
    },
    {
      id: 3,
      name: "Thép & Sắt",
    },
    {
      id: 4,
      name: "Gỗ & Ván ép",
    },
    {
      id: 5,
      name: "Ống nước & Phụ kiện",
    },
    {
      id: 6,
      name: "Thiết bị điện",
    },
    {
      id: 7,
      name: "Sơn",
    },
    {
      id: 8,
      name: "Thiết bị vệ sinh",
    },
    {
      id: 9,
      name: "Vật liệu cách nhiệt",
    },
    {
      id: 10,
      name: "Dụng cụ xây dựng",
    },
    {
      id: 11,
      name: "Phụ kiện khác",
    },
  ];

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
            <Button size="small" className="border-none" onClick={() => showEditModal(record)}>
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

  return (
    <>
      <Form form={form} name="product" layout="vertical" autoComplete="off">
        <Row gutter={16}>
          <Col span={8}>
            <Image
              width={300}
              height={300}
              src="error"
              fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg=="
            />
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
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="name"
                  label="Tên sản phẩm"
                  rules={[{ required: true }]}
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
                  rules={[{ required: true }]}
                >
                  <Input />
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
                  <Select placeholder="Chọn loại sản phẩm">
                    {categories.map((category) => (
                      <Option key={category.id} value={category.id}>
                        {category.name}
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
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              name="description"
              colon={true}
              label="Mô tả sản phẩm"
              labelCol={{ span: 24 }}
              className="formItem"
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
                  <Button type="primary" onClick={() => setIsOpenAdd(true)}>
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
              <Space>
                <Button htmlType="reset">Reset</Button>
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

export default ProductDetail;
