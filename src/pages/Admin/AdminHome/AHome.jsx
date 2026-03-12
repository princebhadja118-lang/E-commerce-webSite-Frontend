import React, { useEffect, useState } from "react";
import ADashBord from "./ADashBord";

const AHome = () => {
  return (
    <>
      <div className="bg-white w-full h-screen p-3">
        <h1 className="text-2xl font-bold mb-4">Administrative Dashboard</h1>
        <div className="">
          <ADashBord />
        </div>
      </div>
    </>
  );
};

export default AHome;
