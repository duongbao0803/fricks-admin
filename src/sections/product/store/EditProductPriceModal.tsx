import { editProductPrice } from "@/apis/productApi";
import { notify } from "@/components/Notification";
import { unitsByCategory } from "@/constants";
import { PriceInfo, ProductInfo, Unit } from "@/types/product.types";
import { Col, Form, Input, InputNumber, Modal, Row, Select } from "antd";
import React, { useEffect, useState } from "react";

export interface EditModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  productDetail?: ProductInfo;
  priceInfo?: PriceInfo;
  handleRefetch: () => void;
}

const EditProductPriceModal: React.FC<EditModalProps> = React.memo((props) => {
  // const { addNewUserItem } = useUserService();
  const { setIsOpen, isOpen, productDetail } = props;
  const { Option } = Select;
  const [isConfirmLoading, setIsConfirmLoading] = useState<boolean>(false);
  const [fileChange] = useState<string>("");
  const [selectedUnit, setSelectedUnit] = useState<Unit[]>();
  const [form] = Form.useForm();
  const categoryCode =
    (productDetail?.category?.code as keyof typeof unitsByCategory) ?? "";

  useEffect(() => {
    if (categoryCode) {
      setSelectedUnit(unitsByCategory[categoryCode]);
      form.setFieldsValue({
        ...productDetail,
        unitId: productDetail?.price && productDetail?.price[0]?.unit?.id,
        price: productDetail?.price && productDetail?.price[0]?.price,
      });
    }
  }, [categoryCode]);

  useEffect(() => {
    form.setFieldsValue({ avatar: fileChange });
  }, [fileChange, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const updateValues = {
        ...values,
        id: productDetail?.price && productDetail?.price[0]?.id,
      };
      setIsConfirmLoading(true);
      setTimeout(async () => {
        try {
          await editProductPrice(updateValues);
          notify("success", "Cập nhật giá sản phẩm thành công", 2);
          setIsConfirmLoading(false);
          setIsOpen(false);
        } catch (error) {
          console.error(error);
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
  };

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
          initialValue={productDetail?.name}
        >
          <Input placeholder="Tên sản phẩm" autoFocus readOnly />
        </Form.Item>
        <Row gutter={16} className="relative mt-1">
          <Col span={12}>
            <Form.Item
              name="unitId"
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
              <Select placeholder="Chọn đơn vị tính">
                {selectedUnit?.map((unit: any, index: number) => (
                  <Option key={index} value={unit?.id} label={unit?.name}>
                    {unit?.name}
                  </Option>
                ))}
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
              <InputNumber
                type="numberd"
                placeholder="Giá"
                className="w-full"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
});

export default EditProductPriceModal;
