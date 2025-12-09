"use client";

import { motion } from "framer-motion";

const StatusSection = () => {
  return (
    <motion.section
      id="status"
      className="py-8 sm:py-12 md:py-16 px-3 sm:px-4 bg-white"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-8 md:mb-12 text-[#0e6d62]">신청 현황</h2>
        
        <div className="space-y-4 sm:space-y-5 md:space-y-6">
          {/* 모집중 파티 */}
          <div className="border-2 border-[#0e6d62] rounded-lg p-4 sm:p-5 md:p-6">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 text-[#0e6d62]">⭐️ 12/19(금) (모집중)</h3>
            <p className="text-sm sm:text-base text-gray-600 mb-2">19:30 ~ 21:30</p>
            <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">(89년생 ~04년생)</p>
            <div className="grid md:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <p className="font-semibold text-sm sm:text-base text-[#0e6d62] mb-1.5 sm:mb-2">💁‍♂️ 남</p>
                <p className="text-xs sm:text-sm">91/공무원</p>
              </div>
              <div>
                <p className="font-semibold text-sm sm:text-base text-[#0e6d62] mb-1.5 sm:mb-2">💁‍♀️ 여</p>
                <p className="text-xs sm:text-sm">01/간호사</p>
                <p className="text-xs sm:text-sm">97/간호사</p>
              </div>
            </div>
          </div>

          <div className="border-2 border-[#0e6d62] rounded-lg p-4 sm:p-5 md:p-6">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 text-[#0e6d62]">⭐️ 12/20(토) 상위 20%파티 육각형 남녀 2기 (모집중)</h3>
            <p className="text-xs sm:text-sm text-gray-600 mb-2">현재 남7명 여8명</p>
            <div className="bg-yellow-50 p-3 rounded mt-2 sm:mt-3">
              <p className="text-xs sm:text-sm font-semibold">V 상위20%만 참여 가능</p>
              <p className="text-xs sm:text-sm">V 자유롭게 자리를 섞고, 번호 교환도 눈치 볼 필요 X</p>
              <p className="text-xs sm:text-sm">V 성비 맞추고 기본 정보 확인으로 안심할 수 있는 파티</p>
              <p className="text-xs sm:text-sm">V 2차는 원할 때 자유롭게!</p>
              <p className="text-xs sm:text-sm font-semibold mt-1.5 sm:mt-2">좋은 사람들이 모일 수 있는 소중한 시간</p>
            </div>
          </div>

          <div className="border-2 border-[#0e6d62] rounded-lg p-4 sm:p-5 md:p-6">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 text-[#0e6d62]">⭐️ 12/26(금) (모집중)</h3>
            <p className="text-sm sm:text-base text-gray-600 mb-2">19:30 ~ 21:30</p>
            <p className="text-xs sm:text-sm text-gray-600">(89년생 ~04년생)</p>
          </div>

          <div className="border-2 border-[#0e6d62] rounded-lg p-4 sm:p-5 md:p-6">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 text-[#0e6d62]">⭐️ 12/27(토) (모집중)</h3>
            <p className="text-sm sm:text-base text-gray-600 mb-2">19:00 ~ 21:00</p>
            <p className="text-xs sm:text-sm text-gray-600">(89년생 ~04년생)</p>
          </div>

          <div className="border-2 border-[#0e6d62] rounded-lg p-4 sm:p-5 md:p-6">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 text-[#0e6d62]">⭐️ 12/31(수) 송년회 (모집중)</h3>
            <p className="text-xs sm:text-sm text-gray-600">현재 31명</p>
          </div>

          {/* 마감된 파티 */}
          <div className="mt-8 sm:mt-10 md:mt-12">
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-5 md:mb-6 text-gray-400">마감된 파티</h3>
            <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-500">
              <p>⭐️ 11/7(금) (89년생 ~04년생) &quot;마감&quot;</p>
              <p>⭐️ 11/8(토) (89년생 ~04년생) &quot;마감&quot;</p>
              <p>⭐️ 11.15.(토) 술개팅 상위 20%파티 육각형 남녀 &quot;마감&quot; (남13명 여12명)</p>
              <p>⭐️ 11/22(토) (89년생 ~04년생) &quot;마감&quot;</p>
              <p>⭐️ 11/28(금) (89년생 ~04년생) &quot;마감&quot;</p>
              <p>⭐️ 11/29(토) 술개팅 소셜링 파티 &quot;마감&quot;</p>
              <p>⭐️ 12/5(금) (89년생 ~04년생) &quot;마감&quot;</p>
              <p>⭐️ 12/6(토) (89년생 ~04년생) &quot;마감&quot;</p>
              <p>⭐️ 12/12(금) (89년생 ~04년생) &quot;마감&quot;</p>
              <p>⭐️ 12/13(토) (89년생 ~04년생) &quot;마감&quot;</p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default StatusSection;

