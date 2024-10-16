import React, { useCallback, useEffect, useState } from "react";
import { Form, Input, Button, Select, Row, Col } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { UploadImage } from "@/components";
import { useFetchProducts } from "@/hooks/useFetchProducts";
import { ProductInfo } from "@/types/product.types";
import { PostData } from "@/types/post.types";
import { getPostDetail, updatePost } from "@/apis/postApi";
import { useNavigate } from "react-router-dom";
import { notify } from "@/components/Notification";

export interface PostDetailProps {
  postId: number;
}

const PostDetail: React.FC<PostDetailProps> = React.memo((props) => {
  const { postId } = props;
  const [form] = Form.useForm();
  const [content, setContent] = useState("");
  const [fileChange, setFileChange] = useState<string>("");
  const { data: products } = useFetchProducts(1, 50, 0, 0, 0);
  const { Option } = Select;
  const [postData, setPostData] = useState<PostData>();
  const navigate = useNavigate();

  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();
      const updateValues = {
        id: postData?.id,
        productId: values.productId,
        title: values.title,
        content: content,
        image: fileChange || postData?.image,
     }
     
      if (updateValues) {
        setTimeout(async () => {
          try {
            await handleUpdatePost(updateValues);
          } catch (error) {
            // setIsConfirmLoading(false);
            // setIsOpen(true);
          }
        }, 1500);
      }
    
    } catch (err) {
      console.error("Validation failed:", err);
    }
  };

  const handleUpdatePost = useCallback(async (postData:any) => {
    try {
      const res = await updatePost(postData);
      if (res && res.status === 200) {
        notify("success", `${res.data.message}`, 3);
        navigate(`/post`);
        form.resetFields();
      }
    } catch (err: any) {
      console.error("err", err);
      notify("error", `${err.response.data.message}`, 3);
    }
  }, []);

  const handleCancel = () => {
    navigate(`/post`);
  };

  useEffect(() => {
    if (postId) {
      async function fetchStoreData() {
        const res = await getPostDetail(postId);
        if (res && res.status === 200) {
          setPostData(res.data);
        }
      }
      fetchStoreData();
    }
  }, [postId]);

  const handleFileChange = useCallback((newFileChange: string) => {
    setFileChange(newFileChange);
  }, []);

  useEffect(() => {
    form.setFieldsValue(postData);
  }, [postData, form]);

  useEffect(() => {
    form.setFieldsValue({ image: fileChange });
  }, [fileChange, form]);

  const filterOption = (
    input: string,
    option?: { label: string; value: string },
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  console.log("check postData", postData)
  return (
    <div className="w-full p-4">
      <Form form={form} onFinish={handleUpdate} layout="vertical">
        <Row gutter={16}>
          <Col span={8}>
            <div>
              {fileChange && (
                <img
                  src={fileChange}
                  alt="Selected"
                  className="h-auto w-full"
                />
              )}
            </div>
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
                initialImage={postData?.image}
                titleButton={"Thêm ảnh"}
              />
            </Form.Item>
          </Col>

          <Col span={16}>
            <Form.Item
              name="title"
              label="Tiêu đề"
              rules={[{ required: true, message: "Vui lòng nhập tiêu đề" }]}
            >
              <Input placeholder="Tiêu đề" />
            </Form.Item>

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

            <Form.Item
              name="content"
              label="Nội dung"
              rules={[{ required: true, message: "Vui lòng nhập nội dung" }]}
            >
              <ReactQuill
                value={content}
                onChange={setContent}
                className="h-[300px]"
              />
            </Form.Item>

            <Form.Item>
              <div className="mt-10 flex space-x-2 justify-end">
                <Button onClick={handleCancel}>Hủy bỏ</Button>
                <Button type="primary" htmlType="submit">
                  Cập nhật
                </Button>
              </div>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
});

export default PostDetail;
