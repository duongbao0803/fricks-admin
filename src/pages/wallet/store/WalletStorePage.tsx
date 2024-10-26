import WalletView from "@/sections/wallet/store/view/WalletView";
import React from "react";
import { Helmet } from "react-helmet";

const WalletStorePage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title> Fricks | Ví  </title>
      </Helmet>
      <WalletView />
    </>
  );
};

export default WalletStorePage;
