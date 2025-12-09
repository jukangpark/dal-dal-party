"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

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

  // 섹션으로 스크롤
  const scrollToSection = (sectionId: string) => {
    // 홈 페이지가 아니면 먼저 홈으로 이동
    if (pathname !== "/") {
      router.push(`/#${sectionId}`);
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setIsMobileMenuOpen(false);
    }
  };

  const menuItems = [
    { id: "intro", label: "파티 소개" },
    { id: "status", label: "신청 현황" },
    { id: "cost", label: "참가 비용" },
    { id: "reviews", label: "후기" },
    { id: "gallery", label: "갤러리" },
    { id: "apply", label: "신청하기" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0e6d62] text-white shadow-lg">
      <div className="container mx-auto px-1 py-2 md:py-3">
        <div className="flex items-center justify-between">
          {/* 왼쪽 로고 + 타이틀 */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={handleHomeClick}
          >
            <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden bg-white flex-shrink-0">
              <Image
                src="/술개팅로고.jpg"
                alt="술개팅 로고"
                fill
                className="object-cover"
                priority
              />
            </div>
            <h1 className="text-xl md:text-2xl font-bold">
              광주 육각형 남녀 파티
            </h1>
          </div>

          {/* 데스크톱 네비게이션 */}
          <nav className="hidden md:flex items-center gap-6">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-sm font-medium hover:text-gray-200 transition-colors duration-200 cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* 모바일 햄버거 메뉴 버튼 */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 hover:bg-[#0a5a50] rounded transition-colors duration-200 cursor-pointer"
            aria-label="메뉴"
          >
            <svg
              className="w-6 h-6"
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
            className="md:hidden mt-2 pb-2 border-t border-white/20 backdrop-blur-sm"
            style={{ backgroundColor: 'rgba(14, 109, 98, 0.4)' }}
          >
            <div className="flex flex-col gap-1 pt-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left text-sm font-medium py-1.5 px-2 hover:bg-[#0a5a50] rounded transition-colors duration-200 cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.nav>
        )}
      </div>
    </header>
  );
};

export default Header;

