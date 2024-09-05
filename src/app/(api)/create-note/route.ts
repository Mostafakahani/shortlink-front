import API_CONFIG from '@/service/config/global.config';
import { NextRequest, NextResponse } from 'next/server'; // Use NextRequest and NextResponse

interface CreateUrlRequestBody {
  content: string;
  shortCode: string;
  password?: string | null;
  name?: string | null;
}

export async function POST(req: NextRequest) {
  const tokenCookie = req.cookies.get('token');
  const token = tokenCookie ? tokenCookie.value : null;

  const { content, shortCode, password, name }: CreateUrlRequestBody =
    await req.json(); // Parse JSON body

  if (!content || !shortCode) {
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
      API_CONFIG.endpoints.user.createNote,
      {
        method: 'POST',
        headers: {
          'Content-Type': API_CONFIG.headers.contentType,
          Authorization: API_CONFIG.headers.authorization(token),
        },
        body: JSON.stringify({ content, shortCode, password, name }), // Send the data in the request body
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
