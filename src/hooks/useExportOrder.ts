import { getOrderAll } from "@/apis/orderApi";
import { useEffect, useState } from "react";

const useExportOrder = () => {
  const [order, setOrder] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getOrderAll();
        if (res && res?.status === 200) {
          setOrder(res?.data);
        }
      } catch (err) {}
    };
    fetchData();
  }, []);

  return {
    order,
  };
};

export default useExportOrder;
