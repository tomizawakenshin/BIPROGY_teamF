import PointHolder from '../components/PointHolder';
import { Divider } from '@/components/divider';
import { PointView } from '@/components/point-view';
import { QuestionStartEnd } from '@/components/question-start-end';
import { StatusButtons } from '@/components/status-buttons';
import { UserList } from '@/components/user-list';

export default function Home() {
  return (
    <div className='bg-white p-8 rounded shadow-lg space-y-4'>
      <h1 className='text-4xl font-bold'>エンジニアの質問箱</h1>
      <QuestionStartEnd />
      <Divider />
      <StatusButtons />
      <Divider />
      <UserList />
      <Divider />
      {/* <PointView /> */}
      <PointHolder />
    </div>
  );
}
