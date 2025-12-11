"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Banner from "../components/Banner";
import IntroSection from "../components/IntroSection";
import CostSection from "../components/CostSection";
import ReviewsSection from "../components/ReviewsSection";
import GallerySection from "../components/GallerySection";
import CTASection from "../components/CTASection";

export default function HexagonPartyPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // 1부터 6까지 이미지 경로 생성 (육각형파티 소개)
  const introImages = Array.from({ length: 6 }, (_, i) => i + 1).map((num) => {
    return `/육각형파티_소개/${num}.png`;
  });

  const openModal = (index: number) => {
    setSelectedImage(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const goToPrevious = useCallback(() => {
    if (selectedImage !== null && selectedImage > 0) {
      setSelectedImage(selectedImage - 1);
    }
  }, [selectedImage]);

  const goToNext = useCallback(() => {
    if (selectedImage !== null && selectedImage < introImages.length - 1) {
      setSelectedImage(selectedImage + 1);
    }
  }, [selectedImage, introImages.length]);

  const isFirstImage = selectedImage === 0;
  const isLastImage = selectedImage === introImages.length - 1;

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
      <Banner type="육각형 파티" />
      
      {/* 육각형파티 소개 영상 섹션 */}
      <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 bg-white">
        <div className="container mx-auto max-w-4xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-6 sm:mb-8 text-[#0e6d62]"
          >
            육각형파티 소개 영상
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative w-full rounded-lg overflow-hidden shadow-lg"
          >
            <video
              src="/육각형남녀파티영상.mp4"
              autoPlay
              muted
              loop
              playsInline
              controls
              className="w-full h-auto"
            >
              브라우저가 비디오 태그를 지원하지 않습니다.
            </video>
          </motion.div>
        </div>
      </section>

      {/* 파티 소개 섹션 */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-gradient-to-br from-blue-50 via-white to-emerald-50 relative overflow-hidden">
        {/* 배경 장식 */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto max-w-5xl relative z-10">
          {/* 첫 번째 문단 - 문제점 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl mb-6 sm:mb-8 border border-blue-100"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="text-4xl sm:text-5xl flex-shrink-0 pt-1">💭</div>
              <div className="flex-1">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-[#0e6d62]">
                  이런 분들을 위해 준비했어요
                </h2>
                <div className="space-y-3 sm:space-y-4">
                  <div className="p-4 sm:p-5 bg-gradient-to-r from-red-50 to-red-100 rounded-xl border-2 border-red-300 shadow-md hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl sm:text-3xl flex-shrink-0">❌</span>
                      <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                        <span className="font-bold text-red-600">보통의 파티:</span> 아무나 다와서 시간만 보내는 자리, 게임이 많아서 기빨렸던 분들
                      </p>
                    </div>
                  </div>
                  <div className="p-4 sm:p-5 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl border-2 border-orange-300 shadow-md hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl sm:text-3xl flex-shrink-0">⚠️</span>
                      <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                        <span className="font-bold text-orange-600">로테이션 소개팅:</span> 1인당 볼 수 있는 시간은 짧고 매칭되지 않으면 기회가 없어서 힘든 분들
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 두 번째 문단 - 육각형 파티 특징 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gradient-to-br from-[#0e6d62]/10 via-emerald-50/50 to-blue-50/50 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl mb-6 sm:mb-8 border border-emerald-100"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="text-4xl sm:text-5xl flex-shrink-0 pt-1">✨</div>
              <div className="flex-1">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-[#0e6d62]">
                  육각형 파티는 다릅니다
                </h2>
                
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl sm:text-3xl flex-shrink-0">🔒</span>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      <span className="font-bold text-[#0e6d62]">외모/키(몸매)/재력/직업</span> 중 2개 이상 통과한 사람만 올 수 있는 승인제 파티
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className="text-2xl sm:text-3xl flex-shrink-0">💬</span>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      최소한의 아이스브레이킹 외 자연스러운 대화 위주 파티
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className="text-2xl sm:text-3xl flex-shrink-0">📱</span>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      인스타/연락처 교환 대놓고 유도
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 세 번째 문단 - 특별 혜택 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl border border-blue-100"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="text-4xl sm:text-5xl flex-shrink-0 pt-1">🎁</div>
              <div className="flex-1">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-[#0e6d62]">
                  특별 혜택
                </h2>
                
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl sm:text-3xl flex-shrink-0">💕</span>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      육각형 파티는 잘 안되더라도 <span className="font-bold text-[#0e6d62]">여성분 술개팅 할인 이벤트</span> 및 <span className="font-bold text-[#0e6d62]">별도 소개팅</span> 해드립니다!
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <span className="text-2xl sm:text-3xl flex-shrink-0">💌</span>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      대문자 I를 위해 호스트가 다음날 직접 의사 전달도 해줘요!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* 육각형파티 소개 이미지 섹션 */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-white">
        <div className="container mx-auto max-w-7xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12 text-[#0e6d62]"
          >
            육각형파티 소개
          </motion.h2>

          {/* 이미지 갤러리 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            {introImages.map((imagePath, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.02 }}
                className="relative aspect-[9/16] rounded-lg overflow-hidden cursor-pointer group shadow-md hover:shadow-xl transition-shadow duration-300"
                onClick={() => openModal(index)}
              >
                <Image
                  src={imagePath}
                  alt={`육각형파티 소개 ${index + 1}`}
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

      <IntroSection />
      <CostSection />
      <ReviewsSection title="육각형파티 후기" />
      <GallerySection />

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
                src={introImages[selectedImage]}
                alt={`육각형파티 소개 ${selectedImage + 1}`}
                fill
                className="object-contain"
                sizes="90vw"
                priority
              />
            </motion.div>

            {/* 이미지 카운터 */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm sm:text-base bg-black/50 px-4 py-2 rounded-full">
              {selectedImage + 1} / {introImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CTASection />
    </div>
  );
}

