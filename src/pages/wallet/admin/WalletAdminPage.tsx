import WalletView from "@/sections/wallet/admin/view/WalletView";
import React from "react";
import { Helmet } from "react-helmet";

const WalletAdminPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title> Fricks | Ví  </title>
      </Helmet>
      <WalletView />
    </>
  );
};

export default WalletAdminPage;
