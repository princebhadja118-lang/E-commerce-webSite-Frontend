import React, { useState, useEffect } from "react";

const DeliveryStatus = ({ date, time }) => {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 10000);
    return () => clearInterval(interval);
  }, []);

  const deliveryTime = new Date(date).getTime() + time * 60 * 1000;
  const isDelivered = now >= deliveryTime;
  const remaining = Math.ceil((deliveryTime - now) / 60000);

  return isDelivered ? (
    <span className="text-xs bg-green-100 text-green-700 font-semibold px-2 py-1 rounded-full">
      Delivered ✓
    </span>
  ) : (
    <span className="text-xs bg-yellow-100 text-yellow-700 font-semibold px-2 py-1 rounded-full">
      Delivery in {remaining} minute
    </span>
  );
};

export default DeliveryStatus;
