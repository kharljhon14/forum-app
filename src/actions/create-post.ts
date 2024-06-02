'use server';

import type { Post } from '@prisma/client';
import { auth } from '@/auth';
import paths from '@/paths';
import { z } from 'zod';

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

  if (session?.user) {
    return {
      errors: {
        _form: ['You must be signed in to do this.']
      }
    };
  }

  try {
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

  return {
    errors: {}
  };
}
