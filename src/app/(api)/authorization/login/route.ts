import { NextRequest, NextResponse } from 'next/server';
import API_CONFIG from '@/service/config/global.config';
import { LoginRequestBody } from '@/service/dtos/global.dtos';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  const { phone, password }: LoginRequestBody = await req.json();
  if (!phone || !password) {
    return NextResponse.json(
      { message: 'شماره موبایل و رمزعبور الزامی است.' },
      { status: 400 },
    );
  }

  try {
    const response = await fetch(API_CONFIG.endpoints.auth.login, {
      method: 'POST',
      headers: {
        'Content-Type': API_CONFIG.headers.contentType,
      },
      body: JSON.stringify({ phoneNumber: phone, password }),
      cache: 'no-cache',
    });

    const { data } = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    // Set the token as a cookie
    cookies().set('token', data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    });

    // Return success response with redirect URL
    return NextResponse.json({
      success: true,
      redirectUrl: '/dashboard',
    });
  } catch (error) {
    console.error('Error in login POST request:', error);
    return NextResponse.json(
      { message: 'مشکلی پیش آمده است.' },
      { status: 500 },
    );
  }
}
