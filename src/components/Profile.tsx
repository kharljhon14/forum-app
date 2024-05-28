'use client';

import { useSession } from 'next-auth/react';

export default function Profile() {
  const sesssion = useSession();

  if (sesssion.data?.user) {
    return <div>From Client: Signed In</div>;
  }

  return <div>From Client: Signed Out</div>;
}
