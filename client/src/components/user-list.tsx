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
          <div key={emoji.path}>
            <h3 className='text-xl'>{emoji.text}</h3>
            <div className='space-y-2 pl-4'>
              {users
                .filter((user) => user.status === emoji.label)
                .map((user) => (
                  <div key={user.id} className='flex justify-between items-center gap-2'>
                    <span>{user.name}</span>
                    <Button onClick={() => jumpToUser(user.id)}>選択</Button>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
