import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../css/Side.css';
import { LuUser } from "react-icons/lu";
import { LiaTemperatureHighSolid } from "react-icons/lia";
import { WiHumidity } from "react-icons/wi";
import { HiViewBoards } from "react-icons/hi";
import { PiSignOutBold } from "react-icons/pi";
import { HiBellAlert } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
    const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState(0);
  const handleGoBack = () => {
        navigate("/");;
    };
  const handleLinkClick = (index) => {
    setActiveLink(index);
  };
   const SIDEBAR_LINKS = [
    { id: 1, path: "/Layout", name: "Tableau de bord", icon: HiViewBoards },
    { id: 2, path: "/Layout/temp", name: "Temperature", icon: LiaTemperatureHighSolid },
    { id: 3, path: "/Layout/humid", name: "Humedité", icon: WiHumidity },
    { id: 4, path: "/Layout/incid", name: "Incidents", icon: HiBellAlert},

  ];

 return (
    <div className="side fixed left-0 top-0 z-10 h-screen border-r pt-8 px-4">

      {/* Navigation Links */}

      <ul className="mt-6 space-y-6">
        {SIDEBAR_LINKS.map((link, index) => (
          <li
            key={index}
            className={`font-medium rounded-md py-2 px-3 justify-center hover:bg-white hover:text-Poppins-500 ${
              activeLink === index ? "bg-blue-100 text-blue-600" : ""
            }`}
          >
            <Link
              to={link.path}
              className="flex justify-center md:justify-start items-center md:space-x-5"
              onClick={() => handleLinkClick(index)}
            >
              <span>{link.icon()}</span>
              <span className="names text-sm text-gray-500 hidden md:flex">
                {link.name}
              </span>
            </Link>

          </li>
        ))}

      </ul>
      <button onClick={handleGoBack} className="back-button">Retour</button>
     </div>
     )};


export default Sidebar;