import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const headerNav = [
  { display: "Home", path: "/" },
  { display: "Movies", path: "/movie" },
  { display: "TV Series", path: "/tv" },
];

const Header = () => {
  const { pathname } = useLocation();
  const [shrink, setShrink] = useState(false);

  const activeIndex = headerNav.findIndex((item) => item.path === pathname);

  useEffect(() => {
    const handleScroll = () => {
      setShrink(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
<div
  className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
    shrink
      ? "bg-gray-900 shadow-md"
      : "backdrop-blur-md bg-black/20"
  }`}
>

      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Brand Name */}
        <Link
          to="/"
          className="text-2xl font-bold text-white"
        >
          Mizu<span className="text-blue-400">Stream</span>
        </Link>

        {/* Navigation Links */}
        <ul className="flex space-x-6">
          {headerNav.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className={`text-lg font-medium ${
                  index === activeIndex
                    ? "text-blue-400"
                    : "text-white hover:text-blue-500"
                }`}
              >
                {item.display}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Header;
