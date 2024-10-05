import React from "react";
import { PostView } from "@/sections/post/view";
import { Helmet } from "react-helmet";

const PostPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title> Fricks | Bài viết </title>
      </Helmet>
      <PostView />
    </>
  );
};

export default PostPage;
