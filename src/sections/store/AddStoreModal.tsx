import { useCallback, useEffect, useState } from "react";
import { Modal, Form, Input, Row, Col } from "antd";
import {
  ContainerOutlined,
  MailOutlined,
  CarOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { UploadImage } from "@/components";

export interface AddStoreProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
}

const AddStoreModal: React.FC<AddStoreProps> = (props) => {
  const { setIsOpen, isOpen } = props;
  const [isConfirmLoading, setIsConfirmLoading] = useState<boolean>(false);
  const [fileChange, setFileChange] = useState<string>("");
  // const { addNewStoreItem } = useStoreService();
  const [form] = Form.useForm();
  const { TextArea } = Input;

  useEffect(() => {
    form.setFieldsValue({ "img-url": fileChange });
  }, [fileChange, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      setIsConfirmLoading(true);
      setTimeout(async () => {
        try {
          // await addNewStoreItem(values);
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
      title={<p className="text-lg font-bold text-[red]">Thêm cửa hàng mới</p>}
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
              name="name"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên cửa hàng",
                },
              ]}
              colon={true}
              label="Tên cửa hàng"
              labelCol={{ span: 24 }}
              className="formItem"
            >
              <Input
                prefix={<CarOutlined className="site-form-item-icon mr-1"/>}
                placeholder="Tên cửa hàng"
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
                  message: "Vui lòng nhập tài khoản quản lý",
                },
              ]}
              colon={true}
              label="Tài khoản quản lý"
              labelCol={{ span: 24 }}
              className="formItem"
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon mr-1" />}
                placeholder="Tài khoản quản lý"
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="short-description"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập địa chỉ",
            },
          ]}
          colon={true}
          label="Địa chỉ"
          labelCol={{ span: 24 }}
          className="formItem"
        >
          <Input
            prefix={<ContainerOutlined className="site-form-item-icon mr-1" />}
            placeholder="Địa chỉ"
          />
        </Form.Item>

        <Row gutter={16} className="relative mt-1">
          <Col span={12}>
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập số điện thoại",
                },
              ]}
              colon={true}
              label="Số điện thoại"
              labelCol={{ span: 24 }}
              className="formItem"
            >
              <Input
                prefix={<PhoneOutlined className="site-form-item-icon mr-1 rotate-90"/>}
                placeholder="Điện thoại"
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
                  message: "Vui lòng nhập mã số thuế",
                },
              ]}
              colon={true}
              label="Mã số thuế"
              labelCol={{ span: 24 }}
              className="formItem"
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon mr-1" />}
                placeholder="Mã số thuế"
              />
            </Form.Item>
          </Col>
        </Row>
        
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

export default AddStoreModal;
