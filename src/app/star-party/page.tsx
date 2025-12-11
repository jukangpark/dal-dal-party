"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Banner from "../components/Banner";
import CTASection from "../components/CTASection";

export default function StarPartyPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [selectedSection, setSelectedSection] = useState<"intro" | "reviews" | null>(null);

  // 1부터 11까지 이미지 경로 생성 (별별파티 소개)
  const introImages = Array.from({ length: 11 }, (_, i) => i + 1).map((num) => {
    // 확장자 확인 (png 또는 jpeg)
    return `/별별파티_소개/${num}.png`;
  });

  // 1부터 20까지 이미지 경로 생성 (별별파티 후기)
  const reviewImages = Array.from({ length: 20 }, (_, i) => i + 1).map((num) => {
    return `/별별파티 후기/${num}.png`;
  });

  // 현재 선택된 이미지 배열
  const currentImages = selectedSection === "intro" ? introImages : 
                       selectedSection === "reviews" ? reviewImages : [];

  const images = currentImages;

  const openModal = (index: number, section: "intro" | "reviews") => {
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
      <Banner type="별별파티" />
      
      {/* 소개 문구 섹션 */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-gradient-to-br from-purple-50 via-white to-pink-50 relative overflow-hidden">
        {/* 배경 장식 */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-purple-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto max-w-5xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 sm:mb-12"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-purple-600 via-[#0e6d62] to-pink-600 bg-clip-text text-transparent">
              소개
            </h1>
          </motion.div>

          {/* 첫 번째 문단 - 소개팅은 너무 부담스럽다면? */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl mb-6 sm:mb-8 border border-purple-100"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="text-4xl sm:text-5xl flex-shrink-0 pt-1">🎉</div>
              <div className="flex-1">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 text-[#0e6d62]">
                  소개팅은 너무 부담스럽다면? 가볍게 즐기는 별별파티!
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
                  소개팅보다 부담 없고, 감주나 헌팅포차보다 자유롭게!
                  <br className="hidden sm:block" />
                  나이, 이름, 직업만 기입하면 누구나 참석 가능!
                  <br className="hidden sm:block" />
                  <span className="font-bold text-[#0e6d62]">광주에서 가장 핫하고 편안한 파티, 별별파티에 오세요!</span>
                </p>
              </div>
            </div>
          </motion.div>

          {/* 두 번째 문단 - 단돈 만원 */}
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
                  단돈 만원 한장으로 즐기는 자유롭고 즐거운 파티!
                </h2>
              </div>
              <p className="text-lg sm:text-xl md:text-2xl text-white/90 font-semibold leading-relaxed mb-4">
                참가비는 단돈 <span className="text-yellow-300 font-bold">만 원!</span> (술값 제외) 자유로운 분위기를 타고, 편하게 즐기세요!
              </p>
              <div className="space-y-2 text-white/90">
                <p className="text-base sm:text-lg">인원 제한 없이 누구나 부담없이 참석 가능!</p>
                <p className="text-sm sm:text-base text-white/80">* 약 2시간 동안 진행합니다.</p>
              </div>
            </div>
          </motion.div>

          {/* 간단한 안주, 술무제한 카드 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl mb-6 sm:mb-8 border-2 border-blue-400/50"
          >
            <div className="text-center">
              <div className="inline-flex items-center justify-center gap-2 sm:gap-3 mb-4">
                <span className="text-4xl sm:text-5xl">🍻</span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
                  간단한 안주, 술무제한!
                </h2>
              </div>
              <p className="text-lg sm:text-xl md:text-2xl text-white/90 font-semibold leading-relaxed">
                편하게 즐기실 수 있도록<br className="sm:hidden" />
                <span className="hidden sm:inline"> </span>
                <span className="text-yellow-300 font-bold">간단한 안주와 무제한 술</span>을 제공합니다!
              </p>
              <div className="mt-4 sm:mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-white">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 sm:px-6 py-2 sm:py-3 border border-white/30">
                  <p className="text-sm sm:text-base font-semibold">🍺 소주, 맥주 무제한</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 sm:px-6 py-2 sm:py-3 border border-white/30">
                  <p className="text-sm sm:text-base font-semibold">🍽️ 간단한 안주 제공</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 세 번째 문단 - 자리도 자유롭게 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gradient-to-br from-[#0e6d62]/10 via-emerald-50/50 to-purple-50/50 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl mb-6 sm:mb-8 border border-emerald-100"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="text-4xl sm:text-5xl flex-shrink-0 pt-1">🔄</div>
              <div className="flex-1">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-[#0e6d62]">
                  자리도 자유롭게 섞고 번호 교환도 자유롭게!
                </h2>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl sm:text-3xl flex-shrink-0">✨</span>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      소맥파티에서는 자리가 자유롭게 섞이고, 번호 교환도 눈치 보지 않고 가능!
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl sm:text-3xl flex-shrink-0">🎯</span>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      분위기를 보고 진행자가 자리를 섞어주는 센스까지!
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl sm:text-3xl flex-shrink-0">😊</span>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      여러분은 편하게 즐기기만 하세요!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 네 번째 문단 - 하나라도 해당된다면? */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl mb-6 sm:mb-8 border border-purple-100"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="text-4xl sm:text-5xl flex-shrink-0 pt-1">✅</div>
              <div className="flex-1">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-[#0e6d62]">
                  하나라도 해당된다면? 무조건 참여하세요!
                </h2>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-[#0e6d62] text-lg sm:text-xl flex-shrink-0 mt-1">✓</span>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      회사와 집만 반복되는 지루한 워커홀릭
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-[#0e6d62] text-lg sm:text-xl flex-shrink-0 mt-1">✓</span>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      맘에 쏙드는 괜찮은 이성을 만나고 싶은 분
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-[#0e6d62] text-lg sm:text-xl flex-shrink-0 mt-1">✓</span>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      격식만 갖춰진 와인모임 등에 실망하신 분
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-[#0e6d62] text-lg sm:text-xl flex-shrink-0 mt-1">✓</span>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      자연스러운 자리에서 이성을 만나고 싶은 분
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-[#0e6d62] text-lg sm:text-xl flex-shrink-0 mt-1">✓</span>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      다양한 직업군의 사람들과 대화하고 싶은 분
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-[#0e6d62] text-lg sm:text-xl flex-shrink-0 mt-1">✓</span>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      와인, 양주보다는 소주, 맥주가 편안하고 좋은 분
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-[#0e6d62] text-lg sm:text-xl flex-shrink-0 mt-1">✓</span>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      타 모임에서 생각보다 즐겁지 않아서 실망하신 분
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 다섯 번째 문단 - 소맥파티 Point 정리 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-gradient-to-br from-[#0e6d62]/10 via-emerald-50/50 to-purple-50/50 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl mb-6 sm:mb-8 border border-emerald-100"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="text-4xl sm:text-5xl flex-shrink-0 pt-1">⭐</div>
              <div className="flex-1">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-[#0e6d62]">
                  소맥파티 Point 정리!
                </h2>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-[#0e6d62] text-lg sm:text-xl flex-shrink-0 mt-1">✓</span>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      참가비 만 원으로 2시간 동안 부담 없이 즐기기
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-[#0e6d62] text-lg sm:text-xl flex-shrink-0 mt-1">✓</span>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      자유롭게 자리를 섞고, 번호 교환도 눈치 볼 필요 X
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-[#0e6d62] text-lg sm:text-xl flex-shrink-0 mt-1">✓</span>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      성비 맞추고 기본 정보 확인으로 안심할 수 있는 파티
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-[#0e6d62] text-lg sm:text-xl flex-shrink-0 mt-1">✓</span>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      2차는 원할 때 자유롭게! N분의 1로 부담 없는 즐거움
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-[#0e6d62] text-lg sm:text-xl flex-shrink-0 mt-1">✓</span>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      소개팅보다 부담 없고, 감주•헌팅보다 자유로운 분위기
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 여섯 번째 문단 - 2차도 자유롭게 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl mb-6 sm:mb-8 border border-purple-100"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="text-4xl sm:text-5xl flex-shrink-0 pt-1">🍻</div>
              <div className="flex-1">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-[#0e6d62]">
                  2차도 자유롭게! 개별 약속도 OK!
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
                  2차는 원한다면 참가비는 N분의 1로 진행하며, 맘에 드는 상대가 있다면 자유롭게 떠날 수 있습니다!
                  <br className="hidden sm:block" />
                  <span className="font-semibold text-[#0e6d62]">장소는 파티룸 또는 상무지구 인근 술집!</span>
                </p>
              </div>
            </div>
          </motion.div>

          {/* 일곱 번째 문단 - 광주/전남/전북에서만 가능한 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-gradient-to-br from-[#0e6d62]/10 via-emerald-50/50 to-purple-50/50 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl mb-6 sm:mb-8 border border-emerald-100"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="text-4xl sm:text-5xl flex-shrink-0 pt-1">🌟</div>
              <div className="flex-1">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-[#0e6d62]">
                  광주/전남/전북에서만 가능한 차별화된 특별한 파티!
                </h2>
                <div className="space-y-3 sm:space-y-4">
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                    광주에는 헌팅포차나 클럽은 많지만, 이렇게 자유롭고 부담 없는 파티는 소맥파티가 유일합니다!
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl sm:text-3xl flex-shrink-0">🔒</span>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      자유로운 합석이 가능하고, 나이와 직업이 검증되니 안심하고 즐기세요!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 여덟 번째 문단 - 참가비는 어떻게 되나요? */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl border border-purple-100"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="text-4xl sm:text-5xl flex-shrink-0 pt-1">💳</div>
              <div className="flex-1">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-[#0e6d62]">
                  참가비는 어떻게 되나요?
                </h2>
                <div className="space-y-4 sm:space-y-5">
                  <div className="p-4 sm:p-5 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-xl border border-emerald-200">
                    <p className="text-base sm:text-lg font-semibold text-[#0e6d62] mb-2">
                      술개팅 참여자
                    </p>
                    <p className="text-base sm:text-lg text-gray-700">
                      술값 N분의 1, 참여비 무료
                    </p>
                  </div>
                  <div className="p-4 sm:p-5 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl border border-purple-200">
                    <p className="text-base sm:text-lg font-semibold text-[#0e6d62] mb-2">
                      그 외
                    </p>
                    <p className="text-base sm:text-lg text-gray-700">
                      술값 N분의 1, 참여비 2만원
                    </p>
                  </div>
                  <div className="mt-4 p-4 sm:p-5 bg-yellow-50 rounded-xl border border-yellow-200">
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                      <span className="font-semibold text-[#0e6d62]">술개팅 참여하지 않으셨던 분들은</span>
                      <br />
                      네이버 폼 필수로 작성하셔야 참여 가능합니다!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* 별별파티 소개 이미지 섹션 */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-white">
        <div className="container mx-auto max-w-7xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12 text-[#0e6d62]"
          >
            별별파티 소개
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
                  alt={`별별파티 소개 ${index + 1}`}
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
            별별파티 후기
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
                  alt={`별별파티 후기 ${index + 1}`}
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
                alt={selectedSection === "intro" ? `별별파티 소개 ${selectedImage + 1}` : `별별파티 후기 ${selectedImage + 1}`}
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

