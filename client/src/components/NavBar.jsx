import React from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";

import logo from "../../images/geekcrypt.png";

const NavBarItem = ({ title, classprops }) => (
  <li style={{cursor:'pointer'}} className={`mx-4 cursor-pointer ${classprops}`}>{title}</li>
);

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = React.useState(false);

  return (
    <nav className=" d-flex justify-center justify-content-between align-items-center p-4">
      <div className="d-initial justify-center align-items-center">
        <img
          style={{ width: 150 }}
          src={logo}
          alt="logo"
          className="cursor-pointer"
        />
      </div>
      <ul
        style={{ listStyle: "none" }}
        className="text-white d-none d-md-flex hidden justify-between align-items-center flex-initial"
      >
        {["Market", "Exchange", "Tutorials", "Wallets"].map((item, index) => (
          <NavBarItem key={item + index} title={item} />
        ))}
        <li className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]">
          Login
        </li>
      </ul>
      <div className="flex d-block d-md-none position-relative">
        {!toggleMenu && (
          <HiMenuAlt4
            fontSize={28}
            className="text-white  cursor-pointer"
            onClick={() => setToggleMenu(true)}
          />
        )}
        {toggleMenu && (
          <AiOutlineClose
            fontSize={28}
            className="text-white d-md-none"
            onClick={() => setToggleMenu(false)}
          />
        )}
        {toggleMenu && (
          <ul
          style={{listStyle:'none',height:"100vh", width:"70vw", top:0, right:-2}}
            className="z-10 position-fixed  p-3 h-screen shadow-2xl md:hidden
            flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in"
          >
            <li className="text-xl w-full my-2">
              <AiOutlineClose onClick={() => setToggleMenu(false)} />
            </li>
            {["Market", "Exchange", "Tutorials", "Wallets"].map(
              (item, index) => (
                <NavBarItem
                  key={item + index}
                  title={item}
                  classprops="my-2 text-lg"
                />
              )
            )}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
