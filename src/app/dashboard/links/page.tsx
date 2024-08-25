'use client';

import { useEffect, useState } from 'react';
import { getUserLinks } from './getUserLinks';
import ActivePage from '@/components/dashboard/ActivePage';
import { Button } from '@/components/ui/button';
import {
  Calendar,
  Copy,
  Edit,
  Edit2,
  Mouse,
  MousePointerClick,
  Plus,
  Share2Icon,
  ShareIcon,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DialogDemo } from '@/components/dashboard/createLinkDialog';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import API_CONFIG from '@/service/config/global.config';
import { useRouter } from 'next/navigation';
import { Link } from '@/service/dtos/global.dtos';

export default function Dashboard() {
  const router = useRouter();
  const { toast } = useToast();
  const [userLinks, setUserLinks] = useState<Link[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [shortCode, setShortCode] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<string>('newest');
  const createLink = async () => {
    try {
      const response = await fetch('/create-link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ originalUrl, shortCode, password }),
        cache: 'no-cache',
      });

      if (!response.ok) {
        throw new Error(`Error creating link: ${response.status}`);
      }

      const { data } = await response.json();
      toast({
        title: 'با موفقیت انجام شد.',
        description: `ساخت لینک جدید با موفقیت انجام شد. لینک شما هم اکنون با آدرس ${data.shortUrl} در دسترس می باشد.`,
        action: (
          <ToastAction
            altText="بستن"
            onClick={async () => await getUserLinks()}
          >
            باشه
          </ToastAction>
        ),
      });
      // Handle the success response here
      // console.log('Link created successfully:', data);
    } catch (error: unknown) {
      console.error('Error creating link:', { error });
      if (error instanceof Error) {
        toast({
          title: 'مشکلی به وجود آمده است',
          description: error.message,
          action: <ToastAction altText="بستن">باشه</ToastAction>,
        });
      } else {
        // Handle cases where the error is not an instance of Error
        toast({
          title: 'مشکلی به وجود آمده است',
          description: 'یک خطای ناشناخته رخ داده است.',
          action: <ToastAction altText="بستن">باشه</ToastAction>,
        });
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await getUserLinks();
        if (response && response.data) {
          setUserLinks(response.data);
        } else {
          setError('Error: Data is not available');
        }
      } catch (error) {
        setError(
          error instanceof Error ? error.message : 'Unknown error',
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  const sortLinks = (links: Link[], option: string) => {
    switch (option) {
      case 'newest':
        return [...links].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime(),
        );
      case 'oldest':
        return [...links].sort(
          (a, b) =>
            new Date(a.createdAt).getTime() -
            new Date(b.createdAt).getTime(),
        );
      case 'mostVisited':
        return [...links].sort((a, b) => b.clickCount - a.clickCount);
      case 'leastVisited':
        return [...links].sort((a, b) => a.clickCount - b.clickCount);
      default:
        return links;
    }
  };
  if (error) {
    return <div>Error fetching user links: {error}</div>;
  }

  return (
    <div>
      <div className="flex flex-row">
        <ActivePage />

        <DialogDemo
          originalUrl={originalUrl}
          onChangeOrginalLink={setOriginalUrl}
          shortCode={shortCode}
          onChangeShortCode={setShortCode}
          password={password}
          onChangePassword={setPassword}
          onClick={createLink}
        />
      </div>
      <div className="mt-5">
        <div className="mb-4 grid gap-2">
          <span>مرتب‌سازی بر اساس:</span>
          <Select onValueChange={setSortOption} defaultValue="newest">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="مرتب‌سازی بر اساس" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">جدیدترین</SelectItem>
              <SelectItem value="oldest">قدیمی‌ترین</SelectItem>
              <SelectItem value="mostVisited">
                پربازدیدترین
              </SelectItem>
              <SelectItem value="leastVisited">
                کم‌بازدیدترین
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        {isLoading ? (
          <li>درحال بارگذاری...</li>
        ) : (
          <div>
            {userLinks.length
              ? sortLinks(userLinks, sortOption).map((link) => {
                  // Create the URL object
                  const href = new URL(
                    link.shortCode,
                    API_CONFIG.baseUrlDirect.startsWith('http://') ||
                    API_CONFIG.baseUrlDirect.startsWith('https://')
                      ? API_CONFIG.baseUrlDirect
                      : `https://${API_CONFIG.baseUrlDirect}`,
                  );

                  const createdAt = new Date(link.createdAt);
                  const formattedDate = createdAt.toLocaleString(
                    'fa-IR',
                    {
                      year: 'numeric',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                      month: 'long',
                    },
                  );
                  return (
                    <div
                      key={link.id}
                      onClick={() =>
                        router.push(`/dashboard/links/${link.id}`)
                      }
                      className="flex cursor-pointer flex-row justify-between sm:h-40 rounded-xl shadow-xs p-4 mb-2 bg-white dark:bg-[#121212] transition-all hover:bg-black/10 bg-black/10 dark:bg-white/10"
                    >
                      <div className="flex flex-col justify-between">
                        <div className="flex flex-row items-center">
                          <Avatar>
                            <AvatarFallback className="text-blue-300 font-bold !text-2xl">
                              {link.shortCode.slice(1, 2) || 'L'}
                            </AvatarFallback>
                          </Avatar>
                          <span className="mr-2 font-bold">
                            اسم لینک
                          </span>
                        </div>
                        <a
                          className="text-blue-600"
                          href={href.toString()}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {API_CONFIG.baseUrlDirect +
                            '/' +
                            link.shortCode}
                        </a>
                        <h4>{link.originalUrl}</h4>

                        <div className="flex flex-row items-center">
                          <Calendar
                            className="ml-1 text-black/70"
                            size={18}
                          />
                          <span className="text-black/70 text-xs">
                            {formattedDate}
                          </span>
                          <div className="flex flex-row items-center mr-2">
                            <MousePointerClick
                              className="ml-1 text-black/70"
                              size={18}
                            />
                            <span className="text-black/70 text-xs">
                              {link.clickCount}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col place-content-center sm:flex-row items-end sm:items-start justify-end sm:w-1/2 mb-2">
                        <Button
                          size={'sm'}
                          className="mb-2"
                          icon={<Share2Icon className="!w-4 !h-4" />}
                        />
                        <Button
                          size={'sm'}
                          className="mr-2 bg-slate-200 text-black hover:text-slate-50 hidden sm:flex"
                          icon={<Edit2 className="!w-4 !h-4" />}
                        >
                          ویرایش
                        </Button>
                        <Button
                          size={'sm'}
                          className="mr-2 mb-2 bg-slate-200 text-black hover:text-slate-50 sm:hidden"
                          icon={<Edit2 className="!w-4 !h-4 " />}
                        />

                        <Button
                          size={'sm'}
                          className="mr-2 bg-slate-200 text-black hover:text-slate-50 hidden sm:flex"
                          icon={<Copy className="!w-4 !h-4" />}
                        >
                          کپی
                        </Button>
                        <Button
                          size={'sm'}
                          className="mr-2 mb-2 bg-slate-200 text-black hover:text-slate-50 sm:hidden"
                          icon={<Copy className="!w-4 !h-4" />}
                        />
                      </div>
                    </div>
                  );
                })
              : !userLinks?.length &&
                isLoading && <div>شما هیچ لینک فعالی ندارید.</div>}
          </div>
        )}
      </div>
    </div>
  );
}
