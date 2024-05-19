import { Button } from '@/components/button';
import { Divider } from '@/components/divider';
import { PointView } from '@/components/point-view';
import { QuestionStartEnd } from '@/components/question-start-end';
import { StatusButtons } from '@/components/status-buttons';
import { UserList } from '@/components/user-list';

export default function Home() {
  return (
    <main className='flex flex-col items-center justify-center min-h-screen bg-zinc-200'>
      <div className='bg-white p-8 rounded shadow-lg space-y-4'>
        <h1 className='text-4xl font-bold'>エンジニアの質問箱</h1>
        <QuestionStartEnd />
        <Divider />
        <StatusButtons />
        <Divider />
        <UserList />
        <Divider />
        <PointView />
      </div>
    </main>
  );
}
