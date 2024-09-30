import React from 'react'
import { useParams } from 'react-router-dom';
import StoreDetail from '../StoreDetail';
import StoreProductList from '../StoreProductList';

const StoreDetailView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const storeId = Number(id);
  return (
    <div>
      <div className="rounded-t-xl bg-[#e8e8e8] p-5">
        <p className="text-2xl font-bold text-[#000000]">Quản lý cửa hàng</p>
      </div>
      <div className="p-5">
        <div className="mb-3">{<StoreDetail storeId={storeId} />}</div>
        <div>{<StoreProductList storeId={storeId} />}</div>
      </div>
    </div>
  )
}

export default StoreDetailView