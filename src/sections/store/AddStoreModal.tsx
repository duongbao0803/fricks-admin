import { useCallback, useEffect, useState } from "react";
import { Modal, Form, Input, Row, Col, Select } from "antd";
import {
  ContainerOutlined,
  MailOutlined,
  CarOutlined,
  PhoneOutlined,
  UserOutlined,
  BankOutlined,
} from "@ant-design/icons";
import { UploadImage } from "@/components";
import { banks } from "@/constants/bank";
import { addStore } from "@/apis/storeApi";
import { notify } from "@/components/Notification";

export interface AddStoreProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  handleRefetch: () => void;
}

const AddStoreModal: React.FC<AddStoreProps> = (props) => {
  const { setIsOpen, isOpen, handleRefetch } = props;
  const [isConfirmLoading, setIsConfirmLoading] = useState<boolean>(false);
  const [fileChange, setFileChange] = useState<string>("");
  const [form] = Form.useForm();
  // const { TextArea } = Input;
  const { Option } = Select;

  useEffect(() => {
    form.setFieldsValue({ "image": fileChange });
  }, [fileChange, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      setIsConfirmLoading(true);
      setTimeout(async () => {
        try {
          await handleAddStore(values);
          setIsConfirmLoading(false);
        } catch (error) {
          setIsConfirmLoading(false);
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

  const handleAddStore = useCallback(async (storeData: any) => {
    try {
      const res = await addStore(storeData);
      if (res && res.status === 200) {
        console.log("check res", res);
        notify("success", "Thêm cửa hàng mới thành công", 3);
        handleRefetch();
        form.resetFields();
        setIsOpen(false);
      }
    } catch (err: any) {
      notify("error", `${err.response.data.message}`, 3);
      setIsOpen(true);
    }
  }, []);

  const filterOption = (
    input: string,
    option?: { label: string; value: string },
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

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
                prefix={<CarOutlined className="site-form-item-icon mr-1" />}
                placeholder="Tên cửa hàng"
                autoFocus
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="managerEmail"
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
          name="address"
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
              name="phoneNumber"
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
                prefix={
                  <PhoneOutlined className="site-form-item-icon mr-1 rotate-90" />
                }
                placeholder="Điện thoại"
                autoFocus
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="taxCode"
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
          name="bankCode"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn ngân hàng",
            },
          ]}
          colon={true}
          label="Ngân hàng"
          labelCol={{ span: 24 }}
          className="formItem"
        >
          <Select
            placeholder="Chọn ngân hàng"
            showSearch
            filterOption={filterOption}
            // onChange={handleCategoryChange}
          >
            {banks?.map((bank: any) => (
              <Option
                key={bank.id}
                value={bank.code}
                label={bank.name}
              >
                {bank.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Row gutter={16} className="relative mt-1">
          <Col span={12}>
            <Form.Item
              name="accountNumber"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập số tài khoản",
                },
                {
                  max: 20,
                  message: "Tài khoản chứa tối đa 20 chữ số"
                }
              ]}
              colon={true}
              label="Số tài khoản"
              labelCol={{ span: 24 }}
              className="formItem"
            >
              <Input
                prefix={
                  <BankOutlined className="site-form-item-icon mr-1" />
                }
                placeholder="Số tài khoản"
                autoFocus
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="accountName"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên chủ tài khoản",
                },
              ]}
              colon={true}
              label="Chủ tài khoản"
              labelCol={{ span: 24 }}
              className="formItem"
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon mr-1" />}
                placeholder="Chủ tài khoản"
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="image"
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

export default AddStoreModal;
