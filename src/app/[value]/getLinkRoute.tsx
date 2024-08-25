// getLinkRoute.ts
'use server';

import API_CONFIG from '@/service/config/global.config';
import {
  LinkDetails,
  UserLinksResponse,
} from '@/service/dtos/global.dtos';
import { cookies } from 'next/headers';

export async function getLinkRoute(
  value: string,
): Promise<LinkDetails | null> {
  if (!value) {
    console.error('value undefined in getLinkRoute');
    return null;
  }

  const token = cookies().get('token')?.value || null;

  try {
    const response = await fetch(
      `${API_CONFIG.endpoints.route.get}/${value}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': API_CONFIG.headers.contentType,
          Authorization: API_CONFIG.headers.authorization(token),
        },
        cache: 'no-store',
      },
    );

    if (!response.ok) {
      console.error(`Error: Received ${response.status} from API`);
      return null;
    }

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    console.error('Error in getLinkRoute:', error);
    return null;
  }
}
