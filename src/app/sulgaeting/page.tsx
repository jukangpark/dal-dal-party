"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Banner from "../components/Banner";
import CTASection from "../components/CTASection";
import ReviewsSection from "../components/ReviewsSection";
import sulgaetingReviews from "../constants/sulgaetingReviews";
import sulgaetingReviewStats from "../constants/sulgaetingReviewStats";

export default function SulgaetingPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [selectedSection, setSelectedSection] = useState<"intro" | "reviews" | "couples" | "partnership" | null>(null);

  // 1부터 6까지 이미지 경로 생성 (술개팅 소개)
  const introImages = Array.from({ length: 6 }, (_, i) => i + 1).map((num) => {
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
      
      {/* 소개 문구 섹션 */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-gradient-to-br from-blue-50 via-white to-emerald-50 relative overflow-hidden">
        {/* 배경 장식 */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto max-w-5xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 sm:mb-12"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-600 via-[#0e6d62] to-emerald-600 bg-clip-text text-transparent">
              로테이션 술 소개팅
            </h1>
            
            {/* 인원 배지 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-8"
            >
              <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-500/20 via-[#0e6d62]/20 to-emerald-500/20 backdrop-blur-sm rounded-full border-2 border-blue-300/50 shadow-lg">
                <span className="text-sm sm:text-base md:text-lg font-semibold text-gray-700">최소</span>
                <div className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-md">
                  <span className="text-lg sm:text-xl md:text-2xl font-bold text-white">4</span>
                  <span className="text-sm sm:text-base text-white/80">:</span>
                  <span className="text-lg sm:text-xl md:text-2xl font-bold text-white">4</span>
                </div>
                <span className="text-gray-500 text-lg sm:text-xl">~</span>
                <span className="text-sm sm:text-base md:text-lg font-semibold text-gray-700">최대</span>
                <div className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg shadow-md">
                  <span className="text-lg sm:text-xl md:text-2xl font-bold text-white">6</span>
                  <span className="text-sm sm:text-base text-white/80">:</span>
                  <span className="text-lg sm:text-xl md:text-2xl font-bold text-white">6</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* 첫 번째 문단 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl mb-6 sm:mb-8 border border-blue-100"
          >
            <div className="flex flex-col sm:flex-row items-start gap-2 sm:gap-4 mb-4">
              <div className="text-2xl sm:text-4xl md:text-5xl flex-shrink-0">⚡</div>
              <div className="flex-1 w-full sm:w-auto">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 text-[#0e6d62]">
                  바쁜 일상속 효율적인 소개팅을 원한다면!
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
                  현재 광주 소개팅 업체 중 <span className="font-bold text-[#0e6d62]">가장 긴 시간, 가장 저렴한 비용</span>으로 진행하고 있습니다.
                  <br className="hidden sm:block" />
                  <span className="font-semibold text-blue-600">1년동안 실제 결혼 커플만 2커플.</span>
                  <br className="hidden sm:block" />
                  <span className="font-semibold text-emerald-600">📍 상무지구에서 진행되어 이후 다른 약속 가기도 편리합니다!</span>
                  <br className="hidden sm:block" />
                  술개팅을 통해 다양한 인연을 만나보세요!
                </p>
              </div>
            </div>
          </motion.div>

          {/* 비용 어필 카드 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-gradient-to-r from-[#0e6d62] via-emerald-600 to-[#0e6d62] rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl mb-6 sm:mb-8 border-2 border-emerald-400/50"
          >
            <div className="text-center">
              <div className="inline-flex items-center justify-center gap-2 sm:gap-3 mb-4">
                <span className="text-4xl sm:text-5xl">💰</span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
                  술 한잔 1차 비용으로 로테이션 소개팅!
                </h2>
              </div>
              <p className="text-lg sm:text-xl md:text-2xl text-white/90 font-semibold leading-relaxed">
                일반적인 1차 술자리 비용으로<br className="sm:hidden" />
                <span className="hidden sm:inline"> </span>
                <span className="text-yellow-300 font-bold">최대 6명의 이성</span>과 만날 수 있는 기회!
              </p>
              <div className="mt-4 sm:mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-white">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 sm:px-6 py-2 sm:py-3 border border-white/30">
                  <p className="text-sm sm:text-base font-semibold">남자 5만원</p>
                  <p className="text-xs sm:text-sm text-white/80">(비주류 4만원)</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 sm:px-6 py-2 sm:py-3 border border-white/30">
                  <p className="text-sm sm:text-base font-semibold">여자 3만5천원</p>
                  <p className="text-xs sm:text-sm text-white/80">(비주류 2만5천원)</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 두 번째 문단 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gradient-to-br from-[#0e6d62]/10 via-emerald-50/50 to-blue-50/50 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl mb-6 sm:mb-8 border border-emerald-100"
          >
            <div className="flex flex-col sm:flex-row items-start gap-2 sm:gap-4 mb-4">
              <div className="text-2xl sm:text-4xl md:text-5xl flex-shrink-0">💚</div>
              <div className="flex-1 w-full sm:w-auto">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-[#0e6d62]">
                  너무 가볍지도 무겁지도 않게 부담없는 만남의 기회!
                </h2>
                
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl sm:text-3xl flex-shrink-0">✨</span>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      헌팅포차, 클럽처럼 가볍지도 않고<br className="sm:hidden" />
                      <span className="hidden sm:inline"> </span>결혼정보회사처럼 무겁지도 않은 기회
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className="text-2xl sm:text-3xl flex-shrink-0">💬</span>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      주선자 눈치 볼 필요 없는<br className="sm:hidden" />
                      <span className="hidden sm:inline"> </span>솔직하고 편한 자리
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className="text-2xl sm:text-3xl flex-shrink-0">🔒</span>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      신분이 보장된 남녀를 위한<br className="sm:hidden" />
                      <span className="hidden sm:inline"> </span>새로운 소개팅 문화
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 선정 기준 */}
          {/* 선정 기준 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl mb-6 sm:mb-8 border border-blue-100"
          >
            <div className="flex flex-col sm:flex-row items-start gap-2 sm:gap-4 mb-4">
              <div className="text-2xl sm:text-4xl md:text-5xl flex-shrink-0">🎯</div>
              <div className="flex-1 w-full sm:w-auto">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-[#0e6d62]">
                  선정 기준
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed mb-4">
                  엄격심사 통해 데이트상대 선별 보장
                </p>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="text-lg sm:text-xl font-bold text-[#0e6d62] flex-shrink-0">1.</span>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      외모, 직업, 나이 등을 신중하게 고려하여 선정
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-lg sm:text-xl font-bold text-[#0e6d62] flex-shrink-0">2.</span>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      신분 확인 (사진/이름/생년월일)
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-lg sm:text-xl font-bold text-[#0e6d62] flex-shrink-0">3.</span>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      종교, 주량, MBTI 등 체크 (술 못드시는 분들도 OK!)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 진행 방식 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gradient-to-br from-[#0e6d62]/10 via-emerald-50/50 to-blue-50/50 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl mb-6 sm:mb-8 border border-emerald-100"
          >
            <div className="flex flex-col sm:flex-row items-start gap-2 sm:gap-4 mb-4">
              <div className="text-2xl sm:text-4xl md:text-5xl flex-shrink-0">📋</div>
              <div className="flex-1 w-full sm:w-auto">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-[#0e6d62]">
                  진행 방식
                </h2>
                
                <div className="space-y-4 sm:space-y-6">
                  {/* 1. 도착 및 룰 설명 */}
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-[#0e6d62]">1. 도착 및 룰 설명</h3>
                    <div className="space-y-2 text-base sm:text-lg text-gray-700 leading-relaxed">
                      <p>방 번호를 사전에 알려드려요!</p>
                      <p>일찍 도착하신 분은 말씀해주세요 ㅎㅎ</p>
                      <p className="text-sm sm:text-base text-gray-600">(10분 전 입실 가능)</p>
                    </div>
                  </div>

                  {/* 2. 자율 대화 시간 */}
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-[#0e6d62]">2. 자율 대화 시간</h3>
                    <div className="space-y-2 text-base sm:text-lg text-gray-700 leading-relaxed">
                      <p>테이블별로 20분씩 자유롭게 대화합니다.</p>
                      <p>여성분들은 앉아 계시고 남성분들이 다음방으로 이동!</p>
                      <p>모든 테이블이 돌며 다양한 이성과 만남을 가집니다.</p>
                      <p>각 방 시간이 끝나면 직접 가서 말씀드리니 그때 마무리 하시면 됩니다!</p>
                    </div>
                  </div>

                  {/* 3. 자리 이동 */}
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-[#0e6d62]">3. 자리 이동</h3>
                    <div className="space-y-2 text-base sm:text-lg text-gray-700 leading-relaxed">
                      <p>여성분들은 자리에 앉아계시고, 남성분들은 진행자의 안내에 따라 다음 테이블로 이동합니다.</p>
                      <p>진행자는 자리만 섞어드린 후, 참가자분들이 불편하지 않도록 보이지 않는 곳에서 대기합니다.</p>
                    </div>
                  </div>

                  {/* 4. 매칭 및 종료 */}
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-[#0e6d62]">4. 매칭 및 종료</h3>
                    <div className="space-y-2 text-base sm:text-lg text-gray-700 leading-relaxed">
                      <p>모든 테이블을 돌면 프로그램은 종료됩니다.</p>
                      <p>종료 후 퇴실하시면서 카톡으로 맘에 드시는 분 번호를 말씀해주세요.</p>
                      <p>참가자분들이 서로 지목하면, 저희가 단톡방을 만들어드립니다.</p>
                      <div className="mt-3 p-3 sm:p-4 bg-white/60 rounded-lg border border-emerald-200">
                        <p className="font-semibold mb-2 text-[#0e6d62]">지목당하지 않더라도 본인을 지목한 분이 있다면 따로 알려드립니다!</p>
                        <p className="text-sm sm:text-base text-gray-600 mb-2">ex) 참여자A가 B와C를 지목했지만, B와C는 A를 지목하지 않은 상황이라고 가정해볼게요!</p>
                        <div className="space-y-1 text-sm sm:text-base text-gray-700">
                          <p>1) A 님 아무도 선택하지 않았습니다.</p>
                          <p>2) A 님 매칭이 되지 않으셨지만, D와 E가 A 님을 지목하셨습니다!</p>
                        </div>
                        <p className="text-sm sm:text-base text-gray-600 mt-2">이런식으로 모든 분께 투표 결과를 알려드립니다!</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 주의사항 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl border border-blue-100"
          >
            <div className="flex flex-col sm:flex-row items-start gap-2 sm:gap-4 mb-4">
              <div className="text-2xl sm:text-4xl md:text-5xl flex-shrink-0">⚠️</div>
              <div className="flex-1 w-full sm:w-auto">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-[#0e6d62]">
                  주의사항
                </h2>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-[#0e6d62] text-lg sm:text-xl flex-shrink-0 mt-1">•</span>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      이동할 때 개인 물품은 가지고 이동해주세요!
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-[#0e6d62] text-lg sm:text-xl flex-shrink-0 mt-1">•</span>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      안주는 여성분들이 사전에 원하시는 걸로 최대한 반영했습니다! 추가 주문 안됩니다!
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-[#0e6d62] text-lg sm:text-xl flex-shrink-0 mt-1">•</span>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      대화 도중 화장실 급하신 분들은 상대분께 양해를 구하고 다녀오시면 됩니다!
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-[#0e6d62] text-lg sm:text-xl flex-shrink-0 mt-1">•</span>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      메모지에 맘에 드신 이성 번호를 두 분 선택해주시고 입구에 있는 저에게 번호표와 함께 주시고 퇴장하시면 됩니다!
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-[#0e6d62] text-lg sm:text-xl flex-shrink-0 mt-1">•</span>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      24시간 내에 정리해서 결과 발송해드려요.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-[#0e6d62] text-lg sm:text-xl flex-shrink-0 mt-1">•</span>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      맘에 드신 이성이 있으시다면 꼭 번호를 기억해주세요!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
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
                  <p className="text-sm sm:text-base text-gray-700">최대 6명의 이성을 만날 수 있어요!</p>
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
                  <p className="text-xs sm:text-sm mt-1 text-gray-600">남자 5만원, 여자 3만5천원</p>
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
                  <p className="text-xs sm:text-sm mt-1 text-gray-600">남자 4만원, 여자 2만5천원</p>
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

      {/* 후기 섹션 */}
      <ReviewsSection 
        title="술개팅 후기"
        reviews={sulgaetingReviews}
        reviewStats={sulgaetingReviewStats}
        statsText="✅ 50회 300명 참여"
      />

      <CTASection />
    </div>
  );
}


