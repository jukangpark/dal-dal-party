"use client";

import { useRouter } from "next/navigation";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";
import CTASection from "./components/CTASection";

// 숫자 카운트업 컴포넌트
function CountUpNumber({ value }: { value: number }) {
  const count = useMotionValue(0);
  const spring = useSpring(count, {
    damping: 60,
    stiffness: 100,
  });
  const rounded = useTransform(spring, (latest) => Math.round(latest));

  useEffect(() => {
    count.set(value);
  }, [count, value]);

  return <motion.span>{rounded}</motion.span>;
}

export default function Home() {
  const router = useRouter();

  const partyTypes = [
    {
      title: "술개팅",
      path: "/sulgaeting",
      tagline: "신분과 직업이 검증된 프리미엄 소개팅",
      description: "1:1 릴레이 소개팅으로 최대 6명의 이성을 만날 수 있는 특별한 경험",
      features: [
        "신분·직업 검증 완료",
        "1:1 릴레이 소개팅",
        "광주 최저가",
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
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push("/reservation");
                    }}
                    className={`w-full px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 bg-gradient-to-br ${party.color} text-white font-semibold rounded-lg hover:opacity-90 transition-opacity duration-300 text-xs sm:text-sm md:text-base whitespace-nowrap cursor-pointer`}
                  >
                    예약하기
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 통계 섹션 */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
        {/* 배경 장식 */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#0e6d62] rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#059669] rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16 md:mb-20"
          >
            <motion.h2 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-[#0e6d62] via-[#059669] to-[#047857] bg-clip-text text-transparent"
            >
              누적 참가자수
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-gray-600"
            >
              지금까지 함께한 모든 순간들
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 sm:gap-6 md:gap-8">
            {[
              {
                label: "술개팅",
                value: 540,
                icon: "🍷",
                gradient: "from-blue-500 to-blue-700",
                bgGradient: "from-blue-50 to-blue-100",
              },
              {
                label: "육각형파티",
                value: 40,
                icon: "✨",
                gradient: "from-[#0e6d62] to-[#059669]",
                bgGradient: "from-emerald-50 to-emerald-100",
              },
              {
                label: "별별파티",
                value: 600,
                icon: "⭐",
                gradient: "from-purple-500 to-pink-600",
                bgGradient: "from-purple-50 to-pink-100",
              },
              {
                label: "커플매칭수",
                value: 345,
                icon: "💕",
                gradient: "from-pink-500 to-rose-600",
                bgGradient: "from-pink-50 to-rose-100",
              },
              {
                label: "결혼커플",
                value: 2,
                icon: "💍",
                gradient: "from-amber-500 to-orange-600",
                bgGradient: "from-amber-50 to-orange-100",
              },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                className="relative group"
              >
                <div className={`relative bg-gradient-to-br ${stat.bgGradient} rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/50 backdrop-blur-sm overflow-hidden`}>
                  {/* 배경 장식 원 */}
                  <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${stat.gradient} rounded-full opacity-20 blur-2xl group-hover:opacity-30 transition-opacity duration-300`}></div>
                  <div className={`absolute -bottom-10 -left-10 w-24 h-24 bg-gradient-to-br ${stat.gradient} rounded-full opacity-15 blur-xl group-hover:opacity-25 transition-opacity duration-300`}></div>
                  
                  {/* 아이콘 */}
                  <div className="relative z-10 text-center mb-4 sm:mb-6">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ 
                        duration: 0.5, 
                        delay: index * 0.1 + 0.2,
                        type: "spring",
                        stiffness: 200
                      }}
                      className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4"
                    >
                      {stat.icon}
                    </motion.div>
                    
                    {/* 숫자 */}
                    <div className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-2 sm:mb-3 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                      <CountUpNumber value={stat.value} />
                    </div>
                    
                    {/* 라벨 */}
                    <h3 className={`text-sm sm:text-base md:text-lg font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                      {stat.label}
                    </h3>
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

      {/* 신청 프로세스 섹션 */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-gradient-to-br from-gray-50 via-white to-emerald-50 relative overflow-hidden">
        {/* 배경 장식 */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#0e6d62] rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 text-[#0e6d62]">
              신청 프로세스
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">
              간단한 3단계로 신청 완료!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
            {[
              {
                step: "1",
                icon: "📅",
                title: "일정 확인",
                description: "신청 현황 페이지에서 원하는 일정 선택 후 예약하기 클릭",
                gradient: "from-blue-500 to-blue-700",
                bgGradient: "from-blue-50 to-blue-100",
              },
              {
                step: "2",
                icon: "✅",
                title: "입금 확인 & 승인",
                description: "관리자가 입금을 확인하고, 심사 이후에 확정시 알림 보내드립니다.",
                gradient: "from-[#0e6d62] to-[#059669]",
                bgGradient: "from-emerald-50 to-emerald-100",
              },
              {
                step: "3",
                icon: "🎉",
                title: "예약 확정",
                description: "모든 절차가 끝나면 신청 완료 알림을 보내드립니다. ( 세부 일정 공유 )",
                gradient: "from-purple-500 to-pink-600",
                bgGradient: "from-purple-50 to-pink-100",
              },
            ].map((process, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ 
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                className="relative group"
              >
                <div className={`relative bg-gradient-to-br ${process.bgGradient} rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/50 backdrop-blur-sm overflow-hidden h-full`}>
                  {/* 배경 장식 원 */}
                  <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${process.gradient} rounded-full opacity-20 blur-2xl group-hover:opacity-30 transition-opacity duration-300`}></div>
                  
                  {/* 스텝 번호 */}
                  <div className="absolute top-4 left-4">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br ${process.gradient} flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-lg`}>
                      {process.step}
                    </div>
                  </div>
                  
                  {/* 아이콘 */}
                  <div className="text-center mb-4 sm:mb-6">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ 
                        duration: 0.5, 
                        delay: index * 0.2 + 0.2,
                        type: "spring",
                        stiffness: 200
                      }}
                      className="text-5xl sm:text-6xl md:text-7xl mb-4 sm:mb-6"
                    >
                      {process.icon}
                    </motion.div>
                    
                    {/* 제목 */}
                    <h3 className={`text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 bg-gradient-to-r ${process.gradient} bg-clip-text text-transparent`}>
                      {process.title}
                    </h3>
                    
                    {/* 설명 */}
                    <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
                      {process.description}
                    </p>
                  </div>
                </div>
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
