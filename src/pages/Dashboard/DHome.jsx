import React from "react";
import logo from "../../assets/rklogo-removebg-preview.png";

const DHome = () => {
  return (
    <div className="md:h-250">
      <div className="bg-red-500">
        <div className=" flex justify-center items-center md:flex md:justify-end md:pr-30 md:pt-25">
          <img src={logo} alt="Rk logo" className="h-42 w-80" />
        </div>
        <div></div>
      </div>
      <div className="flex justify-center items-end pt-20 md:pr-10 mb-10 flex-col">
        <p className="text-2xl md:text-3xl">PET BOTTLE FOR</p>
        <p className="text-3xl md:text-5xl font-bold text-red-500">
          AGROCHEMICALS
        </p>
        <p className="text-3xl md:text-5xl font-bold">& PESTICIDES</p>
        <p className="text-2xl md:text-3xl">PACKAGING</p>
      </div>
    </div>
  );
};

export default DHome;
