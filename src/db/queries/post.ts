import { db } from '..';

// export type EnrichedPost = Post & {
//   topic: {
//     slug: string;
//   };
//   user: {
//     name: string | null;
//   };
//   _count: {
//     comments: number;
//   };
// };

export type EnrichedPost = Awaited<ReturnType<typeof fetchPostsByTopicSlug>>[number];

export function fetchPostsByTopicSlug(slug: string) {
  return db.post.findMany({
    where: { topic: { slug } },
    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true } },
      _count: { select: { comments: true } }
    }
  });
}

export function fetchTopPosts(): Promise<EnrichedPost[]> {
  return db.post.findMany({
    orderBy: [
      {
        comments: {
          _count: 'desc'
        }
      }
    ],
    include: {
      topic: {
        select: { slug: true }
      },

      user: { select: { name: true, image: true } },
      _count: { select: { comments: true } }
    },
    take: 5
  });
}

export function fetchPostsBySearchTeam(term: string): Promise<EnrichedPost[]> {
  return db.post.findMany({
    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true, image: true } },
      _count: { select: { comments: true } }
    },
    where: {
      OR: [
        {
          title: { contains: term }
        }
      ]
    }
  });
}
