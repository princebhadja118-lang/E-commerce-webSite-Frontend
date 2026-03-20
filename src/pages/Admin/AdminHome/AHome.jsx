import React, { useEffect, useState } from "react";
import ADashBord from "./ADashBord";

const AHome = () => {
  return (
    <>
      <div className="bg-white w-full h-screen p-1 md:p-3">
        <h1 className="text-lg md:text-2xl font-bold my-2">
          Administrative Dashboard
        </h1>
        <div>
          <ADashBord />
        </div>
      </div>
    </>
  );
};

export default AHome;
