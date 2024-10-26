import React, { useCallback, useState } from "react";
import { Modal, Form, Input } from "antd";
import { notify } from "@/components/Notification";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { addBrand } from "@/apis/brandApi";

export interface AddModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  handleRefetch: () => void;
}

const AddBrandModal: React.FC<AddModalProps> = React.memo((props) => {
  const { setIsOpen, isOpen, handleRefetch } = props;
  const [isConfirmLoading, setIsConfirmLoading] = useState<boolean>(false);
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      setIsConfirmLoading(true);
      setTimeout(async () => {
        try {
          await handleAddBrand(values);
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

  const handleAddBrand = useCallback(async (name: string) => {
    try {
      const res = await addBrand(name);
      if (res && res.status === 200) {
        notify("success", "Thêm thương hiệu thành công", 3);
        handleRefetch();
        form.resetFields();
      }
    } catch (err: any) {
      notify("error", `${err.response.data.message}`, 3);
    }
  }, []);

  return (
    <Modal
      title={<p className="text-lg font-bold text-[red] ">Thêm thương hiệu</p>}
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
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên thương hiệu",
            },
          ]}
          colon={true}
          label="Thương hiệu"
          labelCol={{ span: 24 }}
          className="formItem"
        >
          <Input
            prefix={
              <MdOutlineDriveFileRenameOutline className="site-form-item-icon mr-1" />
            }
            placeholder="Tên thương hiệu"
            className="p-2"
            autoFocus
          />
        </Form.Item>
      </Form>
    </Modal>
  );
});

export default AddBrandModal;
