"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface Application {
  [key: string]: string | number | undefined;
}

interface ApplicationStats {
  total: number;
  male: number;
  female: number;
  applications: Application[];
}

export default function ReservationPage() {
  const router = useRouter();
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [statsByDate, setStatsByDate] = useState<Record<string, ApplicationStats>>({});
  const [loadingStats, setLoadingStats] = useState(false);
  const [partyDatesByMonth, setPartyDatesByMonth] = useState<Record<string, PartyInfo[]>>({});
  const [loadingParties, setLoadingParties] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // 생년월일을 "96년생" 형식으로 변환
  const formatBirthYear = (birthDate: string | number | undefined, birthYear: string | number | undefined): string => {
    const value = birthDate || birthYear;
    if (!value) return '';
    
    const str = String(value).trim();
    
    // YYYY-MM-DD 형식 또는 ISO 8601 형식인 경우 (예: "2000-01-15" 또는 "2000-06-01T15:00:00.000Z")
    // 앞 4자리가 연도인 경우
    const yearMatch = str.match(/^(\d{4})/);
    if (yearMatch) {
      const year = yearMatch[1]; // 4자리 연도
      const lastTwoDigits = year.slice(-2); // 마지막 2자리
      return `${lastTwoDigits}년생`;
    }
    
    // YYMMDD 형식인 경우 (예: "960209") - 기존 호환성
    if (str.length === 6 && /^\d{6}$/.test(str)) {
      return `${str.substring(0, 2)}년생`;
    }
    
    // 기타 형식: 앞 2자리만 사용 (기존 로직 유지)
    if (str.length >= 2) {
      return `${str.substring(0, 2)}년생`;
    }
    
    return '';
  };

  // 파티 타입별 border 색상 반환
  const getPartyBorderColor = (category: string, isRecruiting: boolean): string => {
    if (!isRecruiting) return 'border-gray-300';
    
    switch (category) {
      case 'sulgaeting':
        return 'border-[#0e6d62]';
      case 'hexagon-party':
        return 'border-purple-600';
      case 'star-party':
        return 'border-blue-600';
      default:
        return 'border-[#0e6d62]';
    }
  };

  // 파티 타입별 배경 색상 반환 (달력용)
  const getPartyBgColor = (category: string, isRecruiting: boolean): string => {
    if (!isRecruiting) return 'bg-gray-100';
    
    switch (category) {
      case 'sulgaeting':
        return 'bg-[#0e6d62]/10';
      case 'hexagon-party':
        return 'bg-purple-600/10';
      case 'star-party':
        return 'bg-blue-600/10';
      default:
        return 'bg-[#0e6d62]/10';
    }
  };

  // 파티 타입별 텍스트 색상 반환
  const getPartyTextColor = (category: string, isRecruiting: boolean): string => {
    if (!isRecruiting) return 'text-gray-600';
    
    switch (category) {
      case 'sulgaeting':
        return 'text-[#0e6d62]';
      case 'hexagon-party':
        return 'text-purple-600';
      case 'star-party':
        return 'text-blue-600';
      default:
        return 'text-[#0e6d62]';
    }
  };

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
    category: "hexagon-party" | "sulgaeting" | "star-party";
  }

  // 파티 일정 로드 함수 (재사용 가능)
  const loadParties = useCallback(async () => {
    setLoadingParties(true);
    try {
      const response = await fetch('/api/parties');
      const data = await response.json();
      const parties = data.parties || [];
      
      // 시트 데이터를 월별로 그룹화
      const grouped: Record<string, PartyInfo[]> = {};
      
      parties.forEach((party: Record<string, string | number | undefined>) => {
        let dateStr = String(party['날짜'] || '').trim();
        if (!dateStr) return;
        
        // Date 객체의 문자열 표현인 경우 파싱 (예: "Fri Dec 19 2025 00:00:00 GMT+0900")
        if (dateStr.includes('GMT') || dateStr.includes('Dec') || dateStr.includes('Jan') || dateStr.includes('Feb') || 
            dateStr.includes('Mar') || dateStr.includes('Apr') || dateStr.includes('May') || dateStr.includes('Jun') ||
            dateStr.includes('Jul') || dateStr.includes('Aug') || dateStr.includes('Sep') || dateStr.includes('Oct') ||
            dateStr.includes('Nov')) {
          try {
            const dateObj = new Date(dateStr);
            if (!isNaN(dateObj.getTime())) {
              const year = dateObj.getFullYear();
              const month = String(dateObj.getMonth() + 1).padStart(2, '0');
              const day = String(dateObj.getDate()).padStart(2, '0');
              dateStr = `${year}-${month}-${day}`;
            }
          } catch {
            // 파싱 실패 시 원본 문자열 사용
          }
        }
        
        // 날짜 파싱 (YYYY-MM-DD 형식)
        const dateMatch = dateStr.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
        if (!dateMatch) {
          return;
        }
        
        const year = dateMatch[1];
        const month = dateMatch[2].padStart(2, '0');
        const day = parseInt(dateMatch[3], 10);
        const monthKey = `${year}-${month}`;
        
        // PartyInfo 형식으로 변환
        const statusValue = String(party['상태'] || '').trim();
        const categoryValue = String(party['파티타입'] || 'sulgaeting').trim();
        
        const partyInfo: PartyInfo = {
          date: day,
          status: (statusValue === '모집중' || statusValue === '마감') ? statusValue as "모집중" | "마감" : '마감',
          title: party['제목'] ? String(party['제목']) : undefined,
          time: party['시간'] ? String(party['시간']) : undefined,
          ageRange: party['나이범위'] ? String(party['나이범위']) : undefined,
          maleCount: party['남성인원'] ? Number(party['남성인원']) : undefined,
          femaleCount: party['여성인원'] ? Number(party['여성인원']) : undefined,
          note: party['비고'] ? String(party['비고']) : undefined,
          category: (categoryValue === 'hexagon-party' || categoryValue === 'sulgaeting' || categoryValue === 'star-party') 
            ? categoryValue 
            : 'sulgaeting',
        };
        
        if (!grouped[monthKey]) {
          grouped[monthKey] = [];
        }
        grouped[monthKey].push(partyInfo);
      });
      
      setPartyDatesByMonth(grouped);
    } catch {
      // 에러 발생 시 빈 객체로 설정
      setPartyDatesByMonth({});
    } finally {
      setLoadingParties(false);
    }
  }, []);

  // Google Sheets에서 파티 일정 조회
  useEffect(() => {
    loadParties();
  }, [loadParties]);

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

  const handleApplyClick = (partyInfo: PartyInfo) => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth() + 1;
    const dateString = `${year}-${month.toString().padStart(2, "0")}-${partyInfo.date.toString().padStart(2, "0")}`;
    router.push(`/${partyInfo?.category}/apply?date=${dateString}`);
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  // 신청 현황 조회 함수 (더 이상 사용하지 않지만 호환성을 위해 유지)
  // 이제는 각 partyType별로 한 번씩만 호출하여 모든 데이터를 가져옵니다

  // 신청 현황 로드 함수 (재사용 가능)
  const loadStats = useCallback(async () => {
    // 파티 정보가 아직 로드 중이면 대기
    if (loadingParties || Object.keys(partyDatesByMonth).length === 0) {
      return;
    }
    
    const fetchStats = async () => {
      setLoadingStats(true);
      const newStats: Record<string, ApplicationStats> = {};
      
      // 각 partyType별로 한 번씩만 호출 (날짜 필터 없이 모든 데이터 가져오기)
      const partyTypes = ['sulgaeting', 'hexagon-party', 'star-party'] as const;
      
      try {
        // 모든 partyType의 데이터를 병렬로 가져오기
        const allData = await Promise.all(
          partyTypes.map(partyType => 
            fetch(`/api/stats?partyType=${partyType}`)
              .then(async res => {
                const data = await res.json();
                // 에러 응답인 경우 처리
                if (data.error) {
                  return { total: 0, male: 0, female: 0, applications: [] };
                }
                return data;
              })
              .catch(() => {
                return { total: 0, male: 0, female: 0, applications: [] };
              })
          )
        );
        
        // 각 partyType의 모든 데이터를 날짜별로 분류
        partyTypes.forEach((partyType, index) => {
          const data = allData[index];
          
          // 모든 날짜에 대해 데이터 분류
          for (const [monthKey, parties] of Object.entries(partyDatesByMonth)) {
            for (const party of parties) {
              if (party.category === partyType) {
                const [year, month] = monthKey.split('-');
                const dateString = `${year}-${month}-${party.date.toString().padStart(2, "0")}`;
                
                // 해당 날짜의 데이터만 필터링
                const filtered = (data.applications || []).filter((app: Application) => {
                  const appDate = String(app['날짜'] || '').trim();
                  return appDate === dateString;
                });
                
                // 승인된 신청자만 카운트 (통계용)
                const approved = filtered.filter((app: Application) => app['상태'] === '승인');
                
                newStats[dateString] = {
                  total: approved.length,
                  male: approved.filter((app: Application) => app['성별'] === 'male').length,
                  female: approved.filter((app: Application) => app['성별'] === 'female').length,
                  applications: filtered // 모든 신청자 포함 (표시용)
                };
              }
            }
          }
        });
      } catch {
        // 에러 발생 시 무시
      }
      
      setStatsByDate(newStats);
      setLoadingStats(false);
    };
    
    await fetchStats();
  }, [partyDatesByMonth, loadingParties]);

  // 모든 파티의 신청 현황 조회 (최적화: 각 partyType별로 한 번씩만 호출)
  // 파티 정보가 로드된 후에 실행
  useEffect(() => {
    loadStats();
  }, [loadStats]); // partyDatesByMonth가 변경될 때마다 실행

  // 데이터 새로고침 함수
  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await Promise.all([loadParties(), loadStats()]);
    } catch (error) {
      console.error('데이터 새로고침 중 오류:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div className="min-h-screen bg-white py-6 sm:py-8 md:py-12 lg:py-16 px-4 sm:px-6">
      <div className="container mx-auto max-w-4xl">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-6 sm:mb-8 md:mb-12 text-[#0e6d62]"
        >
          예약하기
        </motion.h1>

        {/* 달력 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-lg shadow-lg p-2 sm:p-3 md:p-4 lg:p-6 xl:p-8 border border-gray-200"
        >
          {/* 달력 헤더 */}
          <div className="flex items-center justify-between mb-2 sm:mb-3 md:mb-4 lg:mb-6">
            <button
              onClick={goToPreviousMonth}
              className="p-1 sm:p-1.5 md:p-2 hover:bg-gray-100 rounded transition-colors duration-200"
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
            <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-[#0e6d62]">
              {currentMonth.getFullYear()}년 {currentMonth.getMonth() + 1}월
            </h2>
            <button
              onClick={goToNextMonth}
              className="p-1 sm:p-1.5 md:p-2 hover:bg-gray-100 rounded transition-colors duration-200"
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
          <div className="grid grid-cols-7 gap-0.5 sm:gap-1 md:gap-2 mb-1 sm:mb-2">
            {weekDays.map((day, index) => (
              <div
                key={index}
                className="text-center font-semibold text-[10px] sm:text-xs md:text-sm lg:text-base py-1 sm:py-1.5 md:py-2 text-gray-700"
              >
                {day}
              </div>
            ))}
          </div>

          {/* 달력 날짜들 */}
          <div className="grid grid-cols-7 gap-0.5 sm:gap-1 md:gap-2">
            {calendarDays.map((day, index) => {
              const partyInfo = day !== null ? getPartyInfo(day) : undefined;
              const isPartyDate = !!partyInfo;
              const isRecruiting = partyInfo?.status === "모집중";
              
              return (
                <div
                  key={index}
                  className={`aspect-square rounded sm:rounded-md md:rounded-lg border-2 transition-all duration-200 ${
                    day === null
                      ? "border-transparent"
                      : isPartyDate
                      ? isRecruiting
                        ? `${getPartyBorderColor(partyInfo?.category || 'sulgaeting', true)} ${getPartyBgColor(partyInfo?.category || 'sulgaeting', true)}`
                        : "border-gray-400 bg-gray-100"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {day !== null && (
                    <div className="h-full flex flex-col items-center justify-center p-0.5 sm:p-1 md:p-1.5 lg:p-2">
                      <span
                        className={`text-[10px] sm:text-xs md:text-sm lg:text-base font-medium mb-0.5 sm:mb-1 ${
                          isRecruiting 
                            ? getPartyTextColor(partyInfo?.category || 'sulgaeting', true)
                            : isPartyDate 
                            ? "text-gray-500" 
                            : "text-gray-700"
                        }`}
                      >
                        {day}
                      </span>
                      {partyInfo?.title && (
                        <span
                          className={`text-[7px] sm:text-[8px] md:text-[10px] lg:text-xs font-medium mb-0.5 text-center leading-tight px-0.5 ${
                            isRecruiting 
                              ? getPartyTextColor(partyInfo.category || 'sulgaeting', true)
                              : "text-gray-500"
                          }`}
                          title={partyInfo.title}
                        >
                          {partyInfo.category === 'hexagon-party' 
                            ? '육각형' 
                            : partyInfo.title.length > 4 
                            ? partyInfo.title.substring(0, 4) + "..." 
                            : partyInfo.title}
                        </span>
                      )}
                      {isRecruiting && (
                        <button
                          onClick={() => handleApplyClick(partyInfo)}
                          className={`mt-0.5 sm:mt-1 px-1 sm:px-1.5 md:px-2 lg:px-3 py-0.5 sm:py-0.5 md:py-1 text-[7px] sm:text-[8px] md:text-[10px] lg:text-xs font-semibold text-white rounded transition-colors duration-200 whitespace-nowrap cursor-pointer ${
                            partyInfo.category === 'hexagon-party' 
                              ? 'bg-purple-600 hover:bg-purple-700'
                              : partyInfo.category === 'star-party'
                              ? 'bg-blue-600 hover:bg-blue-700'
                              : 'bg-[#0e6d62] hover:bg-[#059669]'
                          }`}
                        >
                          신청
                        </button>
                      )}
                      {isPartyDate && !isRecruiting && (
                        <span className="mt-0.5 sm:mt-1 text-[7px] sm:text-[8px] md:text-[10px] lg:text-xs text-gray-500">마감</span>
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
      <section className="py-6 sm:py-8 md:py-12 lg:py-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col items-center gap-3 sm:gap-4 mb-4 sm:mb-6 md:mb-8 lg:mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center text-[#0e6d62]"
            >
              {currentMonth.getMonth() + 1}월 신청현황
            </motion.h2>
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              onClick={handleRefresh}
              disabled={isRefreshing || loadingParties || loadingStats}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-all duration-200 text-sm sm:text-base font-semibold ${
                isRefreshing || loadingParties || loadingStats
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-[#0e6d62] text-white hover:bg-[#059669] active:scale-95'
              }`}
              title="데이터 새로고침"
            >
              <svg
                className={`w-4 h-4 sm:w-5 sm:h-5 ${isRefreshing || loadingParties || loadingStats ? 'animate-spin' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              <span className="hidden sm:inline cursor-pointer">
                {isRefreshing || loadingParties || loadingStats ? '갱신 중...' : '데이터 갱신'}
              </span>
            </motion.button>
          </div>

          {loadingParties ? (
            <div className="text-center py-6 sm:py-8">
              <p className="text-sm sm:text-base text-gray-500">파티 일정을 불러오는 중...</p>
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6">
              {/* 현재 보고 있는 달의 파티들만 표시 */}
              {(() => {
                const year = currentMonth.getFullYear();
                const month = currentMonth.getMonth() + 1;
                const monthKey = `${year}-${month.toString().padStart(2, "0")}`;
                const parties = partyDatesByMonth[monthKey] || [];
                
                // 날짜 오름차순으로 정렬 (가장 오래된 날짜가 위, 최신 날짜가 아래)
                const sortedParties = [...parties].sort((a, b) => a.date - b.date);
                
                return sortedParties.map((party, index) => {
                  const dateString = `${year}-${month.toString().padStart(2, "0")}-${party.date.toString().padStart(2, "0")}`;
                  const stats = statsByDate[dateString];
                  const displayStats = stats || { total: 0, male: 0, female: 0, applications: [] };
                  
                  return (
                    <motion.div
                      key={`${monthKey}-${party.date}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                        className={`border-2 rounded-lg p-3 sm:p-4 md:p-5 lg:p-6 ${
                          party.status === "모집중" 
                            ? `${getPartyBorderColor(party.category, true)} bg-white` 
                            : "border-gray-300 bg-gray-50"
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-2 mb-2 sm:mb-3">
                          <h3 className={`text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-snug sm:leading-tight ${
                            getPartyTextColor(party.category, party.status === "모집중")
                          }`}>
                            ⭐️ {month}/{party.date}({["일", "월", "화", "수", "목", "금", "토"][new Date(year, month - 1, party.date).getDay()]})
                            {party.title && ` ${party.title}`}
                            {party.status === "모집중" ? " (모집중)" : " (마감)"}
                          </h3>
                        </div>
                        {party.time && (
                          <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-1">{party.time}</p>
                        )}
                        {party.ageRange && (
                          <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">({party.ageRange})</p>
                        )}
                        {/* Google Sheets에서 조회한 실제 신청 현황 표시 */}
                        {loadingStats ? (
                          <p className="text-xs sm:text-sm md:text-base text-gray-500 mb-3">신청 현황 조회 중...</p>
                        ) : (
                          <>
                            {/* 승인된 신청자만 카운트 */}
                            {(() => {
                              const approvedApps = displayStats.applications.filter((app) => app['상태'] === '승인');
                              const approvedMale = approvedApps.filter((app) => app['성별'] === 'male').length;
                              const approvedFemale = approvedApps.filter((app) => app['성별'] === 'female').length;
                              
                              // 파티 정원
                              const targetMale = party.maleCount || 0;
                              const targetFemale = party.femaleCount || 0;
                              
                              return (
                                <div className="mb-3 sm:mb-4">
                                  {/* 정원/확정 정보 카드 */}
                                  <div className="bg-gray-50 rounded-lg p-2.5 sm:p-3 md:p-4 mb-3 sm:mb-4 border border-gray-200">
                                    <div className="grid grid-cols-2 gap-2.5 sm:gap-3 md:gap-4">
                                      {(targetMale > 0 || targetFemale > 0) && (
                                        <div>
                                          <p className="text-[10px] sm:text-xs md:text-sm text-gray-500 mb-0.5 sm:mb-1">정원</p>
                                          <p className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 leading-tight">
                                            남{targetMale}명 여{targetFemale}명
                                          </p>
                                        </div>
                                      )}
                                      <div>
                                        <p className="text-[10px] sm:text-xs md:text-sm text-gray-500 mb-0.5 sm:mb-1">확정</p>
                                        <p className="text-sm sm:text-base md:text-lg font-semibold text-[#0e6d62] leading-tight">
                                          남{approvedMale}명 여{approvedFemale}명
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  {/* 신청자 목록 */}
                                  {displayStats.applications && displayStats.applications.length > 0 && (
                                    <div className="grid md:grid-cols-2 gap-2.5 sm:gap-3 md:gap-4">
                                      {displayStats.applications.filter((app) => app['성별'] === 'male').length > 0 && (
                                        <div className="bg-sky-50 rounded-lg p-3 sm:p-4 md:p-5 border border-sky-100">
                                          <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3 pb-2 border-b border-sky-200">
                                            <span className="text-base sm:text-lg">💁‍♂️</span>
                                            <p className="font-semibold text-sm sm:text-base md:text-lg text-blue-600">남성</p>
                                            <span className="text-[10px] sm:text-xs text-gray-500">
                                              ({displayStats.applications.filter((app) => app['성별'] === 'male').length}명)
                                            </span>
                                          </div>
                                          <div className="space-y-1.5 sm:space-y-2">
                                            {displayStats.applications
                                              .filter((app) => app['성별'] === 'male')
                                              .sort((a, b) => {
                                                // 승인된 사람을 맨 위로
                                                const aApproved = a['상태'] === '승인';
                                                const bApproved = b['상태'] === '승인';
                                                if (aApproved && !bApproved) return -1;
                                                if (!aApproved && bApproved) return 1;
                                                return 0;
                                              })
                                              .map((app, i) => {
                                                const status = app['상태'] || '';
                                                const isApproved = status === '승인';
                                                const isPending = status === '대기' || (!status && !isApproved);
                                                
                                                const birthYearText = formatBirthYear(app['생년월일'], app['생년']);
                                                
                                                return (
                                                  <div 
                                                    key={i} 
                                                    className={`flex items-center justify-between py-1.5 sm:py-2 px-1.5 sm:px-2 rounded ${
                                                      isApproved ? 'bg-white' : 'bg-gray-50'
                                                    }`}
                                                  >
                                                    <p className="text-xs sm:text-sm md:text-base text-gray-800 font-medium leading-relaxed">
                                                      {birthYearText ? `${birthYearText} ` : ''}{app['직업'] || ''}
                                                    </p>
                                                    <div className="flex items-center gap-1.5 sm:gap-2">
                                                      {isPending && (
                                                        <span className="text-[10px] sm:text-xs text-gray-500 bg-gray-200 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
                                                          심사중
                                                        </span>
                                                      )}
                                                      {isApproved && (
                                                        <span className="text-[#0e6d62] font-bold text-base sm:text-lg">✓</span>
                                                      )}
                                                    </div>
                                                  </div>
                                                );
                                              })}
                                          </div>
                                        </div>
                                      )}
                                      {displayStats.applications.filter((app) => app['성별'] === 'female').length > 0 && (
                                        <div className="bg-pink-50 rounded-lg p-3 sm:p-4 md:p-5 border border-pink-100">
                                          <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3 pb-2 border-b border-pink-200">
                                            <span className="text-base sm:text-lg">💁‍♀️</span>
                                            <p className="font-semibold text-sm sm:text-base md:text-lg text-pink-600">여성</p>
                                            <span className="text-[10px] sm:text-xs text-gray-500">
                                              ({displayStats.applications.filter((app) => app['성별'] === 'female').length}명)
                                            </span>
                                          </div>
                                          <div className="space-y-1.5 sm:space-y-2">
                                            {displayStats.applications
                                              .filter((app) => app['성별'] === 'female')
                                              .sort((a, b) => {
                                                // 승인된 사람을 맨 위로
                                                const aApproved = a['상태'] === '승인';
                                                const bApproved = b['상태'] === '승인';
                                                if (aApproved && !bApproved) return -1;
                                                if (!aApproved && bApproved) return 1;
                                                return 0;
                                              })
                                              .map((app, i) => {
                                                const status = app['상태'] || '';
                                                const isApproved = status === '승인';
                                                const isPending = status === '대기' || (!status && !isApproved);
                                                
                                                const birthYearText = formatBirthYear(app['생년월일'], app['생년']);
                                                
                                                return (
                                                  <div 
                                                    key={i} 
                                                    className={`flex items-center justify-between py-1.5 sm:py-2 px-1.5 sm:px-2 rounded ${
                                                      isApproved ? 'bg-white' : 'bg-gray-50'
                                                    }`}
                                                  >
                                                    <p className="text-xs sm:text-sm md:text-base text-gray-800 font-medium leading-relaxed">
                                                      {birthYearText ? `${birthYearText} ` : ''}{app['직업'] || ''}
                                                    </p>
                                                    <div className="flex items-center gap-1.5 sm:gap-2">
                                                      {isPending && (
                                                        <span className="text-[10px] sm:text-xs text-gray-500 bg-gray-200 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
                                                          심사중
                                                        </span>
                                                      )}
                                                      {isApproved && (
                                                        <span className="text-[#0e6d62] font-bold text-base sm:text-lg">✓</span>
                                                      )}
                                                    </div>
                                                  </div>
                                                );
                                              })}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </div>
                              );
                            })()}
                          </>
                        )}
                        {party.note && (
                          <p className="text-xs sm:text-sm text-gray-600 mt-2">({party.note})</p>
                        )}
                      </motion.div>
                    );
                  });
                })()}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

