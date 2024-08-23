'use client';
import { useState, FormEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from '@radix-ui/react-toast';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  const { toast } = useToast();

  const [phone, setPhone] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('/authorization/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast({
          title: 'ورود ناموفق بود.',
          description: data.message || 'مشکلی بوجود آمده است.',
          action: <ToastAction altText="بستن">باشه</ToastAction>,
        });
        setIsLoading(false);

        return;
      }

      // if (data.success) {
      console.log('Login successful:', data);
      toast({
        title: 'ورود موفقیت‌آمیز بود.',
        action: <ToastAction altText="بستن">باشه</ToastAction>,
      });

      // Use the router to navigate to the dashboard
      setIsLoading(true);
      router.push('/dashboard');
      // } else {
      //   // Handle unexpected response
      //   toast({
      //     title: 'خطای غیرمنتظره',
      //     description: 'پاسخ سرور نامعتبر است.',
      //     action: <ToastAction altText="بستن">باشه</ToastAction>,
      //   });
      //   setIsLoading(false);
      // }
    } catch (error) {
      console.error('Error in Login:', error);
      toast({
        title: 'مشکلی بوجود آمده است.',
        description: 'لطفاً دوباره تلاش کنید.',
        action: <ToastAction altText="بستن">باشه</ToastAction>,
      });
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="w-full h-screen flex flex-row justify-center items-center">
        <div className="md:w-1/2 flex flex-col justify-center items-center">
          <form
            onSubmit={handleSubmit}
            className="w-[20rem] h-auto md:w-[28rem] md:h-[28rem] border p-4 rounded-md flex flex-col justify-center items-center"
          >
            <div className="md:w-[90%] h-[22rem] md:h-auto grid grid-2 md:gap-4">
              <div className="grid gap-3 text-center">
                <h1 className="text-xl md:text-3xl font-bold">
                  ورود به حساب کاربری
                </h1>
                <p className="text-black/50 text-xs md:text-sm md:text-nowrap mb-3 sm:mb-0">
                  شماره موبایل و رمزعبور خود را در فیلد های زیر وارد
                  کنید.
                </p>
              </div>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="phone">شماره موبایل</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="09150001234"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">رمزعبور</Label>
                    <Link
                      href="/forgot-password"
                      className="mr-auto inline-block text-sm underline"
                    >
                      رمزعبورم رو فراموش کردم
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button
                  disabled={isLoading}
                  type="submit"
                  className="w-full"
                >
                  ورود به حساب کاربری
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                حساب کاربری ندارید؟{' '}
                <Link href="/auth/register" className="underline">
                  ثبت نام کنید
                </Link>
              </div>
            </div>
          </form>
        </div>
        <div className="md:w-1/2 hidden bg-muted lg:block h-screen">
          <Image
            src="/images/image.jpg"
            alt="Image"
            width={1920}
            height={1080}
            unoptimized
            className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
      </div>
    </>
  );
}
