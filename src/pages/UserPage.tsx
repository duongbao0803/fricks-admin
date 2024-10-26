import React from "react";
import { Helmet } from "react-helmet";
import UserView from "@/sections/user/view/UserView";

const UserPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title> Fricks | Người dùng  </title>
      </Helmet>
      <UserView />
    </>
  );
};

export default UserPage;
