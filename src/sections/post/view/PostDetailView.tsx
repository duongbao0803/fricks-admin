import React from "react";
import PostDetail from "../PostDetail";
import { useParams } from "react-router-dom";

const PostDetailView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const postId = Number(id);

  return (
    <>
      <div className="rounded-t-xl bg-[#fff] p-5">
        <p className="text-2xl font-bold text-[#000000]">Quản lý bài viết</p>
      </div>
      <div className="bg-[#fff] p-5">
        <PostDetail postId={postId}/>
      </div>
    </>
  );
};

export default PostDetailView;
