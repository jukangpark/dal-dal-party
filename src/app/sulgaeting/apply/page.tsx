"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";


const ApplyPage = () => {
  const searchParams = useSearchParams();
  const dateFromQuery = searchParams.get('date') || '';
  const [formData, setFormData] = useState({
    // 개인정보 동의
    privacyAgreement: false,
    thirdPartyAgreement: false,
    
    // 기본 정보
    name: "", // 성함
    gender: "", // 성별
    birthDate: "", // 생년월일
    job: "", // 직업
    favoriteFood: "", // 좋아하는 안주
    height: "", // 키
    contact: "",
    
    // 추가 정보
    lookalike: "", // 닮은 연예인
    
    // 사진
    idPhoto: null as File | null, // 신분증 사진 (최대 1개)
    personalPhotos: [] as File[], // 본인 사진 (최대 2개)
    jobProofPhotos: [] as File[], // 직업 증명 서류 (최대 3개)
    
    // 방문 경로
    visitRoute: "",
    visitRouteOther: "",
    
    // 동의 사항
    refundAgreement: "",
    freePartyAgreement: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previews, setPreviews] = useState<{
    idPhoto: string | null;
    personalPhotos: string[];
    jobProofPhotos: string[];
  }>({
    idPhoto: null,
    personalPhotos: [],
    jobProofPhotos: [],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked,
      }));
    } else if (type === "radio") {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleIdPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData(prev => ({
        ...prev,
        idPhoto: file,
      }));
      // 미리보기 생성
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews(prev => ({
          ...prev,
          idPhoto: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePersonalPhotosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).slice(0, 2);
      setFormData(prev => ({
        ...prev,
        personalPhotos: files,
      }));
      // 미리보기 생성
      const previewPromises = files.map(file => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(reader.result as string);
          };
          reader.readAsDataURL(file);
        });
      });
      Promise.all(previewPromises).then(previewUrls => {
        setPreviews(prev => ({
          ...prev,
          personalPhotos: previewUrls,
        }));
      });
    }
  };

  const handleJobProofPhotosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).slice(0, 3);
      setFormData(prev => ({
        ...prev,
        jobProofPhotos: files,
      }));
      // 미리보기 생성
      const previewPromises = files.map(file => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(reader.result as string);
          };
          reader.readAsDataURL(file);
        });
      });
      Promise.all(previewPromises).then(previewUrls => {
        setPreviews(prev => ({
          ...prev,
          jobProofPhotos: previewUrls,
        }));
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.privacyAgreement) {
      newErrors.privacyAgreement = "개인정보 수집 및 이용에 동의해주세요.";
    }

    if (!formData.thirdPartyAgreement) {
      newErrors.thirdPartyAgreement = "개인정보 제 3자 제공에 동의해주세요.";
    }

    if (!formData.name) {
      newErrors.name = "성함을 입력해주세요.";
    }

    if (!formData.gender) {
      newErrors.gender = "성별을 선택해주세요.";
    }

    if (!formData.birthDate) {
      newErrors.birthDate = "생년월일을 입력해주세요.";
    }

    if (!formData.job) {
      newErrors.job = "직업을 입력해주세요.";
    }

    if (!formData.favoriteFood) {
      newErrors.favoriteFood = "좋아하는 안주를 입력해주세요.";
    }

    if (!formData.height) {
      newErrors.height = "키를 입력해주세요.";
    }

    if (!formData.contact) {
      newErrors.contact = "연락처를 입력해주세요.";
    }

    if (!formData.lookalike) {
      newErrors.lookalike = "닮은 연예인, 인플루언서, 유튜버를 입력해주세요.";
    }

    if (!formData.idPhoto) {
      newErrors.idPhoto = "신분증 사진을 제출해주세요.";
    }

    if (formData.personalPhotos.length === 0) {
      newErrors.personalPhotos = "최근 본인 사진을 1장 이상 제출해주세요.";
    }

    if (formData.jobProofPhotos.length === 0) {
      newErrors.jobProofPhotos = "직업 증명 서류를 제출해주세요.";
    }

    if (!formData.visitRoute) {
      newErrors.visitRoute = "방문 경로를 선택해주세요.";
    }

    if (formData.visitRoute === "other" && !formData.visitRouteOther) {
      newErrors.visitRouteOther = "기타 방문 경로를 입력해주세요.";
    }

    if (formData.refundAgreement !== "agree") {
      newErrors.refundAgreement = "환불규정 및 유의사항에 동의해주세요.";
    }

    if (!formData.freePartyAgreement) {
      newErrors.freePartyAgreement = "무료파티 초대 참여 의향을 선택해주세요.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Supabase에 이미지 업로드하는 함수 (서버 사이드 API Route 사용)
  const uploadToSupabase = async (file: File, path: string, applicantId: string): Promise<string | null> => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('path', path);
      formData.append('partyType', 'sulgaeting'); // 파티 타입 전달
      formData.append('applicantId', applicantId); // 신청자 고유 ID 전달
      
      // Next.js API Route를 통해 서버 사이드에서 Service Key 사용
      const response = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData
      });
      
      const result = await response.json();
      
      if (result.success && result.url) {
        return result.url;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm() && !isSubmitting) {
      setIsSubmitting(true);
      
      try {
        // ID 생성
        const id = Date.now().toString();
        
        // 1단계: 이미지를 Supabase에 업로드하고 URL 가져오기
        let idPhotoUrl = '';
        let personalPhotoUrls: string[] = [];
        let jobProofPhotoUrls: string[] = [];
        
        // 신분증 사진 업로드
        if (formData.idPhoto) {
          const path = `${id}_id_${formData.idPhoto.name}`;
          const url = await uploadToSupabase(formData.idPhoto, path, id);
          if (url) idPhotoUrl = url;
        }
        
        // 본인 사진 업로드
        if (formData.personalPhotos.length > 0) {
          const uploadPromises = formData.personalPhotos.map(async (photo, index) => {
            const path = `${id}_personal_${index + 1}_${photo.name}`;
            return await uploadToSupabase(photo, path, id);
          });
          const urls = await Promise.all(uploadPromises);
          personalPhotoUrls = urls.filter((url): url is string => url !== null);
        }
        
        // 직업 증명 서류 업로드
        if (formData.jobProofPhotos.length > 0) {
          const uploadPromises = formData.jobProofPhotos.map(async (photo, index) => {
            const path = `${id}_jobproof_${index + 1}_${photo.name}`;
            return await uploadToSupabase(photo, path, id);
          });
          const urls = await Promise.all(uploadPromises);
          jobProofPhotoUrls = urls.filter((url): url is string => url !== null);
        }
        
        // 2단계: API로 데이터 전송 (URL만 전송)
        const response = await fetch('/api/applications', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            partyType: 'sulgaeting',
            date: dateFromQuery,
            name: formData.name,
            gender: formData.gender,
            birthDate: formData.birthDate,
            job: formData.job,
            favoriteFood: formData.favoriteFood,
            height: formData.height,
            contact: formData.contact,
            lookalike: formData.lookalike,
            // 이미지 URL만 전송
            idPhotoUrl: idPhotoUrl,
            personalPhotoUrls: personalPhotoUrls,
            jobProofPhotoUrls: jobProofPhotoUrls,
            visitRoute: formData.visitRoute,
            visitRouteOther: formData.visitRouteOther,
            refundAgreement: formData.refundAgreement,
            freePartyAgreement: formData.freePartyAgreement,
          }),
        });
        
        const result = await response.json();
        
        if (result.success) {
          alert("신청이 완료되었습니다! 운영진 심사 후 결과를 안내드리겠습니다.");
          window.location.reload();
        } else {
          alert(`신청 중 오류가 발생했습니다: ${result.error || '알 수 없는 오류'}`);
          setIsSubmitting(false);
        }
      } catch (error) {
        alert('신청 중 오류가 발생했습니다. 다시 시도해주세요.');
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#d3ded3]">
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
              [광주] 술개팅 로테이션 소개팅 🍷
            </h2>
            <p className="text-center text-base md:text-lg mb-4 md:mb-6 text-gray-700">
              신분, 직업 확인 후, 여러명의 이성과 1대1로 20분씩 대화!
              <br />
              광주 최초 술과 함께하는 로테이션 소개팅 [술개팅]
            </p>

            <div className="bg-white rounded-lg p-4 md:p-6 mt-4 md:mt-8 border border-gray-200">
              <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-center text-[#0e6d62]">📅 기본정보</h3>
              <div className="space-y-3 text-sm text-gray-700">
                <div>
                  <span className="font-semibold text-[#0e6d62]">모집 대상:</span> 광주, 전남, 전북 솔로 남녀
                  <br />
                  <span className="text-xs text-gray-600">※ 같은 직장은 함께 신청한 경우 제외하고 배제</span>
                </div>
                <div>
                  <span className="font-semibold text-[#0e6d62]">선발 안내:</span>
                  <br />
                  <span>• 외모, 직업, 나이 등을 신중하게 고려하여 선정</span>
                  <br />
                  <span>• 마감 시 대기자 명단에 올라갑니다!</span>
                  <br />
                  <span>• 1:1 로테이션으로 최소 4명이상의 이성을 만나볼 수 있습니다.</span>
                  <br />
                  <span>• 여성의 경우 기수별 나이 제한보다 어려도 신청가능</span>
                  <br />
                  <span className="text-red-600 font-semibold">• 선발 시 본인 신분 확인을 위한 명함 or 재직증명서 확인</span>
                </div>
                <div>
                  <span className="font-semibold text-[#0e6d62]">참가비:</span>
                  <br />
                  <span>남성: 5만원 / 음주 안하면 4만원</span>
                  <br />
                  <span>여성: 3.5만원 / 음주 안하면 2.5만원</span>
                  <br />
                  <span className="text-xs text-gray-600">(안주/술/대관료/부대비용 포함된 금액)</span>
                </div>
                <div>
                  <span className="font-semibold text-[#0e6d62]">장소:</span> (선정자 개별공지 예정)
                </div>
                <div className="mt-4 bg-yellow-50 rounded p-3 border border-yellow-200">
                  <p className="text-xs md:text-sm font-semibold text-gray-700">
                    • 선정된 분께는 개별 문자가 갑니다. (1일 이내)
                    <br />
                    • 최적의 인원이 선정되면 마감됩니다.
                    <br />
                    • 기존 참가자는 DM 또는 카톡으로 알려주시면 자동 접수됩니다.
                  </p>
                  <p className="text-xs md:text-sm text-gray-700 mt-2">
                    인스타그램: <span className="font-extrabold">@sulgaeting</span>
                    <br />
                    카카오ID: <span className="font-extrabold">sulgaeting</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-8">
            {/* 개인정보 수집 및 이용 동의 */}
            <div className="bg-gray-50 rounded-lg p-4 md:p-6 border border-gray-200">
              <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-[#0e6d62]">
                ⚠️ 개인정보 수집 및 이용 동의
              </h2>
              <p className="text-sm text-gray-600 mb-3">동의를 거부할 수 있으나 설문 참여가 불가능합니다.</p>
              <div className="mb-4 space-y-2 text-sm text-gray-700">
                <p><strong>수집하는 개인정보 항목:</strong> 이름, 연락처, 직업, 신분증, 본인사진</p>
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
                <span className="font-semibold text-[#0e6d62]">개인정보 수집 및 이용에 동의합니다.</span>
              </label>
              {errors.privacyAgreement && (
                <p className="text-red-500 text-sm mt-2">{errors.privacyAgreement}</p>
              )}
            </div>

            {/* 개인정보 제 3자 제공 동의 */}
            <div className="bg-gray-50 rounded-lg p-4 md:p-6 border border-gray-200">
              <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-[#0e6d62]">
                ⚠️ 개인정보 제 3자 제공 동의
              </h2>
              <p className="text-sm text-gray-600 mb-3">동의를 거부하실 수 있으나 설문 참여가 불가능합니다.</p>
              <div className="mb-4 space-y-2 text-sm text-gray-700">
                <p><strong>제공받는 자:</strong> 술개팅</p>
                <p><strong>제공받는 자의 이용 목적:</strong> 지원자 선정</p>
                <p><strong>제공하는 항목:</strong> 이름, 연락처, 신분증, 본인사진, 직업</p>
                <p><strong>제공받는 자의 보유 및 이용기간:</strong> 참여 신청 후 12개월 (별도 요청 시 즉시 삭제처리)</p>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="thirdPartyAgreement"
                  checked={formData.thirdPartyAgreement}
                  onChange={handleInputChange}
                  className="w-5 h-5 text-[#0e6d62] border-gray-300 rounded"
                />
                <span className="font-semibold text-[#0e6d62]">개인정보 제 3자 제공에 동의합니다.</span>
              </label>
              {errors.thirdPartyAgreement && (
                <p className="text-red-500 text-sm mt-2">{errors.thirdPartyAgreement}</p>
              )}
            </div>

            {/* 기본 정보 */}
            <div className="bg-gray-50 rounded-lg p-4 md:p-6 border border-gray-200 space-y-3 md:space-y-4">
              <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-[#0e6d62]">기본 정보</h2>
              
              <div>
                <label className="block mb-1.5 md:mb-2 text-sm md:text-base font-semibold text-[#0e6d62]">
                  성함 *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 md:px-4 py-2 rounded text-sm md:text-base text-gray-900 border border-gray-300"
                  placeholder="성함을 입력해주세요"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block mb-1.5 md:mb-2 text-sm md:text-base font-semibold text-[#0e6d62]">
                  성별 *
                </label>
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
                <label className="block mb-1.5 md:mb-2 text-sm md:text-base font-semibold text-[#0e6d62]">
                  생년월일 *
                </label>
                <input
                  type="number"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleInputChange}
                  className="w-full px-3 md:px-4 py-2 rounded text-sm md:text-base text-gray-900 border border-gray-300"
                  placeholder="ex. 940220"
                />
                <p className="text-xs text-gray-600 mt-1">예시: 940220</p>
                {errors.birthDate && <p className="text-red-500 text-sm mt-1">{errors.birthDate}</p>}
              </div>

              <div>
                <label className="block mb-1.5 md:mb-2 text-sm md:text-base font-semibold text-[#0e6d62]">
                  직업 *
                </label>
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
                <label className="block mb-1.5 md:mb-2 text-sm md:text-base font-semibold text-[#0e6d62]">
                  좋아하는 안주 *
                </label>
                <input
                  type="text"
                  name="favoriteFood"
                  value={formData.favoriteFood}
                  onChange={handleInputChange}
                  className="w-full px-3 md:px-4 py-2 rounded text-sm md:text-base text-gray-900 border border-gray-300"
                  placeholder="좋아하는 안주를 입력해주세요"
                />
                {errors.favoriteFood && <p className="text-red-500 text-sm mt-1">{errors.favoriteFood}</p>}
              </div>

              <div>
                <label className="block mb-1.5 md:mb-2 text-sm md:text-base font-semibold text-[#0e6d62]">
                  키 *
                </label>
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleInputChange}
                  className="w-full px-3 md:px-4 py-2 rounded text-sm md:text-base text-gray-900 border border-gray-300"
                  placeholder="키를 입력해주세요 (cm)"
                />
                {errors.height && <p className="text-red-500 text-sm mt-1">{errors.height}</p>}
              </div>

              <div>
                <label className="block mb-1.5 md:mb-2 text-sm md:text-base font-semibold text-[#0e6d62]">
                  연락처 *
                </label>
                <input
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  className="w-full px-3 md:px-4 py-2 rounded text-sm md:text-base text-gray-900 border border-gray-300"
                  placeholder="ex. 010-XXXX-XXXX"
                />
                <p className="text-sm text-gray-600 mt-1">
                  * 꼭 정확히 입력해주세요. 잘못 기재한 경우, 연락할 방법이 없습니다.
                </p>
                <p className="text-sm text-red-600 mt-1 font-semibold">
                  * 카카오톡 전화번호로 친구 추가 허용 부탁드려요!! &lt;&lt; &quot;반드시 확인 필요&quot;
                </p>
                {errors.contact && <p className="text-red-500 text-sm mt-1">{errors.contact}</p>}
              </div>
            </div>

            {/* 닮은꼴 명찰 */}
            <div className="bg-gray-50 rounded-lg p-4 md:p-6 border border-gray-200">
              <h2 className="text-lg md:text-xl font-bold mb-2 text-[#0e6d62]">
                닮은 연예인, 인플루언서, 유튜버 (동물, 케릭터 제외) *
              </h2>
              <p className="text-xs md:text-sm text-gray-600 mb-3 md:mb-4">
                인스타에 올릴때 추가해서 올려요.
                <br />
                필수 입력
              </p>
              <p className="text-xs md:text-sm text-gray-500 mb-3 md:mb-4">
                ex) 프리랜서/98/이이경, 자영업/92/조진웅, 회사원/92/성시경, 대기업/94/강동원, 자영업/98/카리나, 회사원/95/아이유
              </p>
              <input
                type="text"
                name="lookalike"
                value={formData.lookalike}
                onChange={handleInputChange}
                className="w-full px-3 md:px-4 py-2 rounded text-sm md:text-base text-gray-900 border border-gray-300"
                placeholder="닮은 연예인, 인플루언서, 유튜버를 입력해주세요"
              />
              {errors.lookalike && <p className="text-red-500 text-sm mt-1">{errors.lookalike}</p>}
            </div>

            {/* 신분증 사진 */}
            <div className="bg-gray-50 rounded-lg p-4 md:p-6 border border-gray-200">
              <h2 className="text-lg md:text-xl font-bold mb-2 text-[#0e6d62]">
                신분증 사진 제출 *
              </h2>
              <p className="text-xs md:text-sm text-gray-600 mb-3 md:mb-4">
                사진/ 이름/ 생년월일만 나오게 촬영하여 제출
                <br />
                <span className="text-red-600 font-semibold">* 주민번호 뒷자리는 가려주세요.</span>
              </p>
              <p className="text-xs md:text-sm text-gray-500 mb-3 md:mb-4">
                사진 첨부는 최대 1개만 가능합니다.
                <br />
                사진 1개당 용량: 10mb
                <br />
                첨부 가능 파일: jpg, jpeg, png
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={handleIdPhotoChange}
                className="w-full px-3 md:px-4 py-2 rounded text-sm md:text-base text-gray-900 border border-gray-300"
              />
              {formData.idPhoto && (
                <div className="mt-2">
                  <p className="text-sm text-gray-600 mb-2">
                    선택된 파일: {formData.idPhoto.name}
                  </p>
                  {previews.idPhoto && (
                    <div className="relative w-full max-w-xs aspect-video rounded-lg overflow-hidden border border-gray-300">
                      <img
                        src={previews.idPhoto}
                        alt="신분증 미리보기"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                </div>
              )}
              {errors.idPhoto && <p className="text-red-500 text-sm mt-1">{errors.idPhoto}</p>}
            </div>

            {/* 최근 본인 사진 */}
            <div className="bg-gray-50 rounded-lg p-4 md:p-6 border border-gray-200">
              <h2 className="text-lg md:text-xl font-bold mb-2 text-[#0e6d62]">
                최근 본인 사진 제출 *
              </h2>
              <p className="text-xs md:text-sm text-gray-600 mb-3 md:mb-4">
                본인확인이 가능한 사진으로 첨부해주세요
              </p>
              <p className="text-xs md:text-sm text-gray-500 mb-3 md:mb-4">
                사진 첨부는 최대 2개만 가능합니다.
                <br />
                사진 1개당 용량: 10mb
                <br />
                첨부 가능 파일: jpg, jpeg, png
              </p>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handlePersonalPhotosChange}
                className="w-full px-3 md:px-4 py-2 rounded text-sm md:text-base text-gray-900 border border-gray-300"
              />
              {formData.personalPhotos.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm text-gray-600 mb-2">
                    선택된 파일: {formData.personalPhotos.length}개 / 2개
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {previews.personalPhotos.map((preview, index) => (
                      <div key={index} className="relative w-full aspect-square rounded-lg overflow-hidden border border-gray-300">
                        <img
                          src={preview}
                          alt={`본인 사진 ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {errors.personalPhotos && <p className="text-red-500 text-sm mt-1">{errors.personalPhotos}</p>}
            </div>

            {/* 직업 증명 서류 */}
            <div className="bg-gray-50 rounded-lg p-4 md:p-6 border border-gray-200">
              <h2 className="text-lg md:text-xl font-bold mb-2 text-[#0e6d62]">
                직업 증명 서류 제출 (택 1) *
              </h2>
              <p className="text-xs md:text-sm text-gray-600 mb-3 md:mb-4">
                핸드폰 카메라로 촬영 제출 가능
              </p>
              <div className="mb-3 md:mb-4 space-y-1 text-xs md:text-sm text-gray-700">
                <p>• 재직증명서 or 사원증 or 명함 (발급일 최대 6개월 이내 회사명이 모두 나오는 원본으로 부탁드립니다)</p>
                <p>• 건강보험자격득실확인서</p>
                <p>• 사업자등록증</p>
                <p>• 학생증 (학번, 성함, 사진 모두 확인 가능하게 부탁드립니다)</p>
              </div>
              <p className="text-xs md:text-sm text-gray-500 mb-3 md:mb-4">
                사진 첨부는 최대 3개만 가능합니다.
                <br />
                사진 1개당 용량: 10mb
                <br />
                첨부 가능 파일: jpg, jpeg, png
              </p>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleJobProofPhotosChange}
                className="w-full px-3 md:px-4 py-2 rounded text-sm md:text-base text-gray-900 border border-gray-300"
              />
              {formData.jobProofPhotos.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm text-gray-600 mb-2">
                    선택된 파일: {formData.jobProofPhotos.length}개 / 3개
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {previews.jobProofPhotos.map((preview, index) => (
                      <div key={index} className="relative w-full aspect-square rounded-lg overflow-hidden border border-gray-300">
                        <img
                          src={preview}
                          alt={`직업 증명 ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {errors.jobProofPhotos && <p className="text-red-500 text-sm mt-1">{errors.jobProofPhotos}</p>}
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
                <option value="moram">모람</option>
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

            {/* 환불규정 및 유의사항 */}
            <div className="bg-gray-50 rounded-lg p-4 md:p-6 border border-gray-200">
              <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-[#0e6d62]">
                ⚠️ 환불규정 및 유의사항에 대해 모두 이해하고 동의를 거부하실 수 있으나 참여가 불가능합니다.
              </h2>
              <div className="space-y-1.5 md:space-y-2 text-xs md:text-sm text-gray-700 mb-3 md:mb-4">
                <p>• 노쇼시 어떠한 경우에도 환불 불가</p>
                <p>• 취소 및 환불은 대관 및 준비로 7일 전까지 가능합니다.</p>
                <p>• 참가일 5일전 이상 50% 공제 후 환불</p>
                <p>• 호스트의 확정 공지를 받은 분들에 한해서만 참가 가능합니다.</p>
                <p>• 참가 인원 미달 시 일정이 변경될 수 있습니다.</p>
                <p>• 특별한 경우 세부적인 일정 및 장소 등은 변경될 수 있습니다.</p>
                <p>• 모임 진행을 위해 직장과 신원 인증을 받고 있습니다.</p>
                <p>• 진행시간에 늦으면 당일 참여가 불가능합니다.</p>
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

            {/* 무료파티 초대 */}
            <div className="bg-gray-50 rounded-lg p-4 md:p-6 border border-gray-200">
              <h2 className="text-lg md:text-xl font-bold mb-2 text-[#0e6d62]">
                원하시는 분에 한에 무료파티 초대해드리고 있습니다.
              </h2>
              <p className="text-xs md:text-sm text-gray-600 mb-3 md:mb-4">
                (성비 1.x 대 1/ 최소 10명 이상 참여)
                <br />
                참여조건: 네이버 폼 작성, 술개팅 참여자는 참가비 무료 / &quot;매달 예정&quot;
              </p>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="freePartyAgreement"
                    value="possible"
                    checked={formData.freePartyAgreement === "possible"}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-[#0e6d62] border-gray-300"
                  />
                  <span>참여 가능</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="freePartyAgreement"
                    value="impossible"
                    checked={formData.freePartyAgreement === "impossible"}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-[#0e6d62] border-gray-300"
                  />
                  <span>참여 불가능</span>
                </label>
              </div>
              {errors.freePartyAgreement && (
                <p className="text-red-500 text-sm mt-2">{errors.freePartyAgreement}</p>
              )}
            </div>

            {/* 제출 버튼 */}
            <div className="flex justify-center">
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={!isSubmitting ? { scale: 1.05 } : {}}
                whileTap={!isSubmitting ? { scale: 0.95 } : {}}
                className={`bg-[#0e6d62] text-white font-bold py-3 md:py-4 px-8 md:px-12 rounded-lg transition-colors text-base md:text-lg ${
                  isSubmitting 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:bg-[#0a5a50] cursor-pointer'
                }`}
              >
                {isSubmitting ? '제출 중...' : '제출'}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ApplyPage;

