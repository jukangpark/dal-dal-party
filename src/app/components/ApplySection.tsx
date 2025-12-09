"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const ApplySection = () => {
  const router = useRouter();

  return (
    <motion.section
      id="apply"
      className="py-16 px-4 bg-white"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="container mx-auto max-w-2xl">
        <h2 className="text-4xl font-bold text-center mb-12 text-[#0e6d62]">신청하기</h2>
        <div className="bg-gray-50 rounded-lg p-8 space-y-6 border border-gray-200">
          <div className="text-center">
            <p className="text-lg text-gray-700 mb-6">
              파티 신청을 위해 상세 정보를 입력해주세요.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/apply")}
              className="w-full bg-[#0e6d62] text-white font-bold py-4 rounded-lg hover:bg-[#0a5a50] transition-colors text-lg cursor-pointer"
            >
              신청 폼 작성하기
            </motion.button>
          </div>
          <div className="bg-yellow-50 border-2 border-yellow-300 rounded p-4 text-sm">
            <p className="font-semibold mb-2 text-[#0e6d62]">⚠️ 안내사항</p>
            <ul className="space-y-1 text-xs text-gray-700">
              <li>• 신청 후 운영진 심사 후 승인되신분께만 장소 및 입금 안내가 개별 발송됩니다.</li>
              <li>• 신청 후 하루 이내 결과 안내 예정입니다.</li>
              <li>• 허위 정보 입력 시 참가가 취소될 수 있습니다.</li>
            </ul>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ApplySection;

