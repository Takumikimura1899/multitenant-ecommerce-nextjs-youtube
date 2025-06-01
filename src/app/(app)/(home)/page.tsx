import { getQueryClient, trpc } from '@/trpc/server';

export default async function Home() {
  const categories = await trpc.categories.getMany();

  return <div>{JSON.stringify(categories, null, 2)}</div>;
}
