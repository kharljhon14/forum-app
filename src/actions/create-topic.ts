'use server';

import type { Topic } from '@prisma/client';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { auth } from '@/auth';
import { db } from '@/db';
import paths from '@/paths';
import { revalidatePath } from 'next/cache';

const createTopicSchema = z.object({
  name: z
    .string()
    .min(3)
    .regex(/^[a-z-]+$/, { message: 'Must be lowercase letters or dashes without spaces' }),
  description: z.string().min(10)
});

interface CreateTopicFormState {
  errors: {
    name?: string[];
    description?: string[];
    _form?: string[];
  };
}

export async function createTopic(
  _formState: CreateTopicFormState,
  formData: FormData
): Promise<CreateTopicFormState> {
  const result = createTopicSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description')
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors
    };
  }

  // Todo: Revalidate the home page

  const session = await auth();
  if (!session?.user || !session) {
    return {
      errors: {
        _form: ['You must be signed in to do this.']
      }
    };
  }

  let topic: Topic;
  try {
    topic = await db.topic.create({
      data: {
        slug: result.data.name,
        description: result.data.description
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

  revalidatePath(paths.homePath());
  redirect(paths.topicShow(topic.slug));
}
