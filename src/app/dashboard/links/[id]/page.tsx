'use client';

import { useEffect, useState } from 'react';
import { getDetails } from './getDetails';
import { LinkDetails } from '@/service/dtos/global.dtos';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeftIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LinkDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [linkDetails, setLinkDetails] = useState<LinkDetails | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<{
    [key: string]: string | null;
  }>({});
  const [editedOriginalUrl, setEditedOriginalUrl] = useState('');
  const [editedShortCode, setEditedShortCode] = useState('');
  const [editedName, setEditedName] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDetails(params.id);
        if (response) {
          setLinkDetails(response);
          setEditedOriginalUrl(response.originalUrl);
          setEditedShortCode(response.shortCode);
          setEditedName(response.name || '');
        } else {
          setError({ general: 'Data is not available' });
        }
      } catch (error) {
        setError({
          general:
            error instanceof Error ? error.message : 'Unknown error',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  const handleSaveChanges = async () => {
    setLinkDetails((prev) =>
      prev
        ? {
            ...prev,
            originalUrl: editedOriginalUrl,
            shortCode: editedShortCode,
            name: editedName,
          }
        : null,
    );

    toast({
      title: 'تغییرات ذخیره شد',
      description: 'تغییرات شما با موفقیت ذخیره شد.',
    });
  };

  const handleLinkChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value.trim();
    const urlPattern =
      /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- ;,./?%&=]*)?$/i;
    const isValidUrl = urlPattern.test(value);

    if (!isValidUrl && value.length > 0) {
      setError((prev) => ({
        ...prev,
        link: 'لطفا لینک معتبر وارد کنید. (مثال: https://google.com)',
      }));
    } else if (value.length === 0) {
      setError((prev) => ({
        ...prev,
        link: 'لطفا مقدار رو با دقت پر کنید.',
      }));
    } else if (value.length < 3) {
      setError((prev) => ({
        ...prev,
        link: 'لینک باید بیشتر از 3 حرف باشد.',
      }));
    } else {
      setError((prev) => ({ ...prev, link: null }));
    }
    setEditedOriginalUrl(value);
  };

  const handleShortCodeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value.trim();

    // Regex pattern to allow only / followed by alphanumeric and some special characters
    const shortCodePattern = /^\/[a-zA-Z0-9-_]*$/;
    const isValidShortCode = shortCodePattern.test(value);

    if (!isValidShortCode && value.length > 0) {
      setError((prev) => ({
        ...prev,
        shortUrl: 'لطفا آدرس کوتاه معتبر وارد کنید. (مثال: /example)',
      }));
    } else if (value.length === 0) {
      setError((prev) => ({
        ...prev,
        shortUrl: 'لطفا مقدار رو با دقت پر کنید.',
      }));
    } else if (value.length < 3) {
      setError((prev) => ({
        ...prev,
        shortUrl: 'آدرس کوتاه باید بیشتر از 3 حرف باشد.',
      }));
    } else {
      setError((prev) => ({ ...prev, shortUrl: null }));
    }

    setEditedShortCode(value);
  };

  if (isLoading) return <div>در حال بارگذاری...</div>;
  if (error.general) return <div>خطا: {error.general}</div>;
  if (!linkDetails) return <p>اطلاعات لینک در دسترس نیست</p>;

  return (
    <div className="w-full flex justify-center">
      <div className="w-full xl:max-w-[50%] bg-white rounded-xl p-5">
        <div className="space-y-6">
          <div className="w-full flex justify-between">
            <h1 className="text-2xl font-bold">
              جزئیات لینک برای شناسه: {params.id}
            </h1>
            <ArrowLeftIcon
              className="cursor-pointer"
              onClick={() => {
                if (window.history.length > 1) {
                  router.back();
                } else {
                  router.push('/dashboard/links');
                }
              }}
            />
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="originalUrl">لینک اصلی</Label>
              <Input
                id="originalUrl"
                placeholder="لینک را وارد کنید (مثال: https://google.com)"
                type="text"
                value={editedOriginalUrl}
                className={`col-span-3 appearance-none ${
                  error.link
                    ? 'focus-visible:ring-0 border-red-500'
                    : ''
                }`}
                style={{ direction: 'ltr' }}
                required
                onChange={handleLinkChange}
              />
              {error.link && (
                <p className="text-red-500 text-xs italic">
                  {error.link}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="shortCode">کدکوتاه</Label>
              <Input
                id="shortCode"
                placeholder="آدرس کوتاه را وارد کنید (مثال: /example)"
                type="text"
                value={editedShortCode}
                className={`col-span-3 appearance-none ${
                  error.shortUrl
                    ? 'focus-visible:ring-0 border-red-500'
                    : ''
                }`}
                style={{ direction: 'ltr' }}
                required
                onChange={handleShortCodeChange}
              />
              {error.shortUrl && (
                <p className="text-red-500 text-xs italic">
                  {error.shortUrl}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">اسم لینک</Label>
              <Input
                id="name"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
              />
            </div>
            <div className="w-full text-left">
              <Button onClick={handleSaveChanges}>
                ذخیره تغییرات
              </Button>
            </div>
          </div>

          <p>
            <strong>تعداد بازدید:</strong> {linkDetails.totalVisits}
          </p>

          {linkDetails.totalVisits === 0 ? (
            <p>هنوز هیچ بازدیدی ثبت نشده است.</p>
          ) : (
            <>
              <BrowserList browsers={linkDetails.browsers} />
              <IPList topIPs={linkDetails.topIPs} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// BrowserList and IPList components remain unchanged
function BrowserList({
  browsers,
}: {
  browsers: { name: string; count: number }[];
}) {
  if (browsers.length === 0)
    return <p>اطلاعات مرورگر در دسترس نیست.</p>;

  return (
    <>
      <h2>مرورگرهای استفاده شده</h2>
      <ul>
        {browsers.map((browser, index) => (
          <li key={index}>
            {browser.name}: {browser.count} بازدید
          </li>
        ))}
      </ul>
    </>
  );
}

function IPList({
  topIPs,
}: {
  topIPs: { ip: string; count: number }[];
}) {
  if (topIPs.length === 0) return <p>اطلاعات IP در دسترس نیست.</p>;

  return (
    <>
      <h2>آدرس‌های IP برتر</h2>
      <ul>
        {topIPs.map((ip, index) => (
          <li key={index}>
            {ip.ip}: {ip.count} بازدید
          </li>
        ))}
      </ul>
    </>
  );
}
