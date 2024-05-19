'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/button';
import { endQuestion, startQuestion } from '@/utils/fetcher';

export function QuestionStartEnd() {
  const router = useRouter();

  const onStart = async () => {
    const res = await startQuestion();
    // TODO: グループトークへのリダイレクト
    if (res) router.push('https://line.me/R');
  };

  const onEnd = async () => {
    const res = await endQuestion();
  };

  return (
    <div className='flex justify-between gap-2'>
      <Button onClick={onStart}>質問開始</Button>
      <Button onClick={onEnd}>質問終了</Button>
    </div>
  );
}
