'use client';

import { useEffect, useState } from "react"
import { supabase } from '@/lib/supabase'
// ▼▼▼ [추가 1] 페이지 이동을 위한 Link 도구를 가져옵니다.
import Link from "next/link" 

import { IOSTabBar } from "@/components/ios-tab-bar"
import { RequestCard } from "@/components/request-card"
import { RequestCardSkeleton } from "@/components/skeletons/request-card-skeleton"
import { RefreshCw } from "lucide-react"

export default function Home() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchData = async () => {
    const { data: surveyData, error } = await supabase
      .from('survey_results')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) {
      console.error('데이터 로딩 에러:', error);
    } else {
      const formattedData = surveyData?.map(item => ({
        ...item,
        request_id: item.id,
        submitted_at: item.created_at,
        requester_name: item.respondent_name || '익명',
        request_content: item.app_title || '제목 없음',
        votes: 0
      })) || [];
      
      setData(formattedData);
    }
    setLoading(false);
    setIsRefreshing(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchData();
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="sticky top-0 z-40 glass-effect border-b border-[#e5e5ea]/50 px-4 pb-3 pt-14 bg-white/80 backdrop-blur-md">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[34px] font-bold tracking-tight text-[#1c1c1e]">Recent Ideas</h1>
            <p className="text-xs text-gray-500 mt-1">최신 10개 아이디어 (Fast Mode)</p>
          </div>
          <button
            onClick={handleRefresh}
            className="rounded-full p-2 transition-colors hover:bg-[#e5e5ea]"
            aria-label="Refresh"
            disabled={loading || isRefreshing}
          >
            <RefreshCw className={`h-6 w-6 text-[#007aff] ${isRefreshing ? "animate-spin" : ""}`} />
          </button>
        </div>
      </header>

      <main className="space-y-3 p-4">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="animate-pulse">
               <RequestCardSkeleton />
            </div>
          ))
        ) : data.length === 0 ? (
          <div className="rounded-2xl border border-[#e5e5ea]/70 bg-white/60 p-8 text-center text-[#8e8e93]">
            아직 등록된 아이디어가 없습니다.
          </div>
        ) : (
          data.map((item, index) => (
            <div key={item.request_id} className="animate-slide-up" style={{ animationDelay: `${index * 50}ms` }}>
              
              {/* ▼▼▼ [추가 2] 카드를 Link로 감싸서 클릭하면 이동하게 만듭니다! ▼▼▼ */}
              <Link href={`/admin/${item.request_id}`} className="block transition-transform active:scale-95">
                <RequestCard request={item} studentName={item.requester_name} />
              </Link>
              {/* ▲▲▲ 문고리 장착 완료 ▲▲▲ */}

            </div>
          ))
        )}
      </main>

      <IOSTabBar />
    </div>
  )
}