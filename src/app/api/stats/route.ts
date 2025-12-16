import { NextRequest, NextResponse } from 'next/server';

const APPS_SCRIPT_URL = process.env.GOOGLE_APPS_SCRIPT_URL || 
  `https://script.google.com/macros/s/${process.env.GOOGLE_APPS_ID}/exec`;

// 신청 현황 조회
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');
    const partyType = searchParams.get('partyType');
    
    if (!partyType) {
      return NextResponse.json(
        { error: 'partyType parameter is required' },
        { status: 400 }
      );
    }
    
    // 쿼리 파라미터 구성
    const params = new URLSearchParams();
    if (date) params.append('date', date);
    params.append('partyType', partyType);
    
    const url = `${APPS_SCRIPT_URL}?${params.toString()}`;
    
    const response = await fetch(url);
    const stats = await response.json();
    
    // Apps Script에서 에러가 반환된 경우
    if (stats.error) {
      return NextResponse.json(stats, { status: 500 });
    }
    
    return NextResponse.json(stats);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}

