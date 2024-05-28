import { Button } from '@nextui-org/button';

import * as actions from '@/actions';
import { auth } from '@/auth';
import { Session } from 'next-auth';
import Profile from '@/components/Profile';

export default async function Home() {
  const session: Session = await auth();

  return (
    <div>
      <form action={actions.signIn}>
        <Button type="submit">Sign In</Button>
      </form>
      <form action={actions.signOut}>
        <Button type="submit">Sign Out</Button>
      </form>

      {session?.user ? <div>{JSON.stringify(session?.user)}</div> : <div>Signed Out</div>}
      <Profile />
    </div>
  );
}
