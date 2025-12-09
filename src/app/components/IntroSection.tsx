"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const IntroSection = () => {
  return (
    <motion.section
      id="intro"
      className="py-8 sm:py-12 md:py-16 px-3 sm:px-4 bg-white"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true}}
    >
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 md:mb-6 text-[#0e6d62]">주변에 괜찮은 사람들이 없다면 여기입니다!</h2>
          
          {/* 이미지 갤러리 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8 md:mb-12">
            <div className="relative w-full aspect-square rounded-lg overflow-hidden max-w-md mx-auto">
              <Image
                src="/육각형파티포인트.png"
                alt="육각형 파티 포인트"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative w-full aspect-square rounded-lg overflow-hidden max-w-md mx-auto">
            <Image
                src="/진행방식.png"
                alt="진행방식"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative w-full aspect-square rounded-lg overflow-hidden max-w-md mx-auto">
              
              <Image
                src="/2차도오케.png"
                alt="2차도오케"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative w-full aspect-square rounded-lg overflow-hidden max-w-md mx-auto">
              <Image
                src="/참가조건.png"
                alt="참가조건"
                fill
                className="object-cover"
              />
            </div>
          </div>

          
          <div className="bg-gray-50 rounded-lg p-4 sm:p-5 md:p-6 mt-4 sm:mt-6 md:mt-8 border border-gray-200">
            <ul className="space-y-2 sm:space-y-3 text-left text-gray-700 text-sm sm:text-base">
              <li className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl flex-shrink-0">✅</span>
                <span>고정 자리 x, 전체 자리 섞기 1회, 연애/친목 다 OK</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl flex-shrink-0">✅</span>
                <span>소주, 맥주 무제한 + 간단한 안주</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl flex-shrink-0">✅</span>
                <span>문의 (카카오id : <span className="font-extrabold">sulgaeting</span> , 인스타 : <span className="font-extrabold">sulgaeting</span>)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* 기본정보 */}
        <div className="bg-gray-50 rounded-lg p-4 sm:p-5 md:p-6 mt-4 sm:mt-6 md:mt-8 border border-gray-200">
          <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-[#0e6d62]">📅 기본정보</h3>
          <div className="grid md:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm text-gray-700">
            <div>
              <p className="font-semibold mb-1.5 sm:mb-2 text-[#0e6d62]">장소:</p>
              <p>광주 프라이빗 파티룸 (승인자에게 개별 안내)</p>
            </div>
            <div>
              <p className="font-semibold mb-1.5 sm:mb-2 text-[#0e6d62]">인원:</p>
              <p>남 10~12 / 여 10~12 (성비 약 1.2~1 : 1) 최대 20명</p>
            </div>
            <div>
              <p className="font-semibold mb-1.5 sm:mb-2 text-[#0e6d62]">참가비:</p>
              <p>남 39,000원 / 여 29,000원</p>
              <p className="text-xs mt-1 text-gray-600">(+1만원으로 애프터 파티 2시간 참여 가능)</p>
            </div>
            <div>
              <p className="font-semibold mb-1.5 sm:mb-2 text-[#0e6d62]">형식:</p>
              <p>전체 자리 섞기 1회 + 자유 이동</p>
              <p className="text-xs mt-1 text-gray-600">게임 없음 / 대화 중심</p>
            </div>
          </div>
        </div>

        {/* 진행방식 */}
        <div className="bg-gray-50 rounded-lg p-4 sm:p-5 md:p-6 mt-4 sm:mt-5 md:mt-6 border border-gray-200">
          <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-[#0e6d62]">진행방식</h3>
          <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-700">
            <li>• 고정좌석X, 전체자리섞기 1회 + 자유이동</li>
            <li>• 진행자 최소 개입으로 자연스러운 대화 중심 파티</li>
            <li>• 인스타, 연락처 교환 타임 대놓고 드려요.</li>
            <li>• 교환이 어려운 대문자분들을 위한 혜택! 다음날 맘에 드는 1명을 호스트에게 말씀해주세요! 상대방에게 의사 물어봐 드릴게요.</li>
          </ul>
          <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-white rounded border border-gray-200">
            <p className="font-semibold mb-1.5 sm:mb-2 text-xs sm:text-sm text-[#0e6d62]">1차 진행 후(19:00~21:00) - 2시간 기본</p>
            <p className="text-xs sm:text-sm text-gray-700">원하시는 분들은 2차 파티 진행(21:00~23:00) - 2시간 연장</p>
            <p className="text-xs sm:text-sm mt-1 text-gray-700">중간에 맘에 드는 상대가 있다면 자유롭게 떠날 수 있습니다!</p>
          </div>
        </div>

        {/* 참가조건 */}
        <div className="bg-gray-50 rounded-lg p-4 sm:p-5 md:p-6 mt-4 sm:mt-5 md:mt-6 border border-gray-200">
          <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-[#0e6d62]">참가조건 (6각형 컨셉)</h3>
          <p className="mb-1.5 sm:mb-2 text-sm sm:text-base text-gray-700">외모 / 키(몸매) / 재력 / 직업 중 두 가지 이상 자신 있는 분</p>
          <p className="text-xs sm:text-sm text-gray-600">(단 한가지라도 뚜렷한 매력이 있다면 예외적으로 초대)</p>
          <p className="mt-3 sm:mt-4 font-semibold text-sm sm:text-base text-[#0e6d62]">진짜 괜찮은 사람 만나고 싶다면 6각형 파티로 오세요!</p>
        </div>
      </div>
    </motion.section>
  );
};

export default IntroSection;

