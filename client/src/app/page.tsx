import { Button } from '@/components/button';
import { Divider } from '@/components/divider';
import { PointView } from '@/components/point-view';
import { QuestionStartEnd } from '@/components/question-start-end';

const users = [
  { name: 'user1', status: '質問対応中🙅‍♀️' },
  { name: 'user2', status: '待機中🙆‍♀️' },
  { name: 'user3', status: '待機中🙆‍♀️' },
  { name: 'user4', status: '質問対応中🙅‍♀️' },
  { name: 'user5', status: '待機中🙆‍♀️' },
];

export default function Home() {
  return (
    <main className='flex flex-col items-center justify-center min-h-screen bg-zinc-200'>
      <div className='bg-white p-8 rounded shadow-lg space-y-4'>
        <h1 className='text-4xl font-bold'>エンジニアの質問箱</h1>
        <QuestionStartEnd />
        <Divider />
        <PointView />
        <Divider />
        <div>
          <h2>ステータス</h2>
          <Button>質問対応中🙅‍♀️</Button>
          <Button>待機中🙆‍♀️</Button>
        </div>
        <div>
          <h2 className='text-2xl'>ユーザーステータス一覧</h2>
          {users.map((user) => (
            <div key={user.name} className='flex justify-between items-center py-2'>
              <span>{user.name}</span>
              <span>{user.status}</span>
              <Button>質問する</Button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
