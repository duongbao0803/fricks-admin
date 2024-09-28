import React, { useCallback, useMemo, useState } from "react";
import {
  Button,
  Form,
  Image,
  Input,
  Table,
  Tag,
} from "antd";
import type { TablePaginationConfig, TableProps } from "antd";
import {
  FilterOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { StoreInfo } from "@/types/store.types";
import { renderStatusTag } from "@/utils/renderStatusTag";
import AddStoreModal from "./AddStoreModal";

export interface DataType {
  id: number;
  // key: string;
  // name: string;
  // image: string;
  // description: string;
  // quantity: number;
  // typeOfProduct: string;
  // price: number;
  // rating: number;
}

const StoreList: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // const { Stores, totalCount, isFetching, fetchStoreDetail } =
  //   useStoreService();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [storeDetail, setStoreDetail] = useState<StoreInfo>();
  const { TextArea } = Input;
  // const { statusText, tagColor } =
  //   storeDetail && !storeDetail?.isDeleted
  //     ? renderStatusTag(!storeDetail?.isDeleted)
  //     : { statusText: <Skeleton count={1} width={90} />, tagColor: "" };
  const [form] = Form.useForm();

  // const fetchData = async (StoreId: number) => {
  //   try {
  //     const res = await fetchStoreDetail(StoreId);
  //     if (res && res.status === 200) {
  //       setStoreDetail(res.data);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching route detail:", error);
  //   }
  // };

  const handleTableChange = useCallback((pagination: TablePaginationConfig) => {
    setCurrentPage(pagination.current || 1);
  }, []);

  const handleRowClick = async (record: number) => {
    setStoreDetail(undefined);
    // await fetchData(record);
  };

  const columns: TableProps<DataType>["columns"] = useMemo(
    () => [
      {
        title: "STT",
        dataIndex: "index",
        key: "index",
        render: (_, _record, index) => index + 1,
      },
      {
        title: "Tên cửa hàng",
        dataIndex: "name",
        width: "20%",
        className: "first-column",
        onCell: () => {
          return {
            onClick: () => {
              setIsModalOpen(true);
            },
          };
        },
      },
      {
        title: "Hình ảnh",
        dataIndex: "img-url",
        width: "15%",
        render: (image) => (
          <Image
            src={image}
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "100%",
              objectFit: "cover",
            }}
          />
        ),
      },
      {
        title: "Tài khoản quản lý",
        dataIndex: "manager-email",
        width: "25%",
      },
      {
        title: "Mô tả ngắn gọn",
        dataIndex: "short-description",
        width: "17%",
      },
      {
        title: "Ngày tạo",
        dataIndex: "create-date",
        width: "13%",
      },
      {
        title: "Trạng thái",
        dataIndex: "is-deleted",
        render: (isDeleted) => {
          let statusText = "";
          let tagColor = "";
          switch (isDeleted) {
            case false:
              statusText = "ACTIVE";
              tagColor = "green";
              break;
            case true:
              statusText = "INACTIVE";
              tagColor = "pink";
              break;
            default:
              statusText = "UNKNOWN";
              tagColor = "gray";
              break;
          }
          return <Tag color={tagColor}>{statusText}</Tag>;
        },
        width: "10%",
      },
    ],
    [],
  );

  return (
    <>
      <div className="flex justify-between">
        <div className="flex gap-x-2">
          <Input
            placeholder="Tìm kiếm..."
            className="h-8 max-w-lg rounded-lg sm:mb-5 sm:w-[300px]"
          />
          <Button className="flex items-center" type="primary">
            <FilterOutlined className="align-middle" />
            Sắp xếp
          </Button>
        </div>
        <div className="flex gap-x-2">
          <div>
            {/* <ExportStore /> */}
          </div>
          <div>
            <Button type="primary" onClick={() => setIsOpen(true)}>
              <div className="flex justify-center">
                <PlusCircleOutlined className="mr-1 text-lg" />
                Thêm cửa hàng
              </div>
            </Button>
          </div>
        </div>
      </div>
      <Table
        className="pagination"
        id="myTable"
        columns={columns}
        // dataSource={Stores?.map(
        //   (record: { id: unknown; "create-date": string | Date }) => ({
        //     ...record,
        //     key: record.id,
        //     "create-date": formatDate2(record["create-date"]),
        //   }),
        // )}
        // pagination={{
        //   current: currentPage,
        //   total: totalCount || 0,
        //   pageSize: 5,
        // }}
        // onChange={handleTableChange}
        // loading={isFetching}
        // rowKey={(record) => record.id}
        // onRow={(record) => ({
        //   onClick: () => handleRowClick(record.id),
        // })}
      />
      <AddStoreModal setIsOpen={setIsOpen} isOpen={isOpen} />
      {/* <Modal
        title={
          <p className="text-lg font-bold text-[red]">
            Chi tiết nhà xe &nbsp;
            {!StoreDetail?.isDeleted && (
              <Tag color={tagColor}>{statusText}</Tag>
            )}
          </p>
        }
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        {StoreDetail ? (
          <Form name="normal_login" className="login-form" form={form}>
            <Row gutter={16} className="relative mt-1">
              <Col span={12}>
                <Form.Item
                  label="Tên nhà xe"
                  labelCol={{ span: 24 }}
                  className="formItem"
                >
                  <Input
                    prefix={
                      <EnvironmentOutlined className="site-form-item-icon mr-1" />
                    }
                    className="p-2"
                    defaultValue={StoreDetail?.name}
                    readOnly
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Email quản lý"
                  labelCol={{ span: 24 }}
                  className="formItem"
                >
                  <Input
                    prefix={
                      <MailOutlined className="site-form-item-icon mr-1" />
                    }
                    className="p-2"
                    defaultValue={StoreDetail?.["manager-email"]}
                    readOnly
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16} className="relative mt-1">
              <Col span={12}>
                <Form.Item
                  label="Ngày tạo"
                  labelCol={{ span: 24 }}
                  className="formItem"
                >
                  <DatePicker
                    picker="date"
                    format="DD/MM/YYYY"
                    className="formItem w-full p-2"
                    defaultValue={dayjs(StoreDetail["create-date"])}
                    disabled
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Ngày chỉnh sửa"
                  labelCol={{ span: 24 }}
                  className="formItem"
                >
                  <DatePicker
                    picker="date"
                    format="DD/MM/YYYY"
                    className="formItem w-full p-2"
                    defaultValue={dayjs(StoreDetail["update-date"])}
                    disabled
                  />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              label="Mô tả ngắn gọn"
              labelCol={{ span: 24 }}
              className="formItem"
            >
              <Input
                prefix={
                  <EnvironmentOutlined className="site-form-item-icon mr-1" />
                }
                className="p-2"
                defaultValue={StoreDetail?.["short-description"]}
                readOnly
              />
            </Form.Item>
            <Form.Item
              name="full-description"
              rules={[
                {
                  required: true,
                },
              ]}
              colon={true}
              label="Mô tả chi tiết"
              labelCol={{ span: 24 }}
              className="formItem"
            >
              <TextArea
                showCount
                placeholder="Mô tả chi tiết"
                defaultValue={StoreDetail?.["full-description"]}
              />
            </Form.Item>

            <Image
              src={StoreDetail["img-url"]}
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "100%",
                objectFit: "cover",
              }}
            />
          </Form>
        ) : (
          <>
            <Skeleton count={1} width={100} className="mb-2" />
            <Skeleton count={10} className="mb-2" />
            <Skeleton count={1} width={100} className="mb-2" />
            <Skeleton count={10} className="mb-2" />
          </>
        )}
      </Modal> */}
    </>
  );
};

export default StoreList;
