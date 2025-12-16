"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BannerProps {
  images?: string[];
  interval?: number;
  type?: "술개팅" | "별별파티" | "육각형 파티";
}

const Banner = ({ images = [], interval = 5000, type }: BannerProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [isHovered, setIsHovered] = useState(false);

  // 기본 이미지들 (실제 이미지로 교체 가능)
  const defaultImages = [
    "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&h=600&fit=crop",
    "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&h=600&fit=crop",
    "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&h=600&fit=crop",
  ];

  // 파티 타입별 배너 이미지
  const sulgaetingImage = "/배너/술개팅배너.jpg";
  const hexagonPartyImage = "/배너/육각형파티배너.jpg";
  
  const bannerImages = images.length > 0 
    ? images 
    : type === "술개팅"
    ? [sulgaetingImage]
    : type === "육각형 파티"
    ? [hexagonPartyImage]
    : defaultImages;

  // 슬라이드별 텍스트 내용
  const slideContents = [
    {
      title: "술개팅",
      subtitle: "프라이빗한 룸에서 20분씩 1대1 대화",
      description: "(광주에서 가장 긴 대화, 저렴한 비용)",
    },
    {
      title: "별별파티",
      subtitle: "연애를 시작하는 가장 자연스러운 방법",
      description: "",
    },
    {
      title: "육각형 파티",
      subtitle: "주변에 괜찮은 사람들이 없다면 여기입니다!",
      description: "아무나 올 수 없는 승인제 파티!",
    },
  ];

  // type이 있으면 해당 슬라이드만 표시
  const getSlideIndex = () => {
    if (type === "술개팅") return 0;
    if (type === "별별파티") return 1;
    if (type === "육각형 파티") return 2;
    return currentIndex;
  };

  const displayIndex = type ? getSlideIndex() : currentIndex;
  const isSingleSlide = !!type;

  useEffect(() => {
    // type이 있으면 자동 슬라이드 비활성화
    if (isSingleSlide) {
      return;
    }

    // 마우스가 올라가 있으면 자동 슬라이드 중지
    if (isHovered) {
      return;
    }

    const timer = setInterval(() => {
      setDirection("right");
      setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
    }, interval);

    return () => clearInterval(timer);
  }, [bannerImages.length, interval, isHovered, isSingleSlide]);

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
      <AnimatePresence custom={direction} mode={isSingleSlide ? "wait" : undefined}>
        <motion.div
          key={displayIndex}
          custom={direction}
          initial={isSingleSlide ? { opacity: 0 } : { opacity: 0, x: direction === "left" ? -300 : 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={isSingleSlide ? { opacity: 0 } : { opacity: 0, x: direction === "left" ? 300 : -300 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${(type === "술개팅" || type === "육각형 파티") ? bannerImages[0] : bannerImages[displayIndex]})`,
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
                  {slideContents[displayIndex]?.title || ""}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-sm sm:text-base md:text-2xl mb-1 sm:mb-2"
                >
                  {slideContents[displayIndex]?.subtitle || ""}
                </motion.p>
                {slideContents[displayIndex]?.description && (
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-xs sm:text-sm md:text-xl"
                  >
                    {slideContents[displayIndex].description}
                  </motion.p>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* 이전/다음 버튼 - type이 없을 때만 표시 */}
      {!isSingleSlide && (
        <>
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

          {/* 인디케이터 - type이 없을 때만 표시 */}
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
        </>
      )}
    </div>
  );
};

export default Banner;

