import API_CONFIG from '@/service/config/global.config';
import { NextRequest, NextResponse } from 'next/server'; // Use NextRequest and NextResponse

interface CreateUrlRequestBody {
  originalUrl: string;
  shortCode: string;
  password?: string | null;
}

export async function POST(req: NextRequest) {
  const tokenCookie = req.cookies.get('token');
  const token = tokenCookie ? tokenCookie.value : null;

  const { originalUrl, shortCode, password }: CreateUrlRequestBody =
    await req.json(); // Parse JSON body

  if (!originalUrl || !shortCode) {
    return new NextResponse(
      JSON.stringify({ message: 'فیلد های مورد نظر را پر کنید.' }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }

  try {
    const response = await fetch(
      API_CONFIG.endpoints.user.createLink,
      {
        method: 'POST',
        headers: {
          'Content-Type': API_CONFIG.headers.contentType,
          Authorization: API_CONFIG.headers.authorization(token),
        },
        body: JSON.stringify({ originalUrl, shortCode, password }), // Send the data in the request body
        cache: 'no-cache',
      },
    );

    const data = await response.json();

    return new NextResponse(JSON.stringify(data), {
      status: response.status,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error in POST request:', error); // Log the error for debugging

    return new NextResponse(
      JSON.stringify({ message: 'An error occurred.' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }
}
