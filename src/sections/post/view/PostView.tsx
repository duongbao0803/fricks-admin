import React from "react";
import PostList from "../PostList";
import { BreadScrumb } from "@/components";

const PostView: React.FC = () => {
  const items = [
    {
      href: "/store/product",
      title: "Trang chủ",
    },
    {
      title: "Bài viết",
    }
  ];
  return (
    <>
    <div className="mb-3">
        <BreadScrumb items={items} />
      </div>
      <div className="rounded-t-xl bg-[#fff] p-5">
        <p className="text-2xl font-bold text-[#000000]">Quản lý bài viết</p>
      </div>
      <div className="bg-[#fff] p-5">
        <PostList />
      </div>
    </>
  );
};

export default PostView;
