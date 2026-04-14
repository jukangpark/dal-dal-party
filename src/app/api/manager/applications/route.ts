import { NextRequest, NextResponse } from 'next/server';

const APPS_SCRIPT_URL = process.env.GOOGLE_APPS_SCRIPT_URL ||
  `https://script.google.com/macros/s/${process.env.GOOGLE_APPS_ID}/exec`;

const MANAGER_PW = process.env.NEXT_PUBLIC_MANAGER_PASSWORD;

function checkAuth(request: NextRequest) {
  const sent = request.headers.get('x-manager-password');
  return MANAGER_PW && sent === MANAGER_PW;
}

// 신청 목록 조회 (관리자용 - 전체 데이터 포함)
export async function GET(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: '인증 실패' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');
    const partyType = searchParams.get('partyType') || 'sulgaeting';

    const params = new URLSearchParams();
    params.append('action', 'getApplications');
    params.append('partyType', partyType);
    if (date) params.append('date', date);

    const url = `${APPS_SCRIPT_URL}?${params.toString()}`;
    const response = await fetch(url, { redirect: 'follow' });
    const data = await response.json();

    if (data.error) {
      return NextResponse.json({ error: data.error, applications: [] }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: '신청 목록을 불러오는데 실패했습니다.', applications: [] }, { status: 500 });
  }
}

// 승인 상태 업데이트
export async function PATCH(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: '인증 실패' }, { status: 401 });
  }
  try {
    const body = await request.json();
    const { rowId, partyType, status } = body;

    if (!rowId || !partyType || !status) {
      return NextResponse.json({ error: 'rowId, partyType, status 필드가 필요합니다.' }, { status: 400 });
    }

    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'updateStatus',
        rowId,
        partyType,
        status, // 'approved' | 'rejected' | 'pending'
      }),
      redirect: 'follow',
    });

    const result = await response.json();

    if (result.success) {
      return NextResponse.json(result);
    } else {
      return NextResponse.json({ success: false, error: result.error || '상태 업데이트 실패' }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: '상태 업데이트 중 오류 발생' }, { status: 500 });
  }
}
