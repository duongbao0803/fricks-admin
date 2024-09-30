import { useCallback, useEffect, useState } from "react";
import { Modal, Form, Input, Row, Col } from "antd";
import {
  MailOutlined,
  CarOutlined,
  DotChartOutlined,
  TransactionOutlined,
  SwitcherOutlined,
} from "@ant-design/icons";
import { UploadImage } from "@/components";

export interface AddProductProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
}

const AddProductModal: React.FC<AddProductProps> = (props) => {
  const { setIsOpen, isOpen } = props;
  const [isConfirmLoading, setIsConfirmLoading] = useState<boolean>(false);
  const [fileChange, setFileChange] = useState<string>("");
  // const { addNewProductItem } = useProductService();
  const [form] = Form.useForm();
  // const { TextArea } = Input;

  useEffect(() => {
    form.setFieldsValue({ "img-url": fileChange });
  }, [fileChange, form]);

  const handleOk = async () => {
    try {
      // const values = await form.validateFields();
      setIsConfirmLoading(true);
      setTimeout(async () => {
        try {
          // await addNewProductItem(values);
          form.resetFields();
          setIsConfirmLoading(false);
          setIsOpen(false);
        } catch (error) {
          setIsConfirmLoading(false);
          setIsOpen(true);
        }
      }, 1500);
    } catch (errorInfo) {
      console.error("Validation failed:", errorInfo);
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const handleFileChange = useCallback((newFileChange: string) => {
    setFileChange(newFileChange);
  }, []);

  return (
    <Modal
      title={<p className="text-lg font-bold text-[red]">Thêm sản phẩm mới</p>}
      open={isOpen}
      onOk={handleOk}
      confirmLoading={isConfirmLoading}
      onCancel={handleCancel}
      okText={"Xác nhận"}
      cancelText={"Hủy bỏ"}
    >
      <Form name="normal_login" className="login-form" form={form}>
        <Row gutter={16} className="relative mt-1">
          <Col span={12}>
            <Form.Item
              name="sku"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập SKU",
                },
              ]}
              colon={true}
              label="SKU"
              labelCol={{ span: 24 }}
              className="formItem"
            >
              <Input
                prefix={<CarOutlined className="site-form-item-icon mr-1" />}
                placeholder="SKU"
                autoFocus
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên sản phẩm",
                },
              ]}
              colon={true}
              label="Tên sản phẩm"
              labelCol={{ span: 24 }}
              className="formItem"
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon mr-1" />}
                placeholder="Tên sản phẩm"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16} className="relative mt-1">
          <Col span={12}>
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập đơn vị tính",
                },
              ]}
              colon={true}
              label="Đơn vị tính"
              labelCol={{ span: 24 }}
              className="formItem"
            >
              <Input
                prefix={
                  <DotChartOutlined className="site-form-item-icon mr-1" />
                }
                placeholder="Đơn vị tính"
                autoFocus
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="manager-email"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập đơn giá sản phẩm",
                },
              ]}
              colon={true}
              label="Đơn giá"
              labelCol={{ span: 24 }}
              className="formItem"
            >
              <Input
                prefix={
                  <TransactionOutlined className="site-form-item-icon mr-1" />
                }
                placeholder="Đơn giá"
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="short-description"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mô tả",
            },
          ]}
          colon={true}
          label="Mô tả"
          labelCol={{ span: 24 }}
          className="formItem"
        >
          <Input
            prefix={<SwitcherOutlined className="site-form-item-icon mr-1" />}
            placeholder="Mô tả"
          />
        </Form.Item>

        <Form.Item
          name="img-url"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn hỉnh ảnh",
            },
          ]}
          colon={true}
          label="Hình ảnh"
          labelCol={{ span: 24 }}
          className="formItem"
        >
          <UploadImage
            onFileChange={handleFileChange}
            initialImage={""}
            titleButton={"Thêm ảnh"}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddProductModal;
