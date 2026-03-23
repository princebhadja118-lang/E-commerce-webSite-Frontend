import React, { useEffect, useState } from "react";
import ADashBord from "./ADashBord";
import axios from "axios";
import DashboardChart from "../../../components/charts/DashboardChart";

const AHome = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/dashboard/stats")
      .then((res) => setData(res.data));
  }, []);

  return (
    <>
      <div className="bg-white w-full h-screen p-1 md:p-3">
        <h1 className="text-lg md:text-2xl font-bold my-2">
          Administrative Dashboard
        </h1>
        <div>
          <ADashBord />
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-5 md:py-10">
          <DashboardChart data={data || []} />
        </div>
      </div>
    </>
  );
};

export default AHome;
