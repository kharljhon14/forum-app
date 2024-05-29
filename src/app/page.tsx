import { Button } from '@nextui-org/button';

import * as actions from '@/actions';
import Profile from '@/components/Profile';

export default function Home() {
  return (
    <div>
      <form action={actions.signIn}>
        <Button type="submit">Sign In</Button>
      </form>
      <form action={actions.signOut}>
        <Button type="submit">Sign Out</Button>
      </form>

      <Profile />
    </div>
  );
}
