'use client';

import Link from "next/link";
import Image from "next/image"; // 이미지를 불러오는 도구 추가
import { ShieldCheck } from "lucide-react"; // Sparkles는 이제 안 씁니다.

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex flex-col items-center justify-center p-6 text-center font-sans">
      
      {/* 로고 영역 (수정됨) */}
      <div className="mb-8 animate-bounce-slow">
        {/* 기존의 Sparkles 아이콘 대신, 영주님의 로고 이미지를 넣습니다. */}
        <Image 
          src="/logo.png" // public 폴더에 넣은 파일 이름
          alt="CompassLab Logo"
          width={100} // 너비 (원하는 크기로 조절 가능)
          height={100} // 높이
          className="rounded-xl" // 약간 둥글게 처리 (선택 사항)
          priority // 가장 먼저 로딩되도록 설정
        />
      </div>

      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
        당신의 아이디어를<br/>
        <span className="text-blue-600">현실로 만들어 드립니다</span>
      </h1>
      
      <p className="text-gray-500 text-lg md:text-xl max-w-2xl mb-12 leading-relaxed">
        복잡한 코딩 없이, 상상만 하세요.<br/>
        나머지는 전문 컨설턴트가 해결해 드립니다.
      </p>

      <div className="flex flex-col md:flex-row gap-4 w-full max-w-md">
        {/* 소비자용: Tally 설문 버튼 */}
        <a 
          href="https://tally.so/r/zxMZg8" 
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-blue-600 text-white font-bold py-4 px-8 rounded-xl hover:bg-blue-700 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex justify-center items-center"
        >
          🚀 앱 아이디어 제안
        </a>

        {/* 관리자용: 로그인 버튼 */}
        <Link 
          href="/admin" 
          className="flex-1 bg-white text-gray-700 font-bold py-4 px-8 rounded-xl border border-gray-200 hover:bg-gray-50 transition flex justify-center items-center gap-2"
        >
          <ShieldCheck className="w-5 h-5" /> 관리자 로그인
        </Link>
      </div>

      {/* 하단 저작권 표시 */}
      <footer className="mt-20 text-gray-400 text-sm">
        © 2026 CompassLab. All rights reserved.
      </footer>
    </div>
  );
}