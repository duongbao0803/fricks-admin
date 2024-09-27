import React from "react";
import { Helmet } from "react-helmet";
import { AuthenView } from "@/sections/auth/view";

const AuthenPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title> Fricks | Xác thực </title>
      </Helmet>
      <AuthenView />
    </>
  );
};

export default AuthenPage;
