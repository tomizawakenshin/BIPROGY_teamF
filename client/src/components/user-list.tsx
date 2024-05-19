'use client';

import { Button } from '@/components/button';
import { User } from '@/types/data';
import { emojis } from '@/utils/assets';
import { getUsers, selectUser } from '@/utils/fetcher';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const router = useRouter();

  const jumpToUser = async (id: number) => {
    await selectUser(id);
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      router.push('https://line.me/R');
    }
  };

  useEffect(() => {
    getUsers().then((users) => {
      setUsers(users);
    });
  }, []);

  return (
    <div>
      <h2 className='text-2xl'>ユーザーステータス一覧</h2>
      <div>
        {emojis.map((emoji) => (
          <div key={emoji.text}>
            <h3 className='text-xl'>
              {emoji.label}
              {emoji.text}
            </h3>
            <div className='space-y-2 pl-6'>
              {users
                .filter((user) => user.status === emoji.label)
                .map((user) => (
                  <div key={user.id} className='flex justify-between items-center gap-2'>
                    <span>{user.name}</span>
                    <Button
                      className='border-zinc-400 hover:bg-zinc-100'
                      onClick={() => jumpToUser(user.id)}
                    >
                      選択
                    </Button>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
