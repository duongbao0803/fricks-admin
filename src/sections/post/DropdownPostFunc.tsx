import React, { useCallback } from "react";
import { Dropdown, Popconfirm } from "antd";
import { DeleteOutlined, EditOutlined, MoreOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { deletePost } from "@/apis/postApi";
import { notify } from "@/components/Notification";

export interface DropdownPostFuncProps {
  postId: number;
  handleRefetch: () => void
}

const DropdownPostFunc: React.FC<DropdownPostFuncProps> = React.memo(
  (props) => {
    const { postId, handleRefetch } = props;

    const handleDeletePost = useCallback(async (postId: number) => {
      try {
        const res = await deletePost(postId);
        console.log("check res", res);
        if (res && res.status === 200) {
          notify("success", `${res.data.message}`, 3);
          handleRefetch();
        }
      } catch (err: any) {
        console.error("err", err);
        notify("error", `${err.response.data.message}`, 3);
      }
    }, []);

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
                    to={`/post/${postId}`}
                    // onClick={openEditModal}
                  >
                    <EditOutlined className="pr-2" />
                    Chỉnh sửa bài viết
                  </Link>
                ),
              },
              {
                key: "2",
                label: (
                  <Popconfirm
                    title="Bạn có muốn xóa bài viết này không?"
                    onConfirm={() => handleDeletePost(postId)}
                    okText="Có"
                    cancelText="Không"
                  >
                    <DeleteOutlined className="pr-2" /> Xóa bài viết
                  </Popconfirm>
                  // <Link
                  //   rel="noopener noreferrer"
                  //   to="#"
                  //   // onClick={() =>
                  //   //   DeletePostModal({
                  //   //     busPostId,
                  //   //     deletePostItem,
                  //   //   })
                  //   // }
                  // >
                  //   <DeleteOutlined className="pr-2" />
                  //   Xóa bài viết
                  // </Link>
                ),
              },
            ],
          }}
          trigger={["click"]}
        >
          <MoreOutlined className="rotate-90" />
        </Dropdown>
      </>
    );
  },
);

export default DropdownPostFunc;
