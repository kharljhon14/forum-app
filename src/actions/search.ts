'use server';

import paths from '@/paths';
import { redirect } from 'next/navigation';

export async function search(formData: FormData) {
  const searchTerm = formData.get('search-term');

  if (typeof searchTerm !== 'string' || !searchTerm) {
    console.log(searchTerm);
    redirect(paths.homePath());
  }

  redirect(`/search?q=${searchTerm}`);
}
