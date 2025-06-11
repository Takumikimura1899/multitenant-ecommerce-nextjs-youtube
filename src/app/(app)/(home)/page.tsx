'use client';

import { trpc } from '@/trpc/client';

export default function Home() {
  const data = trpc.auth.session.useQuery();
  return <div>{JSON.stringify(data.data?.user, null, 2)}</div>;
}
