import React from "react";
import CountUp from "react-countup";
import Revenue from "@/assets/images/icons/revenue.png";
import { AdminDashboardInfo } from "@/types/dashboard.type";

interface TotalFieldProps {
  data: AdminDashboardInfo
}

const TotalField: React.FC<TotalFieldProps> = (props) => {
  return (
    <>
      <div className="grid grid-cols-1 gap-5 transition-all duration-500 md:grid-cols-2 lg:grid-cols-4 ">
        <div className="bold flex items-center gap-5 rounded-xl bg-[#fff] px-6 py-10 text-white shadow-md transition-all duration-500">
          <div>
            <img
              src="https://fservices-admin.vercel.app/assets/icons/glass/ic_glass_bag.png"
              alt=""
            />
          </div>
          <div>
            <p className="text-3xl font-bold text-[black]">
              <CountUp end={props.data.revenue} duration={2} />đ
            </p>
            <p className="text-[15px] font-semibold text-[#bdbdbd]">
              Doanh thu
            </p>
          </div>
        </div>
        <div className="bold flex items-center gap-5 rounded-xl bg-[#fff] px-6 py-10 text-white shadow-md transition-all duration-500">
          <div>
            <img src={Revenue} alt="" className="w-[80px]" />
          </div>
          <div>
            <p className="text-3xl font-bold text-[black]">
              <CountUp end={props.data.numOfProducts} duration={2} />
            </p>
            <p className="text-[15px] font-semibold text-[#bdbdbd]">
              Sản phẩm
            </p>
          </div>
        </div>
        <div className="bold flex items-center gap-5 rounded-xl bg-[#fff] px-6 py-10 text-white shadow-md transition-all duration-500">
          <div>
            <img
              src="https://fservices-admin.vercel.app/assets/icons/glass/ic_glass_buy.png"
              alt=""
            />
          </div>
          <div>
            <p className="text-3xl font-bold text-[black]">
              <CountUp end={props.data.numOfStores} duration={2} />
            </p>
            <p className="text-[15px] font-semibold text-[#bdbdbd]">Cửa hàng</p>
          </div>
        </div>
        <div className="bold flex items-center gap-5 rounded-xl bg-[#fff] px-6 py-10 text-white shadow-md transition-all duration-500">
          <div>
            <img
              src="https://fservices-admin.vercel.app/assets/icons/glass/ic_glass_users.png"
              alt=""
            />
          </div>
          <div>
            <p className="text-3xl font-bold text-[black]">
              <CountUp end={props.data.numOfUsers} duration={2} />
            </p>
            <p className="text-[15px] font-semibold text-[#bdbdbd]">
              Người dùng
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TotalField;
