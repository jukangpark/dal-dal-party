"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Banner from "../components/Banner";
import CTASection from "../components/CTASection";

export default function SulgaetingPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [selectedSection, setSelectedSection] = useState<"intro" | "reviews" | "couples" | "partnership" | null>(null);

  // 1부터 8까지 이미지 경로 생성 (술개팅 소개)
  const introImages = Array.from({ length: 8 }, (_, i) => i + 1).map((num) => {
    return `/술개팅_소개/${num}.jpg`;
  });

  // 1부터 62까지 이미지 경로 생성 (술개팅 후기)
  const reviewImages = Array.from({ length: 62 }, (_, i) => i + 1).map((num) => {
    return `/술개팅 후기/${num}.png`;
  });

  // 1부터 26까지 이미지 경로 생성 (실제 커플 후기)
  const coupleImages = Array.from({ length: 26 }, (_, i) => {
    const num = i + 1;
    return `/술개팅 실제커플 후기/${num}.png`;
  });

  // 제휴 알림 이미지
  const partnershipImages = [
    "/술개팅 안전 업체/2.png",
    "/술개팅 안전 업체/3.png",
    "/술개팅 안전 업체/4.png",
    "/술개팅 안전 업체/1.png",
  ];

  // 현재 선택된 이미지 배열
  const currentImages = selectedSection === "intro" ? introImages :
                       selectedSection === "reviews" ? reviewImages : 
                       selectedSection === "couples" ? coupleImages :
                       selectedSection === "partnership" ? partnershipImages : [];

  const images = currentImages;

  const openModal = (index: number, section: "intro" | "reviews" | "couples" | "partnership") => {
    setSelectedSection(section);
    setSelectedImage(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setSelectedSection(null);
  };

  const goToPrevious = useCallback(() => {
    if (selectedImage !== null && selectedImage > 0) {
      setSelectedImage(selectedImage - 1);
    }
  }, [selectedImage]);

  const goToNext = useCallback(() => {
    if (selectedImage !== null && selectedImage < images.length - 1) {
      setSelectedImage(selectedImage + 1);
    }
  }, [selectedImage, images.length]);

  const isFirstImage = selectedImage === 0;
  const isLastImage = selectedImage === images.length - 1;

  // 키보드 이벤트 처리
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return;

      switch (e.key) {
        case "Escape":
          closeModal();
          break;
        case "ArrowLeft":
          e.preventDefault();
          if (!isFirstImage) {
            goToPrevious();
          }
          break;
        case "ArrowRight":
          e.preventDefault();
          if (!isLastImage) {
            goToNext();
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, goToPrevious, goToNext, isFirstImage, isLastImage]);

  return (
    <div className="min-h-screen bg-white">
      <Banner type="술개팅" />
      {/* 술개팅 소개 이미지 섹션 */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-white">
        <div className="container mx-auto max-w-7xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12 text-[#0e6d62]"
          >
            술개팅 소개
          </motion.h2>

          {/* 이미지 갤러리 */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {introImages.map((imagePath, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.02 }}
                className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group shadow-md hover:shadow-xl transition-shadow duration-300"
                onClick={() => openModal(index, "intro")}
              >
                <Image
                  src={imagePath}
                  alt={`술개팅 소개 ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 술개팅 소개 텍스트 섹션 */}
      <section className="py-8 sm:py-12 md:py-16 px-3 sm:px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          {/* 메인 타이틀 */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-[#0e6d62] text-center"
          >
            👉 참가자의 신분과 직업이 검증된 프리미엄 소개팅!
          </motion.h2>

          {/* 주요 특징 카드들 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 mb-4 sm:mb-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gray-50 rounded-lg p-4 sm:p-5 md:p-6 border border-gray-200"
            >
              <div className="flex items-start gap-3">
                <span className="text-3xl sm:text-4xl flex-shrink-0">💬</span>
                <div>
                  <h3 className="font-semibold text-base sm:text-lg mb-1 text-[#0e6d62]">1:1 릴레이 소개팅</h3>
                  <p className="text-sm sm:text-base text-gray-700">최대 8명의 이성을 만날 수 있어요!</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gray-50 rounded-lg p-4 sm:p-5 md:p-6 border border-gray-200"
            >
              <div className="flex items-start gap-3">
                <span className="text-3xl sm:text-4xl flex-shrink-0">💰</span>
                <div>
                  <h3 className="font-semibold text-base sm:text-lg mb-1 text-[#0e6d62]">합리적인 비용</h3>
                  <p className="text-sm sm:text-base text-gray-700">타 업체보다 더 긴 시간, 더 합리적인 비용</p>
                  <p className="text-xs sm:text-sm mt-1 text-gray-600">남자 4만원, 여자 3만원</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gray-50 rounded-lg p-4 sm:p-5 md:p-6 border border-gray-200"
            >
              <div className="flex items-start gap-3">
                <span className="text-3xl sm:text-4xl flex-shrink-0">🍷</span>
                <div>
                  <h3 className="font-semibold text-base sm:text-lg mb-1 text-[#0e6d62]">비주류 참여 가능</h3>
                  <p className="text-sm sm:text-base text-gray-700">술을 마시지 않더라도 참여 가능!</p>
                  <p className="text-xs sm:text-sm mt-1 text-gray-600">남자 3만원, 여자 2만원</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gray-50 rounded-lg p-4 sm:p-5 md:p-6 border border-gray-200"
            >
              <div className="flex items-start gap-3">
                <span className="text-3xl sm:text-4xl flex-shrink-0">📅</span>
                <div>
                  <h3 className="font-semibold text-base sm:text-lg mb-1 text-[#0e6d62]">참여자 혜택</h3>
                  <p className="text-sm sm:text-base text-gray-700">매월 개최되는 대규모 파티에도 무료로 참여 가능!</p>
                  <p className="text-xs sm:text-sm mt-1 text-gray-600">(성비 1.x:1)</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* 특징 설명 카드 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-gray-50 rounded-lg p-4 sm:p-5 md:p-6 border border-gray-200 mb-4 sm:mb-6"
          >
            <div className="flex items-start gap-3">
              <span className="text-3xl sm:text-4xl flex-shrink-0">💡</span>
              <div>
                <h3 className="font-semibold text-base sm:text-lg mb-2 text-[#0e6d62]">부담 없는 적당한 만남</h3>
                <p className="text-sm sm:text-base text-gray-700">
                  헌팅포차나 클럽처럼 가볍지도, 결혼정보회사처럼 무겁지도 않은 적당한 만남!
                </p>
              </div>
            </div>
          </motion.div>

          {/* 하단 강조 문구 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center"
          >
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-[#0e6d62] bg-gradient-to-r from-[#0e6d62] to-[#059669] bg-clip-text text-transparent">
              💚지금 로테이션 술소개팅에서 새로운 인연을 만들어 보세요!💚
            </p>
          </motion.div>
        </div>
      </section>

      {/* 제휴 알림 섹션 */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-white">
        <div className="container mx-auto max-w-7xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12 text-[#0e6d62]"
          >
            술개팅 X <span className="text-yellow-400">로멜로</span> 제휴
          </motion.h2>

          {/* 이미지 갤러리 - 한 줄에 4개 */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {partnershipImages.map((imagePath, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative w-full aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer group"
                onClick={() => openModal(index, "partnership")}
              >
                <Image
                  src={imagePath}
                  alt={`제휴 업체 ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 후기 섹션 */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
        <div className="container mx-auto max-w-7xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12 text-[#0e6d62]"
          >
            술개팅 후기
          </motion.h2>

          {/* 이미지 갤러리 */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {reviewImages.map((imagePath, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.02 }}
                className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group shadow-md hover:shadow-xl transition-shadow duration-300"
                onClick={() => openModal(index, "reviews")}
              >
                <Image
                  src={imagePath}
                  alt={`술개팅 후기 ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 실제 커플 후기 섹션 */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-white">
        <div className="container mx-auto max-w-7xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12 text-[#0e6d62]"
          >
            실제 커플 후기
          </motion.h2>

          {/* 이미지 갤러리 */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {coupleImages.map((imagePath, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.02 }}
                className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group shadow-md hover:shadow-xl transition-shadow duration-300"
                onClick={() => openModal(index, "couples")}
              >
                <Image
                  src={imagePath}
                  alt={`실제 커플 후기 ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 모달 */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            {/* 닫기 버튼 */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
              aria-label="닫기"
            >
              <svg
                className="w-8 h-8 sm:w-10 sm:h-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* 이전 버튼 */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              disabled={isFirstImage}
              className={`absolute left-4 transition-colors z-10 bg-black/50 rounded-full p-2 sm:p-3 ${
                isFirstImage
                  ? "text-white/30 cursor-not-allowed"
                  : "text-white hover:text-gray-300 cursor-pointer"
              }`}
              aria-label="이전 이미지"
            >
              <svg
                className="w-6 h-6 sm:w-8 sm:h-8"
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

            {/* 다음 버튼 */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              disabled={isLastImage}
              className={`absolute right-4 transition-colors z-10 bg-black/50 rounded-full p-2 sm:p-3 ${
                isLastImage
                  ? "text-white/30 cursor-not-allowed"
                  : "text-white hover:text-gray-300 cursor-pointer"
              }`}
              aria-label="다음 이미지"
            >
              <svg
                className="w-6 h-6 sm:w-8 sm:h-8"
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

            {/* 이미지 */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full h-full max-w-5xl max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[selectedImage]}
                alt={
                  selectedSection === "intro"
                    ? `술개팅 소개 ${selectedImage + 1}`
                    : selectedSection === "reviews" 
                    ? `술개팅 후기 ${selectedImage + 1}` 
                    : selectedSection === "couples"
                    ? `실제 커플 후기 ${selectedImage + 1}`
                    : `제휴 업체 ${selectedImage + 1}`
                }
                fill
                className="object-contain"
                sizes="90vw"
                priority
              />
            </motion.div>

            {/* 이미지 카운터 */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm sm:text-base bg-black/50 px-4 py-2 rounded-full">
              {selectedImage + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CTASection />
    </div>
  );
}


