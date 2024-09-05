// saveChanges.ts
'use server';

import API_CONFIG from '@/service/config/global.config';
import { cookies } from 'next/headers';

export async function saveChanges(
  id: string,
  body: object,
): Promise<boolean> {
  if (!id) {
    console.error('Id undefined in saveChanges notes');
    return false;
  }

  const token = cookies().get('token')?.value || '';

  try {
    const response = await fetch(
      `${API_CONFIG.endpoints.user.updateNote}/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': API_CONFIG.headers.contentType,
          Authorization: API_CONFIG.headers.authorization(token),
        },
        cache: 'no-store',
        body: JSON.stringify(body),
      },
    );
    if (!response.ok) {
      console.error(`Error: Received ${response.status} from API`);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in saveChanges notes:', error);
    return false;
  }
}
