import React from "react";
import logo from "../assets/logo.png";
function Header() {
  return (
    <>
      <div className="flex grid-cols-3 divide-x-2 divide-gray-300 justify-between">
        <div className="flex flex-wrap font-bold text-black pl-2">
          <a
            onClick={() => (window.location.href = "/")}
            className="cursor-pointer"
          >
            <img
              src={logo}
              alt="logo"
              className="w-12 h-12 mx-2 my-4 cursor-pointer"
            />
          </a>
          <div
            className="flex flex-wrap font-bold text-black text-2xl cursor-pointer py-6 px-2"
            onClick={() => (window.location.href = "/")}
          >
            SnapText
          </div>
        </div>

        <div
          className="flex flex-wrap text-black cursor-pointer py-7 px-10"
          onClick={() => (window.location.href = "/extract")}
        >
          Extract
        </div>
      </div>
      <hr className="border-2 border-gray-300" />
    </>
  );
}

export default Header;
