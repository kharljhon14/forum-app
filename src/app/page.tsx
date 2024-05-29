import { Button } from '@nextui-org/button';

import * as actions from '@/actions';
import Profile from '@/components/Profile';
import CreateTopicForm from '@/components/topics/CreateTopicForm';

export default function Home() {
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="text-xl m-2">Top Posts</h1>
      </div>
      <div>
        <CreateTopicForm />
      </div>
    </div>
  );
}
