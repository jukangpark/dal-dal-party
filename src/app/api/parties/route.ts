import { NextRequest, NextResponse } from 'next/server';

const APPS_SCRIPT_URL = process.env.GOOGLE_APPS_SCRIPT_URL || 
  `https://script.google.com/macros/s/${process.env.GOOGLE_APPS_ID}/exec`;

// 파티 일정 조회
export async function GET(request: NextRequest) {
  try {
    const url = `${APPS_SCRIPT_URL}?action=parties`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    // Apps Script에서 에러가 반환된 경우
    if (data.error) {
      return NextResponse.json(
        { error: data.error, parties: [] },
        { status: 500 }
      );
    }
    
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch parties', parties: [] },
      { status: 500 }
    );
  }
}

