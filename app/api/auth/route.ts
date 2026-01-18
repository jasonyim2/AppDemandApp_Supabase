import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  // .env.local에 있는 비밀번호를 가져옵니다.
  const correctPassword = process.env.ADMIN_PASSWORD;

  // 사용자가 입력한 비번과 진짜 비번이 같은지 확인
  if (body.password === correctPassword) {
    const response = NextResponse.json({ success: true });
    // 정답이면 'admin_session'이라는 입장권을 줍니다.
    response.cookies.set('admin_session', 'authenticated', {
      httpOnly: true,
      path: '/',
    });
    return response;
  }
  // 틀리면 에러 메시지
  return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
}