import PostList from '@/components/posts/post-list';
import { fetchPostsBySearchTeam } from '@/db/queries/post';
import paths from '@/paths';
import { redirect } from 'next/navigation';

interface Props {
  searchParams: {
    q: string;
  };
}

export default async function SearchPage({ searchParams }: Props) {
  const { q } = searchParams;

  if (!q) return redirect(paths.homePath());
  return (
    <div>
      <PostList fetchData={() => fetchPostsBySearchTeam(q)} />
    </div>
  );
}
