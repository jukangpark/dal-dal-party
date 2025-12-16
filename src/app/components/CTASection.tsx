"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const CTASection = () => {
  const router = useRouter();

  return (
    <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-gradient-to-br from-[#0e6d62] to-[#059669] text-white">
      <div className="container mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            지금 바로 시작하세요
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl mb-8 sm:mb-12 text-white/90">
            새로운 인연을 만날 준비가 되셨나요?
            <br/>
            예약하기에서 원하는 파티를 선택하고 신청해보세요
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/reservation")}
            className="px-8 sm:px-12 py-4 sm:py-5 bg-white text-[#0e6d62] font-bold text-lg sm:text-xl rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
          >
            예약하기 바로가기
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;

