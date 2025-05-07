import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { getPayload } from 'payload';
import configPromise from '@payload-config';

export default async function Home() {
  const payload = await getPayload({
    config: configPromise,
  });

  const data = await payload.find({
    collection: 'categories',
    depth: 1,
    where: {
      parent: {
        exists: false,
      },
    },
  });

  console.log('data', data);
  return (
    <div className='p-4'>
      <div className='flex flex-col gap-y-4'>
        <div>
          <Button variant='elevated'>Button</Button>
        </div>
        <div>
          <Input placeholder='Input' />
        </div>
        <div>
          <Progress value={50} />
        </div>
        <div>
          <Textarea placeholder={'text-area'} />
        </div>
        <div>
          <Checkbox />
        </div>
      </div>
    </div>
  );
}
