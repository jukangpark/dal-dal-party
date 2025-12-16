"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function CustomerServicePage() {

  const notices = [
    {
      id: 1,
      title: "2025년 12월 파티 일정 안내",
      date: "2025.12.01",
      content: "12월 파티 일정이 확정되었습니다. 자세한 내용은 예약하기 페이지에서 확인해주세요.",
      important: true,
    },
    {
      id: 2,
      title: "환불 규정 안내",
      date: "2025.11.15",
      content: "노쇼 시 어떠한 경우에도 환불 불가합니다. 취소 및 환불은 7일 전까지 가능합니다.",
      important: false,
    },
    {
      id: 3,
      title: "참가 신청 절차 안내",
      date: "2025.11.10",
      content: "신청 후 운영진 심사 후 승인되신 분께만 장소 및 입금 안내가 개별 발송됩니다.",
      important: false,
    },
  ];

  const faqs = [
    {
      id: 1,
      question: "참가 신청은 어떻게 하나요?",
      answer: "예약하기 페이지에서 원하시는 날짜를 선택하고 신청하기 버튼을 클릭하시면 신청 폼 작성 페이지로 이동합니다. 신청 폼을 작성하시면 운영진 심사 후 승인 여부를 안내해드립니다.",
    },
    {
      id: 2,
      question: "참가비는 어떻게 입금하나요?",
      answer: "신청 후 승인되신 분께만 개별적으로 입금 안내를 드립니다. 승인 안내와 함께 입금 계좌 정보를 함께 전달해드립니다.",
    },
    {
      id: 3,
      question: "환불이 가능한가요?",
      answer: "노쇼 시 어떠한 경우에도 환불 불가합니다. 취소 및 환불은 7일 전까지 가능하며, 참가일 5일 전 이상은 50% 공제 후 환불됩니다. 1일 전부터는 어떠한 경우에도 환불이 불가능합니다.",
    },
    {
      id: 4,
      question: "참가 인원이 미달되면 어떻게 되나요?",
      answer: "참가 인원 미달 시 일정이 변경될 수 있습니다. 변경 사항은 사전에 개별적으로 안내해드립니다.",
    },
    {
      id: 5,
      question: "사진 업로드는 필수인가요?",
      answer: "네, 승인 심사를 위해 본인 사진 1장 이상 업로드가 필수입니다. 얼굴이 나오지 않으면 안되며, 분위기나 스타일이 드러나는 사진이면 좋습니다. 최대 3장까지 업로드 가능합니다.",
    },
    {
      id: 6,
      question: "술을 마시지 않아도 참가 가능한가요?",
      answer: "네, 가능합니다. 비주류 참여도 가능하며, 비주류 참여 시 비용이 다릅니다. 자세한 내용은 각 파티 페이지에서 확인해주세요.",
    },
    {
      id: 7,
      question: "연락처는 어떻게 남기나요?",
      answer: "신청 폼 작성 시 연락 가능한 카카오톡 ID 또는 전화번호를 입력해주세요. 꼭 정확히 입력해주시며, 카카오톡 전화번호로 친구추가 허용 부탁드립니다.",
    },
    {
      id: 8,
      question: "참가 확정은 언제 알 수 있나요?",
      answer: "신청 후 하루 이내 결과 안내 예정입니다. 승인되신 분께만 장소 및 입금 안내가 개별 발송됩니다.",
    },
  ];


  return (
    <div className="min-h-screen bg-white py-6 sm:py-8 md:py-12 lg:py-16 px-4 sm:px-6">
      <div className="container mx-auto max-w-4xl">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-6 sm:mb-8 md:mb-12 text-[#0e6d62]"
        >
          고객센터
        </motion.h1>

        {/* 공지사항 섹션 */}
        <section className="mb-8 sm:mb-12 md:mb-16 lg:mb-20">
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 md:mb-8 text-[#0e6d62]"
          >
            공지사항
          </motion.h2>

          <div className="space-y-3 sm:space-y-4 md:space-y-5">
            {notices.map((notice, index) => (
              <motion.div
                key={notice.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className={`border-2 rounded-lg p-3 sm:p-4 md:p-5 lg:p-6 ${
                  notice.important
                    ? "border-[#0e6d62] bg-[#0e6d62]/5"
                    : "border-gray-200 bg-white"
                }`}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    {notice.important && (
                      <span className="px-2 sm:px-3 py-1 text-xs sm:text-sm font-semibold bg-[#0e6d62] text-white rounded">
                        중요
                      </span>
                    )}
                    <h3 className={`text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-tight ${
                      notice.important ? "text-[#0e6d62]" : "text-gray-800"
                    }`}>
                      {notice.title}
                    </h3>
                  </div>
                  <span className="text-xs sm:text-sm text-gray-500 whitespace-nowrap">
                    {notice.date}
                  </span>
                </div>
                <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed">
                  {notice.content}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 자주 묻는 질문 섹션 */}
        <section>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 md:mb-8 text-[#0e6d62]"
          >
            자주 묻는 질문
          </motion.h2>

          <div className="space-y-3 sm:space-y-4 md:space-y-5">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.05 }}
                className="border-2 border-gray-200 rounded-lg p-3 sm:p-4 md:p-5 lg:p-6 bg-white"
              >
                <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-gray-800 mb-2 sm:mb-3 md:mb-4 leading-snug">
                  Q. {faq.question}
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed">
                  A. {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 제휴 알림 섹션 */}
        <section className="mt-8 sm:mt-12 md:mt-16 lg:mt-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-4 sm:mb-6 md:mb-8 text-[#0e6d62]"
          >
            술개팅 X <span className="text-yellow-400">로멜로</span> 제휴
          </motion.h2>

          {/* 제휴 이미지 */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 sm:gap-3 md:gap-4 lg:gap-6">
            {[
              "/술개팅 안전 업체/2.png",
              "/술개팅 안전 업체/3.png",
              "/술개팅 안전 업체/4.png",
              "/술개팅 안전 업체/1.png",
            ].map((imagePath, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative w-full aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer group"
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
        </section>
      </div>
    </div>
  );
}

