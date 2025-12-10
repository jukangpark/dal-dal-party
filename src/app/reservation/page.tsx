"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function ReservationPage() {
  const router = useRouter();
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 11, 1)); // 2025년 12월

  // 파티 정보 타입
  interface PartyInfo {
    date: number;
    status: "모집중" | "마감";
    title?: string;
    time?: string;
    ageRange?: string;
    maleCount?: number;
    femaleCount?: number;
    participants?: {
      male?: string[];
      female?: string[];
    };
    note?: string;
  }

  // 파티가 있는 날짜들 (월별로 관리)
  const partyDatesByMonth: Record<string, PartyInfo[]> = {
    "2025-11": [
      { date: 15, status: "마감", title: "육각형 파티", maleCount: 13, femaleCount: 12 },
      { date: 22, status: "마감", time: "19:00 ~ 21:00", ageRange: "89년생 ~04년생", title: "술개팅" },
      { date: 28, status: "마감", time: "19:30 ~ 21:30", ageRange: "89년생 ~04년생", title: "술개팅" },
      { date: 29, status: "마감", title: "술개팅 소셜링 파티" },
    ],
    "2025-12": [
      { date: 5, status: "마감", time: "19:30 ~ 21:30", ageRange: "89년생 ~04년생" ,title: "술개팅" },
      { date: 6, status: "마감", time: "19:00 ~ 21:00", ageRange: "89년생 ~04년생" , title: "술개팅"},
      { date: 12, status: "마감", time: "19:30 ~ 21:30", ageRange: "89년생 ~04년생", title: "술개팅" },
      { date: 13, status: "마감", time: "19:00 ~ 21:00", ageRange: "89년생 ~04년생", title: "술개팅" },
      { 
        date: 19, 
        status: "모집중", 
        time: "19:30 ~ 21:30", 
        ageRange: "89년생 ~04년생",
        title: "술개팅",
        participants: {
          male: ["91/공무원", "94/미화원"],
          female: ["01/간호사", "97/간호사"],
        }
      },
      { 
        date: 20, 
        status: "모집중", 
        title: "육각형 파티 2기",
        maleCount: 7,
        femaleCount: 10,
        note: "여자 마감"
      },
      { date: 26, status: "모집중", time: "19:30 ~ 21:30", ageRange: "89년생 ~04년생", title: "술개팅" },
      { date: 27, status: "모집중", time: "19:00 ~ 21:00", ageRange: "89년생 ~04년생", title: "술개팅" },
      { date: 31, status: "모집중", title: "별별파티 송년회", note: "현재 31명" },
    ],
  };

  const getPartyDates = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth() + 1;
    const key = `${year}-${month.toString().padStart(2, "0")}`;
    return partyDatesByMonth[key] || [];
  };

  const getPartyInfo = (day: number): PartyInfo | undefined => {
    const parties = getPartyDates();
    return parties.find(party => party.date === day);
  };

  // 달력 데이터 생성
  const getCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // 이전 달의 빈 칸
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // 현재 달의 날짜들
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const calendarDays = getCalendarDays();
  const weekDays = ["일", "월", "화", "수", "목", "금", "토"];

  const handleApplyClick = () => {
    router.push("/apply");
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  return (
    <div className="min-h-screen bg-white py-8 sm:py-12 md:py-16 px-4 sm:px-6">
      <div className="container mx-auto max-w-4xl">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12 text-[#0e6d62]"
        >
          예약하기
        </motion.h1>

        {/* 달력 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-lg shadow-lg p-2 sm:p-4 md:p-6 lg:p-8 border border-gray-200"
        >
          {/* 달력 헤더 */}
          <div className="flex items-center justify-between mb-3 sm:mb-4 md:mb-6">
            <button
              onClick={goToPreviousMonth}
              className="p-1 sm:p-2 hover:bg-gray-100 rounded sm:rounded-lg transition-colors duration-200"
              aria-label="이전 달"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#0e6d62]"
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
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#0e6d62]">
              {currentMonth.getFullYear()}년 {currentMonth.getMonth() + 1}월
            </h2>
            <button
              onClick={goToNextMonth}
              className="p-1 sm:p-2 hover:bg-gray-100 rounded sm:rounded-lg transition-colors duration-200"
              aria-label="다음 달"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#0e6d62]"
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
          </div>

          {/* 요일 헤더 */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-1 sm:mb-2">
            {weekDays.map((day, index) => (
              <div
                key={index}
                className="text-center font-semibold text-xs sm:text-sm md:text-base py-1 sm:py-2 text-gray-700"
              >
                {day}
              </div>
            ))}
          </div>

          {/* 달력 날짜들 */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2">
            {calendarDays.map((day, index) => {
              const partyInfo = day !== null ? getPartyInfo(day) : undefined;
              const isPartyDate = !!partyInfo;
              const isRecruiting = partyInfo?.status === "모집중";
              
              return (
                <div
                  key={index}
                  className={`aspect-square rounded sm:rounded-lg border-2 transition-all duration-200 ${
                    day === null
                      ? "border-transparent"
                      : isPartyDate
                      ? isRecruiting
                        ? "border-[#0e6d62] bg-[#0e6d62]/10"
                        : "border-gray-400 bg-gray-100"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {day !== null && (
                    <div className="h-full flex flex-col items-center justify-center p-0.5 sm:p-1 md:p-2">
                      <span
                        className={`text-xs sm:text-sm md:text-base font-medium mb-0.5 sm:mb-1 ${
                          isRecruiting ? "text-[#0e6d62]" : isPartyDate ? "text-gray-500" : "text-gray-700"
                        }`}
                      >
                        {day}
                      </span>
                      {partyInfo?.title && (
                        <span
                          className={`text-[8px] sm:text-[10px] md:text-xs font-medium mb-0.5 text-center leading-tight px-0.5 ${
                            isRecruiting ? "text-[#0e6d62]" : "text-gray-500"
                          }`}
                          title={partyInfo.title}
                        >
                          {partyInfo.title.length > 4 ? partyInfo.title.substring(0, 4) + "..." : partyInfo.title}
                        </span>
                      )}
                      {isRecruiting && (
                        <button
                          onClick={handleApplyClick}
                          className="mt-0.5 sm:mt-1 px-1 sm:px-2 md:px-3 py-0.5 sm:py-1 text-[8px] sm:text-[10px] md:text-xs font-semibold bg-[#0e6d62] text-white rounded hover:bg-[#059669] transition-colors duration-200 whitespace-nowrap cursor-pointer"
                        >
                          신청
                        </button>
                      )}
                      {isPartyDate && !isRecruiting && (
                        <span className="mt-0.5 sm:mt-1 text-[8px] sm:text-[10px] md:text-xs text-gray-500">마감</span>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* 신청현황 섹션 */}
      <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-8 md:mb-12 text-[#0e6d62]"
          >
            신청현황
          </motion.h2>

          <div className="space-y-4 sm:space-y-5 md:space-y-6">
            {/* 11월 파티들 */}
            {partyDatesByMonth["2025-11"]?.map((party, index) => (
              <motion.div
                key={`2025-11-${party.date}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`border-2 rounded-lg p-4 sm:p-5 md:p-6 ${
                  party.status === "모집중" 
                    ? "border-[#0e6d62] bg-white" 
                    : "border-gray-300 bg-gray-50"
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className={`text-lg sm:text-xl md:text-2xl font-bold ${
                    party.status === "모집중" ? "text-[#0e6d62]" : "text-gray-600"
                  }`}>
                    ⭐️ 11/{party.date}({["일", "월", "화", "수", "목", "금", "토"][new Date(2025, 10, party.date).getDay()]})
                    {party.title && ` ${party.title}`}
                    {party.status === "모집중" ? " (모집중)" : " (마감)"}
                  </h3>
                </div>
                {party.time && (
                  <p className="text-sm sm:text-base text-gray-600 mb-1">{party.time}</p>
                )}
                {party.ageRange && (
                  <p className="text-xs sm:text-sm text-gray-600 mb-2">({party.ageRange})</p>
                )}
                {party.maleCount !== undefined && party.femaleCount !== undefined && (
                  <p className="text-sm sm:text-base text-gray-700 mb-3">
                    남{party.maleCount}명 여{party.femaleCount}명
                  </p>
                )}
                {party.participants && (
                  <div className="grid md:grid-cols-2 gap-3 sm:gap-4 mt-3">
                    {party.participants.male && party.participants.male.length > 0 && (
                      <div>
                        <p className="font-semibold text-sm sm:text-base text-[#0e6d62] mb-1.5 sm:mb-2">💁‍♂️ 남</p>
                        {party.participants.male.map((p, i) => (
                          <p key={i} className="text-xs sm:text-sm text-gray-700">{p}</p>
                        ))}
                      </div>
                    )}
                    {party.participants.female && party.participants.female.length > 0 && (
                      <div>
                        <p className="font-semibold text-sm sm:text-base text-[#0e6d62] mb-1.5 sm:mb-2">💁‍♀️ 여</p>
                        {party.participants.female.map((p, i) => (
                          <p key={i} className="text-xs sm:text-sm text-gray-700">{p}</p>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                {party.note && (
                  <p className="text-xs sm:text-sm text-gray-600 mt-2">({party.note})</p>
                )}
              </motion.div>
            ))}

            {/* 12월 파티들 */}
            {partyDatesByMonth["2025-12"]?.map((party, index) => (
              <motion.div
                key={`2025-12-${party.date}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: (partyDatesByMonth["2025-11"]?.length || 0) * 0.1 + index * 0.1 }}
                className={`border-2 rounded-lg p-4 sm:p-5 md:p-6 ${
                  party.status === "모집중" 
                    ? "border-[#0e6d62] bg-white" 
                    : "border-gray-300 bg-gray-50"
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className={`text-lg sm:text-xl md:text-2xl font-bold ${
                    party.status === "모집중" ? "text-[#0e6d62]" : "text-gray-600"
                  }`}>
                    ⭐️ 12/{party.date}({["일", "월", "화", "수", "목", "금", "토"][new Date(2025, 11, party.date).getDay()]})
                    {party.title && ` ${party.title}`}
                    {party.status === "모집중" ? " (모집중)" : " (마감)"}
                  </h3>
                </div>
                {party.time && (
                  <p className="text-sm sm:text-base text-gray-600 mb-1">{party.time}</p>
                )}
                {party.ageRange && (
                  <p className="text-xs sm:text-sm text-gray-600 mb-2">({party.ageRange})</p>
                )}
                {party.maleCount !== undefined && party.femaleCount !== undefined && (
                  <p className="text-sm sm:text-base text-gray-700 mb-1">
                    현재 남{party.maleCount}명 여{party.femaleCount}명
                  </p>
                )}
                {party.participants && (
                  <div className="grid md:grid-cols-2 gap-3 sm:gap-4 mt-3">
                    {party.participants.male && party.participants.male.length > 0 && (
                      <div>
                        <p className="font-semibold text-sm sm:text-base text-[#0e6d62] mb-1.5 sm:mb-2">💁‍♂️ 남</p>
                        {party.participants.male.map((p, i) => (
                          <p key={i} className="text-xs sm:text-sm text-gray-700">{p}</p>
                        ))}
                      </div>
                    )}
                    {party.participants.female && party.participants.female.length > 0 && (
                      <div>
                        <p className="font-semibold text-sm sm:text-base text-[#0e6d62] mb-1.5 sm:mb-2">💁‍♀️ 여</p>
                        {party.participants.female.map((p, i) => (
                          <p key={i} className="text-xs sm:text-sm text-gray-700">{p}</p>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                {party.note && (
                  <p className="text-xs sm:text-sm text-gray-600 mt-2">({party.note})</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

