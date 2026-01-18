'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function AdminPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // 1. 영주님의 진짜 테이블 이름 'survey_results'로 연결합니다.
      const { data: surveyData, error } = await supabase
        .from('survey_results') 
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('데이터 가져오기 실패:', error);
      } else {
        setData(surveyData || []);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) return <div className="p-10 text-lg">데이터를 불러오는 중입니다... ⏳</div>;

  return (
    <div className="p-8 min-h-screen bg-gray-50 text-black">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">📊 설문 응답 관리자</h1>
        
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="p-4 text-left font-semibold text-gray-600">날짜</th>
                <th className="p-4 text-left font-semibold text-gray-600">신청자 이름</th>
                <th className="p-4 text-left font-semibold text-gray-600">앱 제목 (아이디어)</th>
                <th className="p-4 text-left font-semibold text-gray-600">관리</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id} className="hover:bg-blue-50 transition border-b last:border-0">
                  
                  {/* 날짜: created_at */}
                  <td className="p-4 text-gray-600">
                    {new Date(item.created_at).toLocaleDateString()}
                  </td>
                  
                  {/* 이름: respondent_name */}
                  <td className="p-4 font-bold text-gray-800">
                    {item.respondent_name}
                  </td>
                  
                  {/* 앱 제목: app_title */}
                  <td className="p-4 text-gray-600">
                    {item.app_title || "제목 없음"}
                  </td>
                  
                  {/* 열기 버튼 */}
                  <td className="p-4">
                    <Link 
                      href={`/admin/${item.id}`} 
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition"
                    >
                      상세보기 →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* 데이터가 없을 때 안내 문구 */}
          {data.length === 0 && (
            <div className="p-10 text-center text-gray-500">
              아직 들어온 설문 데이터가 없습니다. <br/>
              (Supabase에 데이터가 있는지 확인해주세요!)
            </div>
          )}
        </div>
      </div>
    </div>
  );
}