import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { to, subject, text } = await request.json();

    // 환경 변수 로딩 확인 (디버깅용)
    if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
      console.error('환경 변수(GMAIL_USER, GMAIL_PASS)가 없습니다!');
      return NextResponse.json({ success: false, message: '서버 설정 오류' }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: to,
      subject: subject,
      text: text,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: '전송 성공' });

  } catch (error) {
    console.error('이메일 전송 상세 에러:', error);
    return NextResponse.json({ success: false, message: '전송 실패' }, { status: 500 });
  }
}