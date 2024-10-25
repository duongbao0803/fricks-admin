import { OrderStatus, UpdateOrderStatus } from "@/enums";
import { PhoneOutlined } from "@ant-design/icons";
import { Col, Form, Input, Modal, Row, Select } from "antd";
import { useState } from "react";
import { CiDollar } from "react-icons/ci";
import { FaBarcode, FaRegUser } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";

export interface EditOrderModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
}

const EditOrderModal: React.FC<EditOrderModalProps> = (props) => {
  const { setIsOpen, isOpen } = props;
  const [isConfirmLoading, setIsConfirmLoading] = useState<boolean>(false);
  const [form] = Form.useForm();
  // const { Option } = Select;

  // useEffect(() => {
  //   if (isOpen) {
  //     form.setFieldsValue(orderDetail);
  //   }
  // }, [isOpen]);

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

  const orderLables = {
    [UpdateOrderStatus.PENDING]: "Đang chờ",
    [UpdateOrderStatus.DELIVERY]: "Đang giao hàng",
    [UpdateOrderStatus.DONE]: "Đã giao hàng",
    [UpdateOrderStatus.CANCELED]: "Đã hủy",
  };

  return (
    <Modal
      title={<p className="text-lg text-[red]">Trạng thái đơn hàng</p>}
      open={isOpen}
      onOk={handleOk}
      confirmLoading={isConfirmLoading}
      onCancel={handleCancel}
      okText={"Xác nhận"}
      cancelText={"Hủy bỏ"}
    >
      <Form name="normal_login" className="login-form" form={form}>
        <Form.Item
          name="code"
          rules={[
            {
              required: true,
            },
          ]}
          colon={true}
          label="Mã đơn hàng"
          labelCol={{ span: 24 }}
          className="formItem"
        >
          <Input
            prefix={<FaBarcode className="site-form-item-icon mr-1" />}
            readOnly
          />
        </Form.Item>
        <Row gutter={16} className="relative mt-1">
          <Col span={12}>
            <Form.Item
              name="customerName"
              colon={true}
              label="Khách hàng"
              labelCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                },
              ]}
              className="formItem"
            >
              <Input
                readOnly
                prefix={<FaRegUser className="site-form-item-icon mr-1" />}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="customerPhone"
              rules={[
                {
                  required: true,
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
                readOnly
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16} className="relative mt-1">
          <Col span={12}>
            <Form.Item
              name="paymentMethod"
              colon={true}
              label="Phương thức thanh toán"
              labelCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                },
              ]}
              className="formItem"
            >
              <Input
                prefix={
                  <MdOutlinePayment className="site-form-item-icon mr-1" />
                }
                readOnly
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="total"
              rules={[
                {
                  required: true,
                },
              ]}
              colon={true}
              label="Đơn giá"
              labelCol={{ span: 24 }}
              className="formItem"
            >
              <Input
                prefix={<CiDollar className="site-form-item-icon mr-1" />}
                readOnly
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="paymentStatus"
          rules={[
            {
              required: true,
            },
          ]}
          colon={true}
          label="Trạng thái"
          labelCol={{ span: 24 }}
          className="formItem"
        >
          <Select placeholder="Chọn trạng thái" className="h-10">
                {Object.values(UpdateOrderStatus)
                  .filter((value) => typeof value === "number")
                  .map((value) => (
                    <Select.Option key={value} value={value}>
                      {orderLables[value as UpdateOrderStatus]}
                    </Select.Option>
                  ))}
              </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditOrderModal;
