import React from "react";
import CountUp from "react-countup";

const TotalField: React.FC = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-5 transition-all duration-500 md:grid-cols-2 lg:grid-cols-4 ">
        <div className="bold flex items-center gap-5 rounded-lg px-6 py-10 text-white shadow-xl transition-all duration-500">
          <div>
            <img
              src="https://fservices-admin.vercel.app/assets/icons/glass/ic_glass_bag.png"
              alt=""
            />
          </div>
          <div>
            <p className="text-3xl font-bold text-[black]">
              <CountUp end={2653} duration={2} />m
            </p>
            <p className="font-semibold text-[#bdbdbd]">Doanh thu</p>
          </div>
        </div>
        <div className="bold flex items-center gap-5 rounded-lg px-6 py-10 text-white shadow-xl transition-all duration-500">
          <div>
            <img
              src="https://fservices-admin.vercel.app/assets/icons/glass/ic_glass_buy.png"
              alt=""
            />
          </div>
          <div>
            <p className="text-3xl font-bold text-[black]">
              <CountUp end={1500} duration={2} />
            </p>
            <p className="font-semibold text-[#bdbdbd]">Lợi nhuận</p>
          </div>
        </div>
        <div className="bold flex items-center gap-5 rounded-lg px-6 py-10 text-white shadow-lg transition-all duration-500">
          <div>
            <img
              src="https://fservices-admin.vercel.app/assets/icons/glass/ic_glass_users.png"
              alt=""
            />
          </div>
          <div>
            <p className="text-3xl font-bold text-[black]">
              <CountUp end={150} duration={2} />
            </p>
            <p className="font-semibold text-[#bdbdbd]">Cửa hàng</p>
          </div>
        </div>
        <div className="bold flex items-center gap-5 rounded-lg px-6 py-10 text-white shadow-lg transition-all duration-500">
          <div>
            <img
              src="https://fservices-admin.vercel.app/assets/icons/glass/ic_glass_users.png"
              alt=""
            />
          </div>
          <div>
            <p className="text-3xl font-bold text-[black]">
              <CountUp end={500} duration={2} />
            </p>
            <p className="font-semibold text-[#bdbdbd]">Người dùng</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TotalField;
