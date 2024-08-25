// getDetails.ts
'use server';

import API_CONFIG from '@/service/config/global.config';
import {
  LinkDetails,
  UserLinksResponse,
} from '@/service/dtos/global.dtos';
import { cookies } from 'next/headers';

export async function getDetails(
  id: string,
): Promise<LinkDetails | null> {
  if (!id) {
    console.error('Id undefined in getDetails');
    return null;
  }

  const token = cookies().get('token')?.value || null;

  try {
    const response = await fetch(
      `${API_CONFIG.endpoints.user.detailsLink}/${id}`,
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

    // Assuming the API returns the LinkDetails directly in the response
    if (isLinkDetails(responseData)) {
      return responseData;
    } else if (
      responseData.data &&
      isLinkDetails(responseData.data)
    ) {
      return responseData.data;
    } else {
      console.error('Unexpected response structure:', responseData);
      return null;
    }
  } catch (error) {
    console.error('Error in getDetails:', error);
    return null;
  }
}

// Type guard to check if the response matches LinkDetails structure
function isLinkDetails(data: any): data is LinkDetails {
  return (
    typeof data === 'object' &&
    data !== null &&
    'originalUrl' in data &&
    'shortCode' in data &&
    'totalVisits' in data &&
    'browsers' in data &&
    'topIPs' in data
  );
}
