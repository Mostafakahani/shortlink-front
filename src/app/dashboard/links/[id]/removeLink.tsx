// removeLink.ts
'use server';

import API_CONFIG from '@/service/config/global.config';
import { LinkDetails } from '@/service/dtos/global.dtos';
import { cookies } from 'next/headers';

export async function removeLink(id: string): Promise<boolean> {
  if (!id) {
    console.error('Id undefined in removeLink');
    return false;
  }

  const token = cookies().get('token')?.value || '';

  try {
    const response = await fetch(
      `${API_CONFIG.endpoints.user.removeLink}/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': API_CONFIG.headers.contentType,
          Authorization: API_CONFIG.headers.authorization(token),
        },
        cache: 'no-store',
      },
    );
    if (!response.ok) {
      console.error(`Error: Received ${response.status} from API`);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in removeLink:', error);
    return false;
  }
}

// Type guard to check if the response indicates success
function isSuccessResponse(data: any): boolean {
  return (
    typeof data === 'object' &&
    data !== null &&
    (data.success === true ||
      (data.data && typeof data.data === 'object'))
  );
}
