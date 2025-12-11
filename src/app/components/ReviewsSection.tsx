"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import ReviewCard from "./ReviewCard";
import ProgressBar from "./ProgressBar";
import reviews from "../constants/reviews";
import reviewStats from "../constants/reviewStats";

interface ReviewsSectionProps {
  title: string;
  reviews?: typeof reviews;
  reviewStats?: typeof reviewStats;
  statsText?: string;
}

const ReviewsSection = ({ 
  title,
  reviews: customReviews, 
  reviewStats: customReviewStats,
  statsText = "✅ 2회 40명 참여"
}: ReviewsSectionProps) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [visibleCount, setVisibleCount] = useState(10);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const displayReviews = customReviews || reviews;
  const displayStats = customReviewStats || reviewStats;

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node)
      ) {
        setShowTooltip(false);
      }
    };
    if (showTooltip) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showTooltip]);

  return (
    <motion.section
      id="reviews"
      className="py-16 px-4 bg-white"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl font-bold text-center mb-12 text-[#0e6d62]">{title}</h2>
        
        {/* 리뷰 통계 섹션 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gray-50 rounded-xl shadow-lg p-8 mb-12 border border-gray-200"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-6"
          >
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-2xl font-bold text-[#0e6d62]">
                  이런 점이 좋았어요.
                </h3>
                <div className="relative" ref={tooltipRef}>
                  <button
                    onClick={() => setShowTooltip(!showTooltip)}
                    className="w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors duration-200"
                    aria-label="도움말"
                  >
                    <span className="text-gray-600 text-sm font-bold">?</span>
                  </button>
                  {/* 툴팁 */}
                  {showTooltip && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-8 left-1/2 transform -translate-x-1/2 w-80 bg-gray-800 text-white text-sm rounded-lg p-4 shadow-lg z-10"
                    >
                      {/* X 버튼 */}
                      <button
                        onClick={() => setShowTooltip(false)}
                        className="absolute top-2 right-2 w-5 h-5 rounded-full bg-gray-600 hover:bg-gray-500 flex items-center justify-center transition-colors duration-200"
                        aria-label="닫기"
                      >
                        <span className="text-white text-xs font-bold">×</span>
                      </button>
                      <div className="text-center pr-6">
                        <p className="mb-2">
                          네이버 예약, 주문, 결제내역, 영수증 등으로 인증한
                          방문자들이 해당 장소에 대해 최대 5개 까지 선택한
                          키워드 통계 결과입니다.
                        </p>
                        <p className="text-gray-300 text-xs">
                          업데이트 주기: 하루 단위
                        </p>
                      </div>
                      {/* 화살표 */}
                      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-800"></div>
                    </motion.div>
                  )}
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                <span className="text-[#0e6d62] font-bold">{statsText}</span>
              </p>
            </div>
          </motion.div>
          <div className="space-y-2">
            {displayStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ProgressBar
                  label={stat.label}
                  value={stat.value}
                  maxValue={stat.maxValue}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 개별 리뷰 섹션 */}
        <div className="space-y-6">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-2xl font-bold text-[#0e6d62] mb-6"
          >
            실제 참가자 후기
          </motion.h3>

          {displayReviews.slice(0, visibleCount).map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
            >
              <ReviewCard
                author={review.author}
                content={review.content}
                rating={review.rating}
                visitDate={review.visitDate}
                visitCount={review.visitCount}
                verificationMethod={review.verificationMethod}
                tags={review.tags}
              />
            </motion.div>
          ))}

          {/* 더보기 버튼 */}
          {visibleCount < displayReviews.length && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex justify-center mt-8"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setVisibleCount(displayReviews.length)}
                className="bg-[#0e6d62] text-white px-8 py-3 rounded-full shadow-lg transition-all duration-300 ease-in-out transform font-semibold cursor-pointer"
              >
                더보기
              </motion.button>
            </motion.div>
          )}

        </div>
      </div>
    </motion.section>
  );
};

export default ReviewsSection;

