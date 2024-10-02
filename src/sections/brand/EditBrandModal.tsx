import React, { useCallback, useEffect, useState } from "react";
import { Modal, Form, Input } from "antd";
import { notify } from "@/components/Notification";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { editBrand } from "@/apis/brandApi";
import { BrandInfo } from "@/types/product.types";

export interface EditModalProps {
  setIsOpenEdit: React.Dispatch<React.SetStateAction<boolean>>;
  isOpenEdit: boolean;
  handleRefetch: () => void;
  selectedBrand?: BrandInfo | null;
}

const EditBrandModal: React.FC<EditModalProps> = React.memo((props) => {
  const { setIsOpenEdit, isOpenEdit, handleRefetch, selectedBrand } = props;
  const [isConfirmLoading, setIsConfirmLoading] = useState<boolean>(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (selectedBrand) {
      form.setFieldsValue({
        name: selectedBrand.name,
      });
    } else {
      form.resetFields();
    }
  }, [selectedBrand, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      setIsConfirmLoading(true);
      setTimeout(async () => {
        try {
          await handleEditBrand(values);
          form.resetFields();
          setIsConfirmLoading(false);
          setIsOpenEdit(false);
        } catch (error) {
          setIsConfirmLoading(false);
          setIsOpenEdit(true);
        }
      }, 1500);
    } catch (err) {
      console.error("Validation failed:", err);
    }
  };

  const handleCancel = () => {
    setIsOpenEdit(false);
    form.resetFields();
  };

  const handleEditBrand = useCallback(
    async (name: string) => {
      if (selectedBrand && selectedBrand?.id) {
        try {
          const res = await editBrand(selectedBrand?.id, name);
          if (res && res.status === 200) {
            notify("success", "Cập nhật thương hiệu thành công", 3);
            handleRefetch();
          }
        } catch (err: any) {
          console.error(err);
          notify("error", `${err.response.data.title}`, 3);
        }
      }
    },
    [selectedBrand?.id],
  );

  return (
    <Modal
      title={
        <p className="text-lg font-bold text-[red] ">Chỉnh sửa thương hiệu</p>
      }
      open={isOpenEdit}
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
            placeholder="Thương hiệu"
            className="p-2"
            autoFocus
          />
        </Form.Item>
      </Form>
    </Modal>
  );
});

export default EditBrandModal;
