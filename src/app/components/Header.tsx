"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // 홈으로 이동 또는 스크롤
  const handleHomeClick = () => {
    if (pathname === "/") {
      // 홈 페이지면 맨 위로 스크롤
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // 다른 페이지면 홈으로 이동
      router.push("/");
    }
  };

  // 페이지로 이동
  const handlePageNavigation = (path: string) => {
    router.push(path);
    setIsMobileMenuOpen(false);
  };

  // 페이지 네비게이션 메뉴
  const pageMenuItems = [
    { path: "/sulgaeting", label: "술개팅" },
    { path: "/hexagon-party", label: "육각형파티" },
    { path: "/star-party", label: "별별파티" },
    { path: "/reservation", label: "예약하기" },
    { path: "/customer-service", label: "고객센터" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-100 h-[80px] relative">
      <div className="container mx-auto px-4 sm:px-6 h-full">
        <div className="flex items-center justify-between h-full">
          {/* 왼쪽 로고 */}
          <div
            className="flex items-center cursor-pointer group h-full"
            onClick={handleHomeClick}
          >
            <div
              className="w-16 h-16 md:w-20 md:h-20 bg-no-repeat bg-center flex-shrink-0"
              style={{
                backgroundImage: `url('/술개팅로고.jpg')`,
                backgroundSize: '220%',
              }}
              role="img"
              aria-label="술개팅 로고"
            />
            <h1 className="text-lg md:text-xl font-bold leading-none text-gray-800 ml-2 md:ml-3 group-hover:text-[#0e6d62] transition-colors duration-200">
              술개팅
            </h1>
          </div>

          {/* 데스크톱 네비게이션 */}
          <nav className="hidden md:flex items-center gap-8">
            {pageMenuItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => handlePageNavigation(item.path)}
                  className={`text-sm font-medium transition-all duration-200 cursor-pointer relative pb-1 ${
                    isActive
                      ? "text-[#0e6d62] font-bold"
                      : "text-gray-700 hover:text-[#0e6d62]"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="absolute bottom-0 left-0 h-0.5 bg-[#0e6d62] rounded-full"
                    ></motion.span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* 모바일 햄버거 메뉴 버튼 */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded transition-colors duration-200 cursor-pointer"
            aria-label="메뉴"
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

          {/* 모바일 메뉴 */}
        {isMobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden absolute top-[80px] left-0 right-0 bg-white border-t border-gray-200 shadow-lg pb-3"
          >
            <div className="flex flex-col gap-1 pt-3">
              {pageMenuItems.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <button
                    key={item.path}
                    onClick={() => handlePageNavigation(item.path)}
                    className={`text-left text-sm font-medium py-2.5 px-3 rounded-lg transition-all duration-200 cursor-pointer relative ${
                      isActive
                        ? "text-[#0e6d62] font-bold bg-[#0e6d62]/10"
                        : "text-gray-700 hover:text-[#0e6d62] hover:bg-gray-50"
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <motion.span
                        initial={{ width: 0 }}
                        animate={{ width: "4px" }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="absolute left-0 top-0 bottom-0 bg-[#0e6d62] rounded-r-full"
                      ></motion.span>
                    )}
                  </button>
                );
              })}
            </div>
          </motion.nav>
        )}
      </div>
    </header>
  );
};

export default Header;

