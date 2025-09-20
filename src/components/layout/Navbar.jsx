import React, { useState } from "react";
import logoImg from "../../assets/images/logo-3.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="navbar-container bg-[#0a1423e6] h-[70px] fixed left-0 right-0 top-0 z-50">
      <div className="navbar-items flex items-center justify-between h-full px-5">
        
        {/* === Mobile Layout (<lg) === */}
        <div className="flex items-center justify-between w-full lg:hidden">
          {/* Left: Hamburger */}
          <button
            className="text-white text-3xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰
          </button>

          {/* Center: Brand Text */}
          <h3 className="text-gradient-gold text-xl font-bold">مُقَرَّبُون</h3>

          {/* Right: Logo */}
          <img src={logoImg} alt="logo-img" className="w-10" />
        </div>

        {/* === Desktop Layout (>=lg) === */}
        <div className="hidden lg:flex items-center">
          {/* Logo + Brand */}
          <img src={logoImg} alt="logo-img" className="w-10" />
          <h3 className="brand-name text-gradient-gold mx-3 text-3xl font-bold">
            مُقَرَّبُون
          </h3>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex gap-7 text-lg font-normal">
          <li className="menu-item relative py-[1.3rem]"><a href="#" className="menu-item-link text-white">صفحه اصلی</a></li>
          <li className="menu-item relative py-[1.3rem]"><a href="#" className="text-white menu-item-link">شهدا</a></li>
          <li className="menu-item relative py-[1.3rem]"><a href="#" className="text-white menu-item-link">زندگینامه</a></li>
          <li className="menu-item relative py-[1.3rem]"><a href="#" className="text-white menu-item-link">یادمان</a></li>
          <li className="menu-item relative py-[1.3rem]"><a href="#" className="text-white menu-item-link">گالری</a></li>
          <li className="menu-item relative py-[1.3rem]"><a href="#" className="text-white menu-item-link">اخبار</a></li>
          <li className="menu-item relative py-[1.3rem]"><a href="#" className="text-white menu-item-link">درباره ما</a></li>
        </ul>

        {/* Desktop Login/Profile Icon */}
        <a
          href="#"
          className="hidden lg:flex shadow-gold hover:shadow-[0_0_8px_#d4af3799] bg-gradient-gold transition-all size-10 rounded-full items-center justify-center"
        >
          <svg className="w-[60%]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
          </svg>
        </a>
      </div>

      {/* === Mobile Menu Modal === */}
      {isOpen && (
        <div className="lg:hidden fixed top-[70px] left-0 w-full bg-[#0a1423] text-white flex flex-col">
          
          {/* Profile Box */}
          <div className="flex justify-center items-center py-6 border-b border-gray-700">
            <a
              href="#"
              className="shadow-gold hover:shadow-gold-hover bg-gradient-gold transition-all size-14 rounded-full flex items-center justify-center"
            >
              <svg className="w-[60%]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
              </svg>
            </a>
          </div>

          {/* Menu Items */}
          <ul className="flex flex-col gap-4 text-lg font-normal py-6 px-5">
            <li><a href="#">صفحه اصلی</a></li>
            <li><a href="#">شهدا</a></li>
            <li><a href="#">زندگینامه</a></li>
            <li><a href="#">یادمان</a></li>
            <li><a href="#">گالری</a></li>
            <li><a href="#">اخبار</a></li>
            <li><a href="#">درباره ما</a></li>
          </ul>
        </div>
      )}
    </div>
  );
}


