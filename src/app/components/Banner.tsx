"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BannerProps {
  images?: string[];
  interval?: number;
}

const Banner = ({ images = [], interval = 5000 }: BannerProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [isHovered, setIsHovered] = useState(false);

  // 기본 이미지들 (실제 이미지로 교체 가능)
  const defaultImages = [
    "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&h=600&fit=crop",
    "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&h=600&fit=crop",
    "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&h=600&fit=crop",
  ];

  const bannerImages = images.length > 0 ? images : defaultImages;

  useEffect(() => {
    // 마우스가 올라가 있으면 자동 슬라이드 중지
    if (isHovered) {
      return;
    }

    const timer = setInterval(() => {
      setDirection("right");
      setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
    }, interval);

    return () => clearInterval(timer);
  }, [bannerImages.length, interval, isHovered]);

  const goToSlide = (index: number) => {
    const newDirection = index > currentIndex ? "right" : "left";
    setDirection(newDirection);
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setDirection("left");
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? bannerImages.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setDirection("right");
    setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
  };

  const isFirstSlide = currentIndex === 0;
  const isLastSlide = currentIndex === bannerImages.length - 1;

  return (
    <div
      className="relative w-full h-[280px] sm:h-[350px] md:h-[500px] overflow-hidden bg-black"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          initial={{ opacity: 0, x: direction === "left" ? -300 : 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction === "left" ? 300 : -300 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${bannerImages[currentIndex]})`,
            }}
          >
            {/* 어두운 오버레이 */}
            <div className="absolute inset-0 bg-black/40"></div>
            
            {/* 텍스트 오버레이 */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white px-3 sm:px-4 drop-shadow-lg">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl sm:text-3xl md:text-6xl font-bold mb-2 sm:mb-4"
                >
                  광주 육각형 남녀 파티
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-sm sm:text-base md:text-2xl mb-1 sm:mb-2"
                >
                  주변에 괜찮은 사람들이 없다면 여기입니다!
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-xs sm:text-sm md:text-xl"
                >
                  아무나 올 수 없는 승인제 파티
                </motion.p>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* 이전/다음 버튼 */}
      <button
        onClick={goToPrevious}
        disabled={isFirstSlide}
        className={`absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 text-white p-1.5 sm:p-2 rounded-full transition-all duration-300 z-10 ${
          isFirstSlide
            ? "bg-white/10 cursor-not-allowed opacity-50"
            : "bg-white/30 hover:bg-white/50 cursor-pointer"
        }`}
        aria-label="이전 이미지"
      >
        <svg
          className="w-4 h-4 sm:w-6 sm:h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        onClick={goToNext}
        disabled={isLastSlide}
        className={`absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 text-white p-1.5 sm:p-2 rounded-full transition-all duration-300 z-10 ${
          isLastSlide
            ? "bg-white/10 cursor-not-allowed opacity-50"
            : "bg-white/30 hover:bg-white/50 cursor-pointer"
        }`}
        aria-label="다음 이미지"
      >
        <svg
          className="w-4 h-4 sm:w-6 sm:h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* 인디케이터 */}
      <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2 z-10">
        {bannerImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 cursor-pointer ${
              index === currentIndex
                ? "w-6 sm:w-8 bg-white"
                : "w-1.5 sm:w-2 bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`슬라이드 ${index + 1}로 이동`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;

