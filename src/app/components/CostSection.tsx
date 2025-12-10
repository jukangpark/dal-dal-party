"use client";

import { motion } from "framer-motion";

const CostSection = () => {
  return (
    <motion.section
      id="cost"
      className="py-16 px-4 bg-white"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl font-bold text-center mb-12 text-[#0e6d62]">참가 비용</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center border-2 border-[#0e6d62]">
            <h3 className="text-2xl font-bold mb-4 text-[#0e6d62]">💁‍♂️ 남성</h3>
            <p className="text-4xl font-bold mb-2">39,000원</p>
            <p className="text-gray-600 text-sm">기본 참가비</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8 text-center border-2 border-[#0e6d62]">
            <h3 className="text-2xl font-bold mb-4 text-[#0e6d62]">💁‍♀️ 여성</h3>
            <p className="text-4xl font-bold mb-2">29,000원</p>
            <p className="text-gray-600 text-sm">기본 참가비</p>
          </div>
        </div>
        <div className="mt-6 bg-gray-50 border-2 border-[#0e6d62] rounded-lg p-6 text-center">
          <p className="text-lg font-semibold text-[#0e6d62]">+1만원으로 애프터 파티 2시간 참여 가능</p>
          <p className="text-sm mt-2 text-gray-600">(21:00~23:00)</p>
        </div>
        <div className="mt-6 bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6">
          <p className="text-sm text-gray-700">
            <strong>안내사항:</strong> 신청 후 운영진 심사 후 승인되신분께만 장소 및 입금 안내가 개별 발송됩니다. 
            신청 후 하루 이내 결과 안내 예정입니다.
          </p>
        </div>

        {/* 환불 규정 섹션 */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          {/* 환불규정 */}
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="text-2xl font-bold mb-4 text-[#0e6d62]">💚 환불규정</h3>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-[#0e6d62] font-bold mt-1">✔️</span>
                <span>노쇼시 어떠한 경우에도 환불 불가</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#0e6d62] font-bold mt-1">✔️</span>
                <span>취소 및 환불은 7일 전까지 가능</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#0e6d62] font-bold mt-1">✔️</span>
                <span>참가일 5일전 이상 50% 공제 후 환불</span>
              </li>
            </ul>
          </div>

          {/* 특이사항 */}
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="text-2xl font-bold mb-4 text-[#0e6d62]">💚 특이사항</h3>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-[#0e6d62] font-bold mt-1">✔️</span>
                <span>호스트의 확정 공지를 받은 분들에 한해서만 참가 가능</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#0e6d62] font-bold mt-1">✔️</span>
                <span>참가 인원 미달 시 일정이 변경 가능</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#0e6d62] font-bold mt-1">✔️</span>
                <span>특별한 경우 세부적인 일정 및 장소 등은 변경 가능</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#0e6d62] font-bold mt-1">✔️</span>
                <span>진행시간에 늦으면 당일 참여가 불가능</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#0e6d62] font-bold mt-1">✔️</span>
                <span>모임 진행 중 본인 부주의로 인한 사고는 책임지지 않습니다.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default CostSection;

