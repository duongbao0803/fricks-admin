import React, { useCallback, useEffect, useState } from "react";
import { Modal, Form, Input, Select, Col, Row } from "antd";
import { UploadImage } from "@/components";
import { notify } from "@/components/Notification";
import { useFetchProducts } from "@/hooks/useFetchProducts";
import { ProductInfo } from "@/types/product.types";
import { addPost } from "@/apis/postApi";
import { PostData } from "@/types/post.types";

export interface AddModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  handleRefetch: () => void;
}

const AddPostModal: React.FC<AddModalProps> = React.memo((props) => {
  // const { addNewUserItem } = useUserService();
  const { setIsOpen, isOpen, handleRefetch } = props;
  const [isConfirmLoading, setIsConfirmLoading] = useState<boolean>(false);
  const [fileChange, setFileChange] = useState<string>("");
  const [form] = Form.useForm();
  const { data: products } = useFetchProducts(1, 50, 0, 0, 0);
  const { Option } = Select;
  const { TextArea } = Input;

  useEffect(() => {
    form.setFieldsValue({ image: fileChange });
  }, [fileChange, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      setIsConfirmLoading(true);
      setTimeout(async () => {
        try {
          await handleAddPost(values);
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

  const handleFileChange = useCallback((newFileChange: string) => {
    setFileChange(newFileChange);
  }, []);

  const handleAddPost = useCallback(async (postData: PostData) => {
    try {
      const res = await addPost(postData);
      if (res && res.status === 200) {
        notify("success", `${res.data.message}`, 3);
        handleRefetch();
        form.resetFields();
      }
    } catch (err: any) {
      console.error("err", err);
      notify("error", `${err.response.data.message}`, 3);
    }
  }, []);

  const filterOption = (
    input: string,
    option?: { label: string; value: string },
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <Modal
      title={<p className="text-lg font-bold text-[red] ">Thêm bài viết</p>}
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
              name="title"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tiêu đề",
                },
              ]}
              colon={true}
              label="Tiêu đề"
              labelCol={{ span: 24 }}
              className="formItem"
            >
              <Input autoFocus placeholder="Tiêu đề" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="productId"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn sản phẩm",
                },
              ]}
              colon={true}
              label="Sản phẩm"
              labelCol={{ span: 24 }}
              className="formItem"
            >
              <Select
                placeholder="Chọn sản phẩm"
                showSearch
                optionFilterProp="children"
                filterOption={filterOption}
              >
                {products?.data?.map((product: ProductInfo, index: number) => (
                  <Option key={index} value={product?.id} label={product?.name}>
                    {product?.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          name="content"
          colon={true}
          label="Nội dung bài viết"
          labelCol={{ span: 24 }}
          className="formItem"
          rules={[{ required: true, message: "Vui lòng nhập nội dung bài viết" }]}
        >
          <TextArea showCount placeholder="Nội dung" />
        </Form.Item>
        <Form.Item
          name="image"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn hình ảnh",
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
});

export default AddPostModal;
