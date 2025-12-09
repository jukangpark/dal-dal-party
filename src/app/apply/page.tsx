"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Header from "../components/Header";

const MBTI_OPTIONS = [
  "INTJ", "INTP", "ENTJ", "ENTP",
  "INFJ", "INFP", "ENFJ", "ENFP",
  "ISTJ", "ISFJ", "ESTJ", "ESFJ",
  "ISTP", "ISFP", "ESTP", "ESFP",
];

const ApplyPage = () => {
  const [formData, setFormData] = useState({
    // 개인정보 동의
    privacyAgreement: false,
    
    // 기본 정보
    name: "",
    gender: "",
    birthYear: "",
    job: "",
    residence: "",
    contact: "",
    
    // 추가 정보
    mbti: "",
    lookalike: "",
    
    // 매력 포인트 (체크박스)
    charmPoints: {
      appearance: false,
      height: false,
      wealth: false,
      job: false,
    },
    
    // 사진
    photos: [] as File[],
    
    // 방문 경로
    visitRoute: "",
    visitRouteOther: "",
    
    // 동의 사항
    photoAgreement: "",
    rotationAgreement: "",
    refundAgreement: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      if (name.startsWith("charmPoint_")) {
        const pointName = name.replace("charmPoint_", "") as keyof typeof formData.charmPoints;
        setFormData(prev => ({
          ...prev,
          charmPoints: {
            ...prev.charmPoints,
            [pointName]: checked,
          },
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [name]: checked,
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).slice(0, 3);
      setFormData(prev => ({
        ...prev,
        photos: files,
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.privacyAgreement) {
      newErrors.privacyAgreement = "개인정보 수집 및 이용에 동의해주세요.";
    }

    if (!formData.name) {
      newErrors.name = "이름을 입력해주세요.";
    }

    if (!formData.gender) {
      newErrors.gender = "성별을 선택해주세요.";
    }

    if (!formData.birthYear) {
      newErrors.birthYear = "생년을 입력해주세요.";
    }

    if (!formData.job) {
      newErrors.job = "직업을 입력해주세요.";
    }

    if (!formData.residence) {
      newErrors.residence = "거주지를 선택해주세요.";
    }

    if (!formData.contact) {
      newErrors.contact = "연락처를 입력해주세요.";
    }

    if (!formData.mbti) {
      newErrors.mbti = "MBTI를 선택해주세요.";
    }

    if (!formData.lookalike) {
      newErrors.lookalike = "닮은꼴 명찰을 작성해주세요.";
    }

    const selectedCharmPoints = Object.values(formData.charmPoints).filter(Boolean).length;
    if (selectedCharmPoints < 2) {
      newErrors.charmPoints = "매력 포인트를 2개 이상 선택해주세요.";
    }

    if (formData.photos.length === 0) {
      newErrors.photos = "본인 사진을 1장 이상 업로드해주세요.";
    }

    if (!formData.visitRoute) {
      newErrors.visitRoute = "방문 경로를 선택해주세요.";
    }

    if (formData.visitRoute === "other" && !formData.visitRouteOther) {
      newErrors.visitRouteOther = "기타 방문 경로를 입력해주세요.";
    }

    if (!formData.photoAgreement || formData.photoAgreement === "no") {
      newErrors.photoAgreement = "사진 촬영 동의는 필수입니다.";
    }

    if (!formData.rotationAgreement) {
      newErrors.rotationAgreement = "1대1 로테이션 소개팅 참여 의향을 선택해주세요.";
    }

    if (formData.refundAgreement !== "agree") {
      newErrors.refundAgreement = "환불규정 및 유의사항에 동의해주세요.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // TODO: 실제 제출 로직 구현
      console.log("Form submitted:", formData);
      alert("신청이 완료되었습니다! 운영진 심사 후 결과를 안내드리겠습니다.");
    }
  };

  const selectedCharmPointsCount = Object.values(formData.charmPoints).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-[#d3ded3]">
      <Header />
      
      <div className="container mx-auto max-w-3xl px-3 md:px-4 py-6 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >

          {/* 파티 소개 섹션 */}
          <div className="bg-gray-50 rounded-lg p-4 md:p-8 mb-6 md:mb-12 border border-gray-200">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3 md:mb-4 text-[#0e6d62]">
              광주 육각형 남녀 파티🎉
            </h2>
            <p className="text-center text-base md:text-lg mb-4 md:mb-6 text-gray-700">
              주변에 괜찮은 사람들이 없다면 여기입니다!
              <br />
              아무나 올 수 없는 승인제 파티
            </p>
            {/* 파티 이미지 */}
            <div className="relative w-full aspect-square mb-4 md:mb-6 rounded-lg overflow-hidden">
              <Image
                src="/육각형파티2기.jpeg"
                alt="광주 육각형 남녀 파티"
                fill
                className="object-cover"
                priority
              />
            </div>
            
            
            <div className="space-y-1 md:space-y-2 mb-4 md:mb-6 text-center text-gray-700 text-sm md:text-base">
              <p>고정 자리 x, 전체 자리 섞기 1회, 연애/친목 다 OK</p>
              <p>소주, 맥주 무제한 + 간단한 안주</p>
              <p className="mt-2 md:mt-4">문의 (카카오id : <span className="font-extrabold">sulgaeting</span> , 인스타 : <span className="font-extrabold">sulgaeting</span>)</p>
            </div>

            <div className="bg-white rounded-lg p-4 md:p-6 mt-4 md:mt-8 border border-gray-200">
              <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-center text-[#0e6d62]">📅 기본정보</h3>
              <div className="space-y-3 text-sm text-gray-700">
                <div>
                  <span className="font-semibold text-[#0e6d62]">일시:</span> 2025년 12월 20일(토) 19:00~23:00
                </div>
                <div>
                  <span className="font-semibold text-[#0e6d62]">장소:</span> 광주 프라이빗 파티룸 (승인자에게 개별 안내)
                </div>
                <div>
                  <span className="font-semibold text-[#0e6d62]">인원:</span> 남 10~12 / 여 10~12 (성비 약 1.2~1 : 1) 최대 20명
                </div>
                <div>
                  <span className="font-semibold text-[#0e6d62]">참가비:</span> 남 39,000원 / 여 29,000원
                  <br />
                  <span>(+1만원으로 애프터 파티 2시간 참여 가능)</span>
                </div>
                <div className="mt-4">
                  <span className="font-semibold text-[#0e6d62]">형식:</span>
                  <br />
                  <span>전체 자리 섞기 1회 + 자유 이동</span>
                  <br />
                  <span>게임 없음 / 대화 중심</span>
                </div>
                <div className="mt-4 bg-gray-50 rounded p-3 border border-gray-200">
                  <p className="font-semibold mb-2 text-[#0e6d62]">💡 특별 혜택</p>
                  <p>인스타, 연락처 교환 시간 대놓고 드려요,</p>
                  <p>교환이 어려운 대문자 i분들을 위한 혜택!</p>
                  <p className="mt-1">&quot;다음날 맘에 드는 1명을 호스트에게 연락 주면 상대방에게 의사 물어봐드려요!&quot;</p>
                </div>
              </div>
            </div>

            <div className="mt-4 md:mt-6 bg-yellow-50 border-2 border-yellow-300 rounded-lg p-3 md:p-4 text-center">
              <p className="text-xs md:text-sm font-semibold text-gray-700">
                신청 후 운영진 심사 후 승인되신분께만 장소 및 입금 안내가 개별 발송됩니다.
                <br />
                신청 후 하루 이내 결과 안내 예정입니다.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-8">
            {/* 개인정보 수집 및 이용 동의 */}
            <div className="bg-gray-50 rounded-lg p-4 md:p-6 border border-gray-200">
              <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-[#0e6d62]">
                ⚠️ 개인정보 수집 및 이용 동의
              </h2>
              <div className="mb-4 space-y-2 text-sm text-gray-700">
                <p><strong>수집하는 개인정보 항목:</strong> 이름, 연락처, 직업, 본인사진</p>
                <p><strong>수집 및 이용 목적:</strong> 지원자 확인</p>
                <p><strong>보유 및 이용기간:</strong> 참여 신청 후 12개월 (별도 요청 시 즉시 삭제처리)</p>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="privacyAgreement"
                  checked={formData.privacyAgreement}
                  onChange={handleInputChange}
                  className="w-5 h-5 text-[#0e6d62] border-gray-300 rounded"
                />
                <span className="font-semibold text-[#0e6d62]">동의합니다</span>
              </label>
              {errors.privacyAgreement && (
                <p className="text-red-500 text-sm mt-2">{errors.privacyAgreement}</p>
              )}
            </div>

            {/* 기본 정보 */}
            <div className="bg-gray-50 rounded-lg p-4 md:p-6 border border-gray-200 space-y-3 md:space-y-4">
              <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-[#0e6d62]">기본 정보</h2>
              
              <div>
                <label className="block mb-1.5 md:mb-2 text-sm md:text-base font-semibold text-[#0e6d62]">📍 이름 *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 md:px-4 py-2 rounded text-sm md:text-base text-gray-900 border border-gray-300"
                  placeholder="이름을 입력해주세요"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block mb-1.5 md:mb-2 text-sm md:text-base font-semibold text-[#0e6d62]">📍 성별 *</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full px-3 md:px-4 py-2 rounded text-sm md:text-base text-gray-900 border border-gray-300"
                >
                  <option value="">선택해주세요</option>
                  <option value="male">남성</option>
                  <option value="female">여성</option>
                </select>
                {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
              </div>

              <div>
                <label className="block mb-1.5 md:mb-2 text-sm md:text-base font-semibold text-[#0e6d62]">📍 생년 (예: 1995)*</label>
                <input
                  type="number"
                  name="birthYear"
                  value={formData.birthYear}
                  onChange={handleInputChange}
                  className="w-full px-3 md:px-4 py-2 rounded text-sm md:text-base text-gray-900 border border-gray-300"
                  placeholder="예: 1995"
                  min="1950"
                  max="2010"
                />
                {errors.birthYear && <p className="text-red-500 text-sm mt-1">{errors.birthYear}</p>}
              </div>

              <div>
                <label className="block mb-1.5 md:mb-2 text-sm md:text-base font-semibold text-[#0e6d62]">📍 직업 / 직종 (간단히) *</label>
                <input
                  type="text"
                  name="job"
                  value={formData.job}
                  onChange={handleInputChange}
                  className="w-full px-3 md:px-4 py-2 rounded text-sm md:text-base text-gray-900 border border-gray-300"
                  placeholder="직업을 입력해주세요"
                />
                {errors.job && <p className="text-red-500 text-sm mt-1">{errors.job}</p>}
              </div>

              <div>
                <label className="block mb-1.5 md:mb-2 text-sm md:text-base font-semibold text-[#0e6d62]">📍 거주지 *</label>
                <select
                  name="residence"
                  value={formData.residence}
                  onChange={handleInputChange}
                  className="w-full px-3 md:px-4 py-2 rounded text-sm md:text-base text-gray-900 border border-gray-300"
                >
                  <option value="">선택해주세요</option>
                  <option value="gwangju">광주 내</option>
                  <option value="nearby">근처 지역</option>
                </select>
                {errors.residence && <p className="text-red-500 text-sm mt-1">{errors.residence}</p>}
              </div>

              <div>
                <label className="block mb-1.5 md:mb-2 text-sm md:text-base font-semibold text-[#0e6d62]">
                  📍 연락 가능한 카카오톡 ID or 전화번호 *
                </label>
                <input
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  className="w-full px-3 md:px-4 py-2 rounded text-sm md:text-base text-gray-900 border border-gray-300"
                  placeholder="카카오톡 ID 또는 전화번호를 입력해주세요"
                />
                <p className="text-sm text-gray-600 mt-1">
                  *꼭 정확히 입력해주세요. 잘못 기재시 연락할 방법이 없습니다.
                </p>
                <p className="text-sm text-red-600 mt-1 font-semibold">
                  *카카오톡 전화번호로 친구추가 허용 부탁드립니다 &lt;&lt; &quot;반드시 확인 필요&quot;
                </p>
                {errors.contact && <p className="text-red-500 text-sm mt-1">{errors.contact}</p>}
              </div>
            </div>

            {/* MBTI */}
            <div className="bg-gray-50 rounded-lg p-4 md:p-6 border border-gray-200">
              <label className="block mb-1.5 md:mb-2 text-sm md:text-base font-semibold text-[#0e6d62]">📍 MBTI *</label>
              <select
                name="mbti"
                value={formData.mbti}
                onChange={handleInputChange}
                className="w-full px-3 md:px-4 py-2 rounded text-sm md:text-base text-gray-900 border border-gray-300"
              >
                <option value="">선택해주세요</option>
                {MBTI_OPTIONS.map(mbti => (
                  <option key={mbti} value={mbti}>{mbti}</option>
                ))}
              </select>
              {errors.mbti && <p className="text-red-500 text-sm mt-1">{errors.mbti}</p>}
            </div>

            {/* 닮은꼴 명찰 */}
            <div className="bg-gray-50 rounded-lg p-4 md:p-6 border border-gray-200">
              <h2 className="text-lg md:text-xl font-bold mb-2 text-[#0e6d62]">
                📍 닮은꼴 명찰 작성
              </h2>
              <p className="text-xs md:text-sm text-gray-600 mb-3 md:mb-4">
                현장에서 사용할 &apos;닮은꼴 명찰&apos;을 위해 작성해주세요 😎
                <br />
                닮은 연예인 / 셀럽 중 하나를 적어주세요. (없으면 아무 유명인이나 OK)
              </p>
              <p className="text-xs md:text-sm text-gray-500 mb-3 md:mb-4">
                💬 예시: 차은우 / 손석구 / 정해인 / 안유진 / 한소희 / 장원영
              </p>
              <input
                type="text"
                name="lookalike"
                value={formData.lookalike}
                onChange={handleInputChange}
                className="w-full px-3 md:px-4 py-2 rounded text-sm md:text-base text-gray-900 border border-gray-300"
                placeholder="닮은꼴을 입력해주세요"
              />
              {errors.lookalike && <p className="text-red-500 text-sm mt-1">{errors.lookalike}</p>}
            </div>

            {/* 매력 포인트 */}
            <div className="bg-gray-50 rounded-lg p-4 md:p-6 border border-gray-200">
              <h2 className="text-lg md:text-xl font-bold mb-2 text-[#0e6d62]">
                📍 매력 포인트 체크
              </h2>
              <p className="text-xs md:text-sm text-gray-600 mb-3 md:mb-4">
                아래 항목 중 2개 이상 자신 있는 부문 기입해주세요.
                <br />
                외모/키(몸매)/재력/직업
                <br />
                (한 가지 항목만 자신 있어도 어필 문항에서 충분히 표현해주세요.)
              </p>
              <p className="text-xs md:text-sm text-gray-500 mb-3 md:mb-4">
                Ex) 키 184/ 재력ㅇㅇ이상/ 직업ㅇㅇ / 외모 등
              </p>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="charmPoint_appearance"
                    checked={formData.charmPoints.appearance}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-[#0e6d62] border-gray-300 rounded"
                  />
                  <span>외모</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="charmPoint_height"
                    checked={formData.charmPoints.height}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-[#0e6d62] border-gray-300 rounded"
                  />
                  <span>키(몸매)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="charmPoint_wealth"
                    checked={formData.charmPoints.wealth}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-[#0e6d62] border-gray-300 rounded"
                  />
                  <span>재력</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="charmPoint_job"
                    checked={formData.charmPoints.job}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-[#0e6d62] border-gray-300 rounded"
                  />
                  <span>직업</span>
                </label>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                선택된 항목: {selectedCharmPointsCount}개
              </p>
              {errors.charmPoints && (
                <p className="text-red-500 text-sm mt-2">{errors.charmPoints}</p>
              )}
            </div>

            {/* 사진 업로드 */}
            <div className="bg-gray-50 rounded-lg p-4 md:p-6 border border-gray-200">
              <h2 className="text-lg md:text-xl font-bold mb-2 text-[#0e6d62]">
                📍 사진 업로드
              </h2>
              <p className="text-xs md:text-sm text-gray-600 mb-3 md:mb-4">
                승인 심사를 위해 본인 사진 1장 이상 업로드해주세요.
                <br />
                얼굴이 안 나오면 안됩니다! 분위기나 스타일이 드러나는 사진이면 좋아요.
                <br />
                (최대 3장 업로드 가능)
              </p>
              <p className="text-xs md:text-sm text-gray-500 mb-3 md:mb-4">
                📸 예시: 전신 or 얼굴 사진 / 일상 분위기 컷 / 여행, 카페, 자연스러운 모습 등. <br/>
                지원되는 파일을 최대 5개까지 업로드하세요. 파일당 최대 크기는 10 MB입니다.
              </p>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="w-full px-3 md:px-4 py-2 rounded text-sm md:text-base text-gray-900 border border-gray-300"
              />
              {formData.photos.length > 0 && (
                <p className="text-sm text-gray-600 mt-2">
                  선택된 파일: {formData.photos.length}개
                </p>
              )}
              {errors.photos && <p className="text-red-500 text-sm mt-1">{errors.photos}</p>}
            </div>

            {/* 방문 경로 */}
            <div className="bg-gray-50 rounded-lg p-4 md:p-6 border border-gray-200">
              <label className="block mb-1.5 md:mb-2 text-sm md:text-base font-semibold text-[#0e6d62]">방문 경로 *</label>
              <select
                name="visitRoute"
                value={formData.visitRoute}
                onChange={handleInputChange}
                className="w-full px-3 md:px-4 py-2 rounded text-sm md:text-base text-gray-900 border border-gray-300 mb-4"
              >
                <option value="">선택해주세요</option>
                <option value="instagram">인스타</option>
                <option value="blog">블로그</option>
                <option value="friend">지인소개</option>
                <option value="other">기타</option>
              </select>
              {formData.visitRoute === "other" && (
                <input
                  type="text"
                  name="visitRouteOther"
                  value={formData.visitRouteOther}
                  onChange={handleInputChange}
                  className="w-full px-3 md:px-4 py-2 rounded text-sm md:text-base text-gray-900 border border-gray-300"
                  placeholder="기타 방문 경로를 입력해주세요"
                />
              )}
              {errors.visitRoute && <p className="text-red-500 text-sm mt-1">{errors.visitRoute}</p>}
              {errors.visitRouteOther && <p className="text-red-500 text-sm mt-1">{errors.visitRouteOther}</p>}
            </div>

            {/* 사진 촬영 동의 */}
            <div className="bg-gray-50 rounded-lg p-4 md:p-6 border border-gray-200">
              <h2 className="text-lg md:text-xl font-bold mb-2 text-[#0e6d62]">
                ⚠️ 행사 중 일부 현장 분위기(영상·사진) 촬영이 있을 수 있습니다.
              </h2>
              <p className="text-xs md:text-sm text-gray-600 mb-3 md:mb-4">
                (1기, 2기는 촬영 동의로 최저 비용 진행)
              </p>
              <p className="text-xs md:text-sm font-semibold mb-3 md:mb-4 text-[#0e6d62]">
                모자이크 처리 후 술개팅 인스타그램 업로드에 동의하십니까?
              </p>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="photoAgreement"
                    value="yes"
                    checked={formData.photoAgreement === "yes"}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-[#0e6d62] border-gray-300"
                  />
                  <span>예 (동의합니다)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="photoAgreement"
                    value="no"
                    checked={formData.photoAgreement === "no"}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-[#0e6d62] border-gray-300"
                  />
                  <span>아니오 (신청 불가)</span>
                </label>
              </div>
              {errors.photoAgreement && (
                <p className="text-red-500 text-sm mt-2">{errors.photoAgreement}</p>
              )}
            </div>

            {/* 1대1 로테이션 소개팅 */}
            <div className="bg-gray-50 rounded-lg p-4 md:p-6 border border-gray-200">
              <h2 className="text-lg md:text-xl font-bold mb-2 text-[#0e6d62]">
                ⚠️ 추후 상위 20%를 위한 1대1 로테이션 소개팅에 참여 의향이 있으신가요?
              </h2>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="rotationAgreement"
                    value="yes"
                    checked={formData.rotationAgreement === "yes"}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-[#0e6d62] border-gray-300"
                  />
                  <span>예, 가능합니다</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="rotationAgreement"
                    value="no"
                    checked={formData.rotationAgreement === "no"}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-[#0e6d62] border-gray-300"
                  />
                  <span>아니요 (괜찮아요)</span>
                </label>
              </div>
              {errors.rotationAgreement && (
                <p className="text-red-500 text-sm mt-2">{errors.rotationAgreement}</p>
              )}
            </div>

            {/* 환불규정 및 유의사항 */}
            <div className="bg-gray-50 rounded-lg p-4 md:p-6 border border-gray-200">
              <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-[#0e6d62]">
                ⚠️ 환불규정 및 유의사항에 대해 모두 이해하고 동의를 거부하실 수 있으나 참여가 불가능합니다.
              </h2>
              <div className="space-y-1.5 md:space-y-2 text-xs md:text-sm text-gray-700 mb-3 md:mb-4">
                <p>• 노쇼시 어떠한 경우에도 환불 불가</p>
                <p>• 취소 및 환불은 대관 및 준비로 7일 전까지 가능합니다.</p>
                <p>• 참가일 5일전 이상 50% 공제 후 환불 1일전 부턴 어떠한 경우에도 환불 불가능</p>
                <p>• 호스트의 확정 공지를 받은 분들에 한해서만 참가 가능합니다.</p>
                <p>• 참가 인원 미달 시 일정이 변경될 수 있습니다.</p>
                <p>• 특별한 경우 세부적인 일정 및 장소 등은 변경될 수 있습니다.</p>
                <p>• 모임 진행을 위해 인증 등을 받고 있습니다.</p>
                <p>• 모임 진행 중 본인 부주의로 인한 사고는 책임지지 않습니다.</p>
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="refundAgreement"
                    value="agree"
                    checked={formData.refundAgreement === "agree"}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-[#0e6d62] border-gray-300"
                  />
                  <span className="font-semibold text-[#0e6d62]">동의</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="refundAgreement"
                    value="disagree"
                    checked={formData.refundAgreement === "disagree"}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-[#0e6d62] border-gray-300"
                  />
                  <span>미동의</span>
                </label>
              </div>
              {errors.refundAgreement && (
                <p className="text-red-500 text-sm mt-2">{errors.refundAgreement}</p>
              )}
            </div>

            {/* 제출 버튼 */}
            <div className="flex justify-center">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#0e6d62] text-white font-bold py-3 md:py-4 px-8 md:px-12 rounded-lg hover:bg-[#0a5a50] transition-colors text-base md:text-lg cursor-pointer"
              >
                제출
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ApplyPage;

