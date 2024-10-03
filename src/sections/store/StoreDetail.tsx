import {
  ContainerOutlined,
  HomeOutlined,
  MailOutlined,
  PhoneOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Button, Col, Form, Image, Input, Row, Select, Space } from "antd";
import React from "react";
import { TbReceiptTax } from "react-icons/tb";

export interface StoreDeatilProps {
  storeId: number;
}

const StoreDetail: React.FC<StoreDeatilProps> = () => {
  const [form] = Form.useForm();
  const { Option } = Select;
  const { TextArea } = Input;
  return (
    <>
      {/* <Row gutter={24}>
        <Col span={12}>
          <div>
            <p className="text-[1.2rem] font-bold">Cửa hàng A</p>
          </div>
          <div>
            <table>
              <tr>
                <td>Quản lí:</td>
                <td>Dương Bảo</td>
              </tr>
              <tr>
                <td>Địa chỉ:</td>
                <td>
                  Phú Mỹ, Vũng Tàu
                </td>
              </tr>
              <tr>
                <td>Mã số thuế:</td>
                <td>
                  1234567890
                </td>
              </tr>
              <tr>
                <td>Mô tả:</td>
                <td>
                  Đây là mô tả ...
                </td>
              </tr>
            </table>
          </div>
        </Col>
      </Row> */}
      <Form form={form} name="store" layout="vertical" autoComplete="off">
        <Row gutter={16}>
          <Col span={8}>
            <Image
              width={300}
              height={300}
              src="error"
              fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg=="
            />
          </Col>
          <Col span={16}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  id="formItem"
                  name="name"
                  colon={true}
                  label="Tên cửa hàng"
                  labelCol={{ span: 24 }}
                  className="formItem"
                  rules={[{ required: true }]}
                >
                  <Input
                    prefix={
                      <HomeOutlined className="site-form-item-icon mr-1" />
                    }
                    placeholder="Tên cửa hàng"
                    autoFocus
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="address"
                  label="Địa chỉ"
                  rules={[{ required: true }]}
                >
                  <Input
                    prefix={
                      <ContainerOutlined className="site-form-item-icon mr-1" />
                    }
                    placeholder="Địa chỉ"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16} className="relative mt-1">
              <Col span={12}>
                <Form.Item
                  id="formItem"
                  name="phone"
                  colon={true}
                  label="Số điện thoại"
                  labelCol={{ span: 24 }}
                  className="formItem"
                  rules={[{ required: true }]}
                >
                  <Input
                    prefix={
                      <PhoneOutlined className="site-form-item-icon mr-1 rotate-90" />
                    }
                    placeholder="Điện thoại"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="taxCode"
                  id="formItem"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập mã số thuế",
                    },
                  ]}
                  label="Mã số thuế (cá nhân / doanh nghiệp)"
                  labelCol={{ span: 24 }}
                  className="formItem"
                >
                  <Input
                    prefix={
                      <TbReceiptTax className="site-form-item-icon mr-1" />
                    }
                    placeholder="Mã số thuế"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16} className="relative mt-1">
              <Col span={12}>
                <Form.Item
                  id="formItem"
                  name="managerEmail"
                  colon={true}
                  label="Người quản lí"
                  labelCol={{ span: 24 }}
                  className="formItem"
                  rules={[{ required: true }]}
                >
                  <Input
                    prefix={
                      <MailOutlined className="site-form-item-icon mr-1" />
                    }
                    placeholder="Tài khoản quản lý"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              name="description"
              colon={true}
              label="Mô tả cửa hàng"
              labelCol={{ span: 24 }}
              className="formItem"
            >
              <TextArea showCount placeholder="Viết mô tả ngắn gọn" />
            </Form.Item>
            <Form.Item>
              <Space className="mt-5 flex justify-end">
                <Button htmlType="button">Hủy bỏ</Button>
                <Button type="primary" htmlType="submit">
                  Cập nhật
                </Button>
              </Space>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default StoreDetail;
