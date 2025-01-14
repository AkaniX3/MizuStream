import React from "react";

const Footer = () => {
    return (
      <footer className="bg-gray-900 text-white py-8 text-center">
        {/* Logo */}
        <div className="text-2xl font-bold mb-3">
          Mizu<span className="text-blue-400">Stream</span>
        </div>
  
        {/* Created by */}
        <p className="text-gray-400 text-sm mb-4">Created by AkaniX3</p>
  
        {/* Links */}
        <div className="flex justify-center space-x-4 mb-6">
          <a
            href="https://akanix3.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 underline hover:text-blue-500 transition"
          >
            Visit Me
          </a>
          <a
            href="https://github.com/AkaniX3"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 underline hover:text-blue-500 transition"
          >
            GitHub
          </a>
        </div>
  
        {/* Copyright message */}
        <div className="text-xs text-gray-400">
          <p>© 2025 MizuStream. All rights reserved.</p>
          <p>Unauthorized duplication is a violation of applicable laws.</p>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  