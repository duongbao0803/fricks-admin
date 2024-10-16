import PostDetailView from "@/sections/post/view/PostDetailView";
import React from "react";
import { Helmet } from "react-helmet";

const PostDetailPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title> Fricks | Bài viết </title>
      </Helmet>
      <PostDetailView />
    </>
  );
};

export default PostDetailPage;
