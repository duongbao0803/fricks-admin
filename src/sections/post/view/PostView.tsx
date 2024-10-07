import React from "react";
import PostList from "../PostList";

const PostView: React.FC = () => {
  return (
    <>
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
