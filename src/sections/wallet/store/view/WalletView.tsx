import React from "react";
import Wallet from "../Wallet";

const WalletView: React.FC = React.memo(() => {
  return (
    <>
      <div className="rounded-t-xl bg-[#fff] p-5">
        <p className="text-2xl font-bold text-[#000000]">Quản lý ví tiền</p>
      </div>
      <div className="p-5 bg-[#fff]">
        <Wallet />
      </div>
    </>
  );
});

export default WalletView;