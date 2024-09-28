import React, { useState } from "react";
import { Dropdown } from "antd";
import { DeleteOutlined, EditOutlined, MoreOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { DataType } from "./StoreList";
import EditStoreModal from "./EditStoreModal";

export interface DropdownStoreFuncProps {
  storeInfo: DataType;
}

const DropdownStoreFunc: React.FC<DropdownStoreFuncProps> = React.memo(
  () => {
    const [isOpen, setIsOpen] = useState(false);
    // const { deleteStoreItem } = useStoreService();
    // const { storeInfo } = props;
    // const busstoreId = storeInfo?.id;

    const openEditModal = () => {
      setIsOpen(true);
    };

    return (
      <>
        <Dropdown
          menu={{
            items: [
              {
                key: "1",
                label: (
                  <Link
                    rel="noopener noreferrer"
                    to="#"
                    onClick={openEditModal}
                  >
                    <EditOutlined className="pr-2" />
                    Chỉnh sửa cửa hàng
                  </Link>
                ),
              },
              {
                key: "2",
                label: (
                  <Link
                    rel="noopener noreferrer"
                    to="#"
                    // onClick={() =>
                    //   DeleteStoreModal({
                    //     busstoreId,
                    //     deleteStoreItem,
                    //   })
                    // }
                  >
                    <DeleteOutlined className="pr-2" />
                    Xóa cửa hàng
                  </Link>
                ),
              },
            ],
          }}
          trigger={["click"]}
        >
          <MoreOutlined className="rotate-90" />
        </Dropdown>

        <EditStoreModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          // productInfo={productInfo}
        />
      </>
    );
  },
);

export default DropdownStoreFunc;
