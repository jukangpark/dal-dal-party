import { NextRequest, NextResponse } from 'next/server';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;
const SUPABASE_BUCKET_NAME = 'sulgaeting';

// 이미지 업로드 API (서버 사이드에서 Service Key 사용)
export async function POST(request: NextRequest) {
  try {
    // 환경 변수 확인
    if (!SUPABASE_URL) {
      return NextResponse.json(
        { success: false, error: 'Supabase URL is not configured' },
        { status: 500 }
      );
    }

    if (!SUPABASE_SERVICE_KEY) {
      return NextResponse.json(
        { success: false, error: 'Supabase Service Key is not configured' },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const originalPath = formData.get('path') as string;
    const partyType = formData.get('partyType') as string; // 파티 타입 (sulgaeting, hexagon-party, star-party)
    const applicantId = formData.get('applicantId') as string; // 신청자 고유 ID (Google Sheets 행 ID)

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'File is required' },
        { status: 400 }
      );
    }

    // 파일 확장자 추출 (원본 파일에서)
    const fileExtension = file.name.includes('.') 
      ? file.name.substring(file.name.lastIndexOf('.'))
      : '.jpg'; // 기본값

    // 완전히 새로운 안전한 파일명 생성
    // 신청자 ID + 타임스탬프 + 랜덤 문자열로 고유성 보장
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 10); // 8자리 랜덤 문자열
    const safeFileName = applicantId 
      ? `${applicantId}_${timestamp}_${randomStr}${fileExtension}`
      : `${timestamp}_${randomStr}${fileExtension}`;
    
    // 파티 타입 결정 (originalPath에서 추출하거나 전달받은 값 사용)
    let finalPartyType = partyType || 'sulgaeting'; // 기본값
    if (!partyType && originalPath) {
      // originalPath에서 파티 타입 추출 시도
      if (originalPath.includes('hexagon-party')) {
        finalPartyType = 'hexagon-party';
      } else if (originalPath.includes('star-party')) {
        finalPartyType = 'star-party';
      } else {
        finalPartyType = 'sulgaeting';
      }
    }
    
    // 파일 타입 추출 (id, personal, jobproof, photo 등)
    let fileType = 'other'; // 기본값
    if (originalPath) {
      const pathParts = originalPath.split('_');
      // path에서 파일 타입 찾기
      for (const part of pathParts) {
        if (part === 'id' || part === 'personal' || part === 'jobproof' || part === 'photo') {
          fileType = part;
          break;
        }
      }
    }
    
    // 폴더 구조 생성: {partyType}/{fileType}/{filename}
    // 예: sulgaeting/id/1765851870642_a3b4c5d6.png
    const safePath = `${finalPartyType}/${fileType}/${safeFileName}`;

    // Supabase Storage에 업로드 (Service Key 사용)
    // FormData를 사용하여 multipart/form-data 형식으로 업로드
    const uploadFormData = new FormData();
    uploadFormData.append('file', file);

    const response = await fetch(
      `${SUPABASE_URL}/storage/v1/object/${SUPABASE_BUCKET_NAME}/${safePath}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
          'apikey': SUPABASE_SERVICE_KEY || '',
          'x-upsert': 'true',
        },
        body: uploadFormData
      }
    );

    if (response.ok) {
      const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/${SUPABASE_BUCKET_NAME}/${safePath}`;
      return NextResponse.json({ success: true, url: publicUrl });
    } else {
      const errorText = await response.text();
      let errorMessage = errorText;
      
      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.message || errorJson.error || errorText;
      } catch {
        // JSON 파싱 실패 시 원본 텍스트 사용
      }
      
      
      return NextResponse.json(
        { success: false, error: errorMessage },
        { status: response.status }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to upload image' },
      { status: 500 }
    );
  }
}

