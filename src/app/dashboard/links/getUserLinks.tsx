'use server';

import API_CONFIG from '@/service/config/global.config';
import { cookies } from 'next/headers';
import { Link } from './page';
interface UserLinksResponse {
  data: Link[];
}

export async function getUserLinks(): Promise<UserLinksResponse | null> {
  const tokenCookie = cookies().get('token');
  const token = tokenCookie ? tokenCookie.value : null;

  try {
    const response = await fetch(API_CONFIG.endpoints.user.links, {
      method: 'POST',
      headers: {
        'Content-Type': API_CONFIG.headers.contentType,
        Authorization: API_CONFIG.headers.authorization(token),
      },
      cache: 'no-cache',
    });

    if (!response.ok) {
      console.log(`Error: Received ${response.status} from API`);
      return null;
    }

    const data = await response.json();
    return { data } as UserLinksResponse; // Return an object with 'data' property
  } catch (error: any) {
    console.log('Error in getUserLinks: ', error.message);
    return null;
  }
}
