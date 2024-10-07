import { useEffect, useState } from "react";
import { Modal, Form, Input, Row, Col } from "antd";
import {
  CarOutlined,
  MailOutlined,
  TransactionOutlined,
  SwitcherOutlined,
  DotChartOutlined,
} from "@ant-design/icons";
import { UploadImage } from "@/components";

export interface EditProductModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
}

const EditProductModal: React.FC<EditProductModalProps> = (props) => {
  const { setIsOpen, isOpen } = props;
  const [fileChange, setFileChange] = useState<string>("");
  const [isConfirmLoading, setIsConfirmLoading] = useState<boolean>(false);
  const [form] = Form.useForm();

  // useEffect(() => {
  //   if (isOpen) {
  //     form.setFieldsValue(productInfo);
  //   }
  // }, [isOpen]);

  useEffect(() => {
    form.setFieldsValue({ image: fileChange });
  }, [fileChange, form]);

  const handleOk = async () => {
    try {
      // const values = await form.validateFields();

      setIsConfirmLoading(true);
      setTimeout(async () => {
        try {
          // if (productInfo && productInfo._id) {
          //   await updateProductItem(productInfo._id, values);
          //   setIsConfirmLoading(false);
          //   setIsOpen(false);
          // } else {
          //   console.error("User is undefined");
          // }
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

  const handleFileChange = (newFileChange: string) => {
    setFileChange(newFileChange);
  };

  return (
    <Modal
      title={<p className="text-lg text-[red]">Chỉnh sửa cửa hàng</p>}
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
                prefix={<CarOutlined className="site-form-item-icon mr-1"/>}
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
                prefix={<DotChartOutlined className="site-form-item-icon mr-1"/>}
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
                prefix={<TransactionOutlined className="site-form-item-icon mr-1" />}
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
          <UploadImage onFileChange={handleFileChange} initialImage={""} titleButton={"Thêm ảnh"} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditProductModal;
