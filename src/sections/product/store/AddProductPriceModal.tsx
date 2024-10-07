import React from "react";
import { Modal, Form, Input, Select, Col, Row, InputNumber } from "antd";
import useStore from "@/hooks/useStore";
import { Unit } from "@/types/product.types";

export interface AddModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedUnit?: Unit[];
  isOpen: boolean;
  productName?: string;
  cateCode: string;
  handleRefetch: () => void;
}

const AddProductPriceModal: React.FC<AddModalProps> = React.memo((props) => {
  const { setIsOpen, isOpen, productName, selectedUnit } = props;
  const setData = useStore((s) => s.setData);
  const [form] = Form.useForm();

  const { Option } = Select;

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const [code, name] = values.unit.split("-");
      const updateValues = [{ ...values, unitCode: code, unit: name }];
      setData(updateValues);
      setIsOpen(false);
    } catch (err) {
      console.error("Validation failed:", err);
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
    form.resetFields();
  };

  return (
    <Modal
      title={<p className="text-lg font-bold text-[red] ">Thêm giá sản phẩm</p>}
      open={isOpen}
      onOk={handleOk}
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
          <Col span={14}>
            <Form.Item
              name="unit"
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
                  <Option key={index} value={`${unit?.code}-${unit?.name}`}>
                    {unit?.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={10}>
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
              <InputNumber placeholder="Giá" className="w-full" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
});

export default AddProductPriceModal;
