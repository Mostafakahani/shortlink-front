import API_CONFIG from '@/service/config/global.config';
import { cookies } from 'next/headers';

export async function checkUserLoginStatus(): Promise<boolean> {
  const tokenCookie = cookies().get('token');
  const token = tokenCookie ? tokenCookie.value : null;
  if (!token) return false;

  try {
    const response = await fetch(API_CONFIG.endpoints.user.check, {
      method: 'POST',
      headers: {
        'Content-Type': API_CONFIG.headers.contentType,
        Authorization: API_CONFIG.headers.authorization(token),
      },
      cache: 'no-cache',
    });

    if (!response.ok || response.status === 401) {
      console.log(`Error: Received ${response.status} from API`);
      return false;
    }

    const { status } = await response.json();
    return status === 200;
  } catch (error) {
    console.error(
      'Error in checkUserLoginStatus: ',
      error instanceof Error ? error.message : String(error),
    );
    return false;
  }
}
