'use client';
import { useEffect, useState } from 'react';
import { getLinkRoute } from './getLinkRoute';
import { LinkDetails, NoteDetails } from '@/service/dtos/global.dtos';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import API_CONFIG from '@/service/config/global.config';
import sanitizeHtml from 'sanitize-html';
import { useToast } from '@/components/ui/use-toast';
import { Copy } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
export default function Page({
  params,
}: {
  params: { value: string };
}) {
  const [linkDetails, setLinkDetails] = useState<
    LinkDetails | NoteDetails | null
  >(null);
  const [isLoading, setIsLoading] = useState(true);
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [redirectTimer, setRedirectTimer] = useState<number>(5);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getLinkRoute(params.value); // API call to backend
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

          // Check if the type is "url" or "note"
          if (response.data.type === 'url') {
            // Redirect logic for URLs
            const timer = setInterval(() => {
              setRedirectTimer((prev) => prev - 1);
            }, 1000);

            setTimeout(() => {
              clearInterval(timer);
              window.location.href =
                response.data.originalUrl +
                '?UTM=' +
                API_CONFIG.baseUrlDirect;
            }, 5000);
          } else if (response.data.type === 'note') {
            // Handle note content
            setLinkDetails(response);
          }
        } else {
          setError('لینک کوتاه نامعتبر است');
        }
      } catch (error) {
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
    if (
      linkDetails &&
      linkDetails.data &&
      linkDetails.data.type === 'url'
    ) {
      window.location.href =
        linkDetails.data.originalUrl + '?UTM=' + API_CONFIG.baseUrl;
    }
  };
  const copyToClipboard = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: 'کپی شد!',
        description: 'لینک در کلیپ‌بورد کپی شد.',
      });
    } catch (err) {
      toast({
        title: 'خطا',
        description: 'کپی کردن لینک با مشکل مواجه شد.',
        variant: 'destructive',
      });
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
      ) : linkDetails.data.type === 'url' ? (
        <div className="flex flex-col items-center justify-center">
          <h1>در حال انتقال به لینک مورد نظر...</h1>
          {redirectTimer > 0 && (
            <p>انتقال خودکار در {redirectTimer} ثانیه</p>
          )}
          <Button onClick={handleManualRedirect} className="mt-5">
            انتقال دستی
          </Button>
        </div>
      ) : (
        // Display note content if type is "note"
        <div className="flex flex-col items-center justify-center">
          <h1>یادداشت:</h1>
          <Textarea
            placeholder={sanitizeHtml(
              linkDetails.data.content.toString(),
            )}
            readOnly
            className="p-4 border border-black/15 m-2 rounded-md h-full min-h-72 min-w-[300px] md:min-w-[500px]  xl:min-w-[700px]"
          />

          <Button
            size={'sm'}
            icon={<Copy className="!w-5 !h-5" />}
            onClick={() =>
              copyToClipboard(
                sanitizeHtml(linkDetails.data.content.toString()),
              )
            }
          >
            کپی
          </Button>
        </div>
      )}
    </div>
  );
}
