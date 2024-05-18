'use client';

import { getPoint } from '@/util/fetcher';
import { useEffect, useState } from 'react';

export function PointView() {
  const [point, setPoint] = useState(0);

  useEffect(() => {
    getPoint().then((p) => setPoint(p));
  }, []);

  return (
    <div className='p-4 border-2 rounded border-zinc-400 space-y-4'>
      <h2 className='text-2xl'>獲得ポイント</h2>
      <div className='flex justify-between text-xl'>
        <span className='text-3xl'>{point}</span>
        <span>pt</span>
      </div>
    </div>
  );
}
