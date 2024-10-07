import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Select, Col, Row } from "antd";
import { formatDate } from "@/utils/validate";
import { PriceInfo } from "@/types/product.types";

export interface EditModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  productName?: string;
  priceInfo?: PriceInfo;
  handleRefetch: () => void;
}

const EditProductPriceModal: React.FC<EditModalProps> = React.memo((props) => {
  // const { addNewUserItem } = useUserService();
  const { setIsOpen, isOpen, productName } = props;
  const [isConfirmLoading, setIsConfirmLoading] = useState<boolean>(false);
  const [fileChange] = useState<string>("");
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ avatar: fileChange });
  }, [fileChange, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      console.log("check value", values);
      const formattedDate = formatDate(values.dob);
      const updatedValues: string = JSON.stringify({
        ...values,
        dob: formattedDate,
      });
      console.log("update value", updatedValues);
      setIsConfirmLoading(true);
      setTimeout(async () => {
        try {
          // await handleAddUser(updatedValues);
          form.resetFields();
          setIsConfirmLoading(false);
          setIsOpen(false);
        } catch (error) {
          setIsConfirmLoading(false);
          setIsOpen(true);
        }
      }, 1500);
    } catch (err) {
      console.error("Validation failed:", err);
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
    form.resetFields();
  };

  // const disabledDate = (current: object) => {
  //   return current && current > moment().startOf("day");
  // };

  // const handleFileChange = useCallback((newFileChange: string) => {
  //   setFileChange(newFileChange);
  // }, []);

  // const handleAddUser = useCallback(async (userData: any) => {
  //   try {
  //     const res = await addUser(userData);
  //     console.log("check res", res);
  //     if (res && res.status === 200) {
  //       notify("success", `${res.data.message}`, 3);
  //       handleRefetch();
  //     }
  //   } catch (err: any) {
  //     console.error("err", err);
  //     notify("error", `${err.response.data.message}`, 3);
  //   }
  // }, []);

  return (
    <Modal
      title={
        <p className="text-lg font-bold text-[red] ">Chỉnh sửa giá sản phẩm</p>
      }
      open={isOpen}
      onOk={handleOk}
      confirmLoading={isConfirmLoading}
      onCancel={handleCancel}
      okText={"Xác nhận"}
      cancelText={"Hủy bỏ"}
    >
      <Form name="normal_login" className="login-form" form={form}>
        <Form.Item
          name="name"
          colon={true}
          label="Tên sản phẩm"
          labelCol={{ span: 24 }}
          className="formItem"
          initialValue={productName}
        >
          <Input placeholder="Tên sản phẩm" autoFocus readOnly />
        </Form.Item>
        <Row gutter={16} className="relative mt-1">
          <Col span={12}>
            <Form.Item
              name="Đơn vị tính"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn đơn vị tính",
                },
              ]}
              colon={true}
              label="Đơn vị tính"
              labelCol={{ span: 24 }}
              className="formItem"
            >
              <Select placeholder="Chọn đơn vị tính" autoFocus>
                <Select.Option value="1">Mét</Select.Option>
                <Select.Option value="2">Cái</Select.Option>
                <Select.Option value="3">Bao</Select.Option>
                <Select.Option value="4">Cây</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="price"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập giá",
                },
              ]}
              colon={true}
              label="Giá sản phẩm (VNĐ)"
              labelCol={{ span: 24 }}
              className="formItem"
            >
              <Input placeholder="Giá" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
});

export default EditProductPriceModal;
