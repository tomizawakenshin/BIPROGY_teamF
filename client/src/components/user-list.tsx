'use client';

import { Button } from '@/components/button';
import { getUsers, selectUser } from '@/util/fetcher';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type User = {
  name: string;
  status: string;
  id: number;
};

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
      {users.map((user) => (
        <div key={user.name} className='flex justify-between items-center py-2'>
          <span>{user.name}</span>
          <span>{user.status}</span>
          <Button onClick={() => jumpToUser(user.id)}>質問する</Button>
        </div>
      ))}
    </div>
  );
}
