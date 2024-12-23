import React from "react";
import UserList from "../UserList";

const UserView: React.FC = React.memo(() => {
  return (
    <>
      <div className="rounded-t-xl bg-[#fff] p-5">
        <p className="text-2xl font-bold text-[#000000]">Quản lý người dùng</p>
      </div>
      <div className="bg-[#fff] p-5">
        <UserList />
      </div>
    </>
  );
});

export default UserView;
