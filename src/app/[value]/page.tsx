'use client';
import { useEffect, useState } from 'react';
import { getLinkRoute } from './getLinkRoute';
import { LinkDetails } from '@/service/dtos/global.dtos';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import API_CONFIG from '@/service/config/global.config';
import { Input } from '@/components/ui/input';

export default function Page({
  params,
}: {
  params: { value: string };
}) {
  const [linkDetails, setLinkDetails] = useState<LinkDetails | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [redirectTimer, setRedirectTimer] = useState<number>(5);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getLinkRoute(params.value);
        if (response && response.data) {
          setLinkDetails(response);

          if (response.data.password) {
            const enteredPassword = window.prompt(
              'رمزعبور لینک را وارد کنید:',
            );
            if (enteredPassword !== response.data.password) {
              setError('رمزعبور وارد شده نادرست می باشد.');
              return; // Exit early if password is incorrect
            }
          }

          // Common redirect logic
          const timer = setInterval(() => {
            setRedirectTimer((prev) => prev - 1);
          }, 1000);

          setTimeout(() => {
            clearInterval(timer);
            window.location.href =
              response.data.originalUrl +
              '?UTM=' +
              API_CONFIG.baseUrl;
          }, 5000);
        } else {
          setError('لینک کوتاه نامعتبر است');
        }
      } catch (error) {
        // Log the error to a centralized logging service
        console.error(error);
        setError(
          error instanceof Error ? error.message : 'خطای ناشناخته',
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [params.value]);
  const handleGoHome = () => {
    router.push('/');
  };

  const handleManualRedirect = () => {
    if (linkDetails && linkDetails.data) {
      window.location.href =
        linkDetails.data.originalUrl + '?UTM=' + API_CONFIG.baseUrl;
    }
  };

  return (
    <div
      style={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {isLoading ? (
        <h1>در حال بارگذاری...</h1>
      ) : error ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <h1>خطا: {error}</h1>
          <Button onClick={handleGoHome} style={{ marginTop: 20 }}>
            برو به خانه
          </Button>
        </div>
      ) : !linkDetails ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <h1>چنین لینکی وجود ندارد.</h1>
          <Button onClick={handleGoHome} style={{ marginTop: 20 }}>
            برو به خانه
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          {linkDetails.password ? (
            <p>This link requires a password.</p>
          ) : (
            <>
              <h1>در حال انتقال به لینک مورد نظر...</h1>
              {redirectTimer > 0 && (
                <p>انتقال خودکار در {redirectTimer} ثانیه</p>
              )}
              <Button onClick={handleManualRedirect} className="mt-5">
                انتقال دستی
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
