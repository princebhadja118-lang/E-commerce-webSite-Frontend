import React from "react";
import { BsEarbuds } from "react-icons/bs";
import { MdOutlinePhoneIphone } from "react-icons/md";
import { IoIosLaptop } from "react-icons/io";
import { GiCardboardBoxClosed } from "react-icons/gi";
import { MdMenuOpen } from "react-icons/md";
import { RiMenuFold4Fill } from "react-icons/ri";

const SideBar = ({
  categories,
  activeCategory,
  setActiveCategory,
  setActiveMenu,
  activeMenu,
  maxPrice,
  setMaxPrice,
  minPrice,
}) => {
  const mobileScreen = window.innerWidth < 768;

  const iconMap = {
    ALL: <GiCardboardBoxClosed />,
    ACCESSORIES: <BsEarbuds />,
    MOBILE: <MdOutlinePhoneIphone />,
    LAPTOP: <IoIosLaptop />,
  };

  return (
    <div
      className={`fixed w-fit md:w-64 h-full md:p-2 bg-gray-900 mt-1 z-20 ${activeMenu ? "block" : "w-20"} md:block`}
    >
      <div className="flex justify-between items-center gap-2 mb-6 p-3 text-white md:hidden w-full">
        <button
          onClick={() => setActiveMenu(!activeMenu)}
          className="bg-blue-700 hover:bg-blue-600 text-white py-2 px-4 rounded transition w-full flex justify-center items-center"
        >
          {activeMenu ? (
            <MdMenuOpen size={25} />
          ) : (
            <RiMenuFold4Fill size={20} />
          )}
        </button>
      </div>
      <div className="text-white">
        <div
          className={`flex flex-col ${activeMenu ? "items-start" : "items-center"} gap-2 m-2 `}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition cursor-pointer md:w-full ${!activeMenu ? "w-fit" : "w-full text-left"} ${
                activeCategory === cat
                  ? "bg-blue-700 text-white shadow"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {mobileScreen ? (!activeMenu ? iconMap[cat] : cat) : cat}
            </button>
          ))}
        </div>
        <div
          className={`p-1 md:p-3 ${activeMenu ? "w-fit" : "hidden md:block"} ${!mobileScreen ? "w-full" : ""} bg-gray-700 rounded shadow-lg `}
        >
          <p>Price Range:</p>
          <input
            type="range"
            min="0"
            max="100000"
            className="w-fit md:w-full"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
          <div className="flex justify-between items-center">
            <span>
              {!mobileScreen ? "Price : " : null}₹{minPrice}{" "}
            </span>
            <span>
              {!mobileScreen ? "Price : " : null}₹{maxPrice}{" "}
            </span>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default SideBar;
