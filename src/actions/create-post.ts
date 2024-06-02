'use server';

import type { Post } from '@prisma/client';
import { auth } from '@/auth';
import paths from '@/paths';
import { z } from 'zod';
import { db } from '@/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const createPostSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10)
});

interface CreatePostFormState {
  errors: {
    title?: string[];
    content?: string[];
    _form?: string[];
  };
}

export async function createPost(
  slug: string,
  _formState: CreatePostFormState,
  formData: FormData
): Promise<CreatePostFormState> {
  const result = createPostSchema.safeParse({
    title: formData.get('title'),
    content: formData.get('content')
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors
    };
  }

  const session = await auth();

  if (!session?.user) {
    return {
      errors: {
        _form: ['You must be signed in to do this.']
      }
    };
  }

  const topic = await db.topic.findFirst({ where: { slug } });

  if (!topic) {
    return {
      errors: {
        _form: ['Cannot find topic']
      }
    };
  }

  let post: Post;
  try {
    post = await db.post.create({
      data: {
        title: result.data.title,
        content: result.data.content,
        userId: session.user.id as string,
        topicId: topic.id
      }
    });
  } catch (error) {
    if (error instanceof Error) {
      return {
        errors: {
          _form: [error.message]
        }
      };
    } else {
      return {
        errors: {
          _form: ['Something went wrong!']
        }
      };
    }
  }

  revalidatePath(paths.topicShow(slug));
  redirect(paths.postShow(slug, post.id));
}
