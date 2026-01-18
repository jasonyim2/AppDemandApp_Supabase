import { createClient } from '@supabase/supabase-js';

// 환경 변수 파일(.env.local)에서 주소와 키를 가져옵니다.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Supabase와 연결을 시작합니다.
export const supabase = createClient(supabaseUrl, supabaseKey);