import { NextRequest, NextResponse } from 'next/server';

const APPS_SCRIPT_URL = process.env.GOOGLE_APPS_SCRIPT_URL || 
  `https://script.google.com/macros/s/${process.env.GOOGLE_APPS_ID}/exec`;

// 신청 데이터 저장
export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();
    
    // Apps Script URL 확인
    if (!APPS_SCRIPT_URL || APPS_SCRIPT_URL.includes('undefined')) {
      return NextResponse.json(
        { success: false, error: 'Apps Script URL이 설정되지 않았습니다. 환경 변수를 확인해주세요.' },
        { status: 500 }
      );
    }
    
    // Apps Script로 데이터 전송
    // Apps Script 웹 앱은 리다이렉트를 따라가야 할 수 있음
    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
      redirect: 'follow', // 리다이렉트 자동 따라가기
    });
    
    // 응답 상태 확인
    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { success: false, error: `Apps Script 요청 실패 (${response.status}): ${errorText}` },
        { status: 500 }
      );
    }
    
    // 응답 텍스트로 먼저 받기
    const responseText = await response.text();
    
    // JSON 파싱 시도
    let result;
    try {
      result = JSON.parse(responseText);
    } catch (parseError) {
      return NextResponse.json(
        { success: false, error: `Apps Script 응답 파싱 실패: ${responseText.substring(0, 100)}` },
        { status: 500 }
      );
    }
    
    if (result.success) {
      return NextResponse.json(result);
    } else {
      return NextResponse.json(
        { success: false, error: result.error || 'Failed to save application' },
        { status: 500 }
      );
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류';
    return NextResponse.json(
      { success: false, error: `신청 저장 중 오류 발생: ${errorMessage}` },
      { status: 500 }
    );
  }
}

