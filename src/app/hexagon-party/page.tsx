"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Banner from "../components/Banner";
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
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-[#0e6d62]">
                이런 분들을 위해 준비했어요
              </h2>
              
              {/* 보통의 파티 섹션 */}
              <div className="mb-6 sm:mb-8">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-black mb-4">보통의 파티</h3>
                <div className="space-y-3 sm:space-y-4">
                  {/* 참여자1 말풍선 */}
                  <div className="flex items-center gap-4 sm:gap-5">
                    <div className="text-lg sm:text-xl font-semibold text-gray-700 flex-shrink-0">👤</div>
                    <div className="relative flex-1">
                      <div className="bg-gray-50 rounded-2xl sm:rounded-3xl px-4 sm:px-5 py-3 sm:py-4 shadow-md border border-gray-200 relative">
                        <p className="text-sm sm:text-base text-gray-800 leading-relaxed">
                          사람은 많은데 맘에 드는 사람이 없어요. ㅠㅠ
                        </p>
                        {/* 말풍선 꼬리 */}
                        <div className="absolute -left-3 top-4 w-0 h-0 border-t-[12px] border-t-transparent border-r-[12px] border-r-gray-200 border-b-[12px] border-b-transparent"></div>
                        <div className="absolute -left-2 top-4 w-0 h-0 border-t-[10px] border-t-transparent border-r-[10px] border-r-gray-50 border-b-[10px] border-b-transparent"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* 참여자2 말풍선 */}
                  <div className="flex items-center gap-4 sm:gap-5">
                    <div className="text-lg sm:text-xl font-semibold text-gray-700 flex-shrink-0">👤</div>
                    <div className="relative flex-1">
                      <div className="bg-gray-50 rounded-2xl sm:rounded-3xl px-4 sm:px-5 py-3 sm:py-4 shadow-md border border-gray-200 relative">
                        <p className="text-sm sm:text-base text-gray-800 leading-relaxed">
                          게임이 너무 많아서 기빨려요..
                        </p>
                        {/* 말풍선 꼬리 */}
                        <div className="absolute -left-3 top-4 w-0 h-0 border-t-[12px] border-t-transparent border-r-[12px] border-r-gray-200 border-b-[12px] border-b-transparent"></div>
                        <div className="absolute -left-2 top-4 w-0 h-0 border-t-[10px] border-t-transparent border-r-[10px] border-r-gray-50 border-b-[10px] border-b-transparent"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 로테이션 소개팅 섹션 */}
              <div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-black mb-4">로테이션 소개팅</h3>
                <div className="space-y-3 sm:space-y-4">
                  {/* 참여자1 말풍선 */}
                  <div className="flex items-center gap-4 sm:gap-5">
                    <span className="text-lg sm:text-xl font-semibold text-gray-700 flex-shrink-0">👤</span>
                    <div className="relative flex-1">
                      <div className="bg-gray-50 rounded-2xl sm:rounded-3xl px-4 sm:px-5 py-3 sm:py-4 shadow-md border border-gray-200 relative">
                        <p className="text-sm sm:text-base text-gray-800 leading-relaxed">
                          대화 시간이 정말 짧아서 정신 없어요.
                        </p>
                        {/* 말풍선 꼬리 */}
                        <div className="absolute -left-3 top-4 w-0 h-0 border-t-[12px] border-t-transparent border-r-[12px] border-r-gray-200 border-b-[12px] border-b-transparent"></div>
                        <div className="absolute -left-2 top-4 w-0 h-0 border-t-[10px] border-t-transparent border-r-[10px] border-r-gray-50 border-b-[10px] border-b-transparent"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* 참여자2 말풍선 */}
                  <div className="flex items-center gap-4 sm:gap-5">
                    <span className="text-lg sm:text-xl font-semibold text-gray-700 flex-shrink-0">👤</span>
                    <div className="relative flex-1">
                      <div className="bg-gray-50 rounded-2xl sm:rounded-3xl px-4 sm:px-5 py-3 sm:py-4 shadow-md border border-gray-200 relative">
                        <p className="text-sm sm:text-base text-gray-800 leading-relaxed">
                          매칭 안되면 허무해요..
                        </p>
                        {/* 말풍선 꼬리 */}
                        <div className="absolute -left-3 top-4 w-0 h-0 border-t-[12px] border-t-transparent border-r-[12px] border-r-gray-200 border-b-[12px] border-b-transparent"></div>
                        <div className="absolute -left-2 top-4 w-0 h-0 border-t-[10px] border-t-transparent border-r-[10px] border-r-gray-50 border-b-[10px] border-b-transparent"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 비용 어필 카드 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl mb-6 sm:mb-8 border-2 border-purple-200"
          >
            <div className="text-center mb-6 sm:mb-8">
              <div className="inline-flex items-center justify-center gap-2 sm:gap-3 mb-4">
                <span className="text-4xl sm:text-5xl">💰</span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-purple-600">
                  광주에서 가장 낮은 비용
                </h2>
              </div>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-700 font-semibold leading-relaxed mb-4 sm:mb-6">
                육각형 파티에서 새로운 인연을 만나보세요!
              </p>
              <div className="mt-4 sm:mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6">
                <div className="bg-purple-50 rounded-xl sm:rounded-2xl px-5 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-5 md:py-6 border-3 border-purple-400 shadow-lg">
                  <p className="text-base sm:text-lg md:text-xl font-semibold text-gray-700 mb-1 sm:mb-2">남자</p>
                  <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-purple-600 leading-none">
                    39,000원
                  </p>
                </div>
                <div className="bg-purple-50 rounded-xl sm:rounded-2xl px-5 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-5 md:py-6 border-3 border-purple-400 shadow-lg">
                  <p className="text-base sm:text-lg md:text-xl font-semibold text-gray-700 mb-1 sm:mb-2">여자</p>
                  <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-purple-600 leading-none">
                    29,000원
                  </p>
                </div>
              </div>
              <p className="mt-4 sm:mt-6 text-base sm:text-lg text-gray-600 font-medium">
                (+1만원으로 애프터 파티 2시간 참여 가능)
              </p>
            </div>

            {/* 안내사항 */}
            <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t-2 border-purple-100">
              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4 sm:p-5 mb-6">
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  <strong className="text-purple-700">안내사항:</strong> 신청 후 운영진 심사 후 승인되신분께만 장소 및 입금 안내가 개별 발송됩니다. 
                  신청 후 하루 이내 결과 안내 예정입니다.
                </p>
              </div>

              {/* 환불 규정 및 특이사항 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {/* 환불규정 */}
                <div className="bg-gray-50 rounded-lg p-4 sm:p-5 md:p-6 border border-gray-200">
                  <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-purple-600 flex items-center gap-2">
                  <span>💜</span>
                    <span>환불규정</span>
                  </h3>
                  <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 font-bold mt-0.5 flex-shrink-0">✔️</span>
                      <span>노쇼시 어떠한 경우에도 환불 불가</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 font-bold mt-0.5 flex-shrink-0">✔️</span>
                      <span>취소 및 환불은 7일 전까지 가능</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 font-bold mt-0.5 flex-shrink-0">✔️</span>
                      <span>참가일 5일전 이상 50% 공제 후 환불</span>
                    </li>
                  </ul>
                </div>

                {/* 특이사항 */}
                <div className="bg-gray-50 rounded-lg p-4 sm:p-5 md:p-6 border border-gray-200">
                  <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-purple-600 flex items-center gap-2">
                    <span>💜</span>
                    <span>특이사항</span>
                  </h3>
                  <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 font-bold mt-0.5 flex-shrink-0">✔️</span>
                      <span>호스트의 확정 공지를 받은 분들에 한해서만 참가 가능</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 font-bold mt-0.5 flex-shrink-0">✔️</span>
                      <span>참가 인원 미달 시 일정이 변경 가능</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 font-bold mt-0.5 flex-shrink-0">✔️</span>
                      <span>특별한 경우 세부적인 일정 및 장소 등은 변경 가능</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 font-bold mt-0.5 flex-shrink-0">✔️</span>
                      <span>진행시간에 늦으면 당일 참여가 불가능</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 font-bold mt-0.5 flex-shrink-0">✔️</span>
                      <span>모임 진행 중 본인 부주의로 인한 사고는 책임지지 않습니다.</span>
                    </li>
                  </ul>
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
            <div className="flex flex-col sm:flex-row items-start gap-2 sm:gap-4 mb-4">
              <div className="text-2xl sm:text-4xl md:text-5xl flex-shrink-0 pt-1">✨</div>
              <div className="flex-1 w-full sm:w-auto">
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
                      간단한 아이스 브레이킹, 자연스러운 연락처 교환 타이밍, 자연스로운 대화 위주 파티
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className="text-2xl sm:text-3xl flex-shrink-0">📱</span>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      인스타/연락처 교환 타이밍 자연스럽게 드려요!
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
            <div className="flex flex-col sm:flex-row items-start gap-2 sm:gap-4 mb-4">
              <div className="text-2xl sm:text-4xl md:text-5xl flex-shrink-0 pt-1">🎁</div>
              <div className="flex-1 w-full sm:w-auto">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-[#0e6d62]">
                  특별 혜택
                </h2>
                
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl sm:text-3xl flex-shrink-0">💕</span>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                    육각형 파티 참여하신 분들은 <span className="font-bold text-[#0e6d62]">술개팅 할인 이벤트</span> 및 <span className="font-bold text-[#0e6d62]">별도 1:1 소개팅</span> 해드려요! (여성분 한정)
                    
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <span className="text-2xl sm:text-3xl flex-shrink-0">💌</span>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                    연락처 교환이 어려운 대문자 <b>I</b> 를 위한 혜택! <br/>다음날 마음에 드는 <span className="font-bold text-[#0e6d62]">1명을 호스트에게 연락주면 상대방에게 의사 물어봐드려요!</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
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

