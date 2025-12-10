"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import CTASection from "./components/CTASection";

export default function Home() {
  const router = useRouter();

  const partyTypes = [
    {
      title: "술개팅",
      path: "/sulgaeting",
      tagline: "신분과 직업이 검증된 프리미엄 소개팅",
      description: "1:1 릴레이 소개팅으로 최대 8명의 이성을 만날 수 있는 특별한 경험",
      features: [
        "신분·직업 검증 완료",
        "1:1 릴레이 소개팅",
        "합리적인 비용",
        "비주류 참여 가능",
      ],
      color: "from-blue-600 to-blue-800",
    },
    {
      title: "육각형 파티",
      path: "/hexagon-party",
      tagline: "아무나 올 수 없는 승인제 파티",
      description: "외모·키·재력·직업 중 두 가지 이상 자신 있는 분만 참여 가능한 프리미엄 파티",
      features: [
        "승인제 시스템",
        "6각형 컨셉",
        "고정 자리 없음",
        "전체 자리 섞기",
      ],
      color: "from-[#0e6d62] to-[#059669]",
    },
    {
      title: "별별파티",
      path: "/star-party",
      tagline: "다양한 테마의 특별한 파티",
      description: "매달 개최되는 대규모 파티부터 특별 테마 파티까지, 다양한 만남의 기회",
      features: [
        "다양한 테마",
        "대규모 파티",
        "특별 이벤트",
        "자유로운 분위기",
      ],
      color: "from-purple-600 to-pink-600",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero 섹션 */}
      <section className="relative w-full h-screen sm:h-[70vh] md:h-[80vh] flex items-center justify-center text-white overflow-hidden">
        {/* 배경 비디오 */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/육각형남녀파티영상.mp4" type="video/mp4" />
        </video>
        {/* 오버레이 */}
        <div className="absolute inset-0 bg-black/70" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6">
            새로운 인연을 만나는 곳
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 text-white/90">
            검증된 참가자들과 함께하는 프리미엄 소개팅 & 파티
          </p>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            onClick={() => router.push("/reservation")}
            className="px-8 sm:px-12 py-3 sm:py-4 bg-white text-[#0e6d62] font-bold text-lg sm:text-xl rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
          >
            지금 예약하기
          </motion.button>
        </motion.div>
      </section>
      

      {/* 메인 카피 섹션 */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 text-[#0e6d62]">
              주변에 괜찮은 사람들이 없다면 여기입니다!
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
              신분과 직업이 검증된 참가자들만 모이는 프리미엄 소개팅 플랫폼
              <br className="hidden sm:block" />
              <span className="text-[#0e6d62] font-semibold">술개팅, 육각형 파티, 별별파티</span>로
              <br className="hidden sm:block" />
              진짜 괜찮은 사람을 만나보세요
            </p>
          </motion.div>
        </div>
      </section>

      {/* 파티 타입 소개 섹션 */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 px-3 sm:px-4 md:px-6 bg-gray-50">
        <div className="container mx-auto max-w-7xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 sm:mb-12 md:mb-16 text-[#0e6d62] px-2"
          >
            세 가지 파티, 하나의 목표
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
            {partyTypes.map((party, index) => (
              <motion.div
                key={party.path}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer"
                onClick={() => router.push(party.path)}
              >
                {/* 헤더 */}
                <div className={`bg-gradient-to-br ${party.color} p-4 sm:p-6 md:p-8 text-white`}>
                  <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3">
                    {party.title}
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white/90 leading-relaxed">
                    {party.tagline}
                  </p>
                </div>

                {/* 본문 */}
                <div className="p-4 sm:p-6 md:p-8">
                  <p className="text-xs sm:text-sm md:text-base text-gray-700 mb-4 sm:mb-6 md:mb-8 leading-relaxed">
                    {party.description}
                  </p>

                  {/* 특징 리스트 */}
                  <ul className="space-y-2 sm:space-y-3 md:space-y-4 mb-4 sm:mb-6 md:mb-8">
                    {party.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 sm:gap-3">
                        <span className="text-[#0e6d62] text-lg sm:text-xl md:text-2xl flex-shrink-0">✓</span>
                        <span className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* 버튼 */}
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(party.path);
                      }}
                      className={`flex-1 px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 bg-gradient-to-br ${party.color} text-white font-semibold rounded-lg hover:opacity-90 transition-opacity duration-300 text-xs sm:text-sm md:text-base whitespace-nowrap cursor-pointer`}
                    >
                      자세히 보기
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push("/reservation");
                      }}
                      className="flex-1 px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 bg-gray-100 text-[#0e6d62] font-semibold rounded-lg hover:bg-gray-200 transition-colors duration-300 text-xs sm:text-sm md:text-base whitespace-nowrap"
                    >
                      예약하기
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 핵심 가치 섹션 */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 text-[#0e6d62]">
              왜 우리를 선택해야 할까요?
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              {
                icon: "🔒",
                title: "검증된 참가자",
                description: "신분과 직업이 검증된 참가자들만 모입니다",
              },
              {
                icon: "⭐",
                title: "프리미엄 파티",
                description: "아무나 올 수 없는 승인제 시스템",
              },
              {
                icon: "💬",
                title: "자연스러운 만남",
                description: "강제적인 게임 없이 대화 중심의 편안한 분위기",
              },
              {
                icon: "🎉",
                title: "다양한 선택",
                description: "술개팅, 육각형 파티, 별별파티 중 선택 가능",
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 sm:p-8 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-300"
              >
                <div className="text-5xl sm:text-6xl mb-4 sm:mb-6">{value.icon}</div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-[#0e6d62]">
                  {value.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <CTASection />
    </div>
  );
}
