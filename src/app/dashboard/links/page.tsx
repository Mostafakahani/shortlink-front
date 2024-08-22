'use client';

import { useEffect, useState } from 'react';
import { getUserLinks } from './getUserLinks';
import ActivePage from '@/components/dashboard/ActivePage';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { DialogDemo } from '@/components/dashboard/createLinkDialog';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from '@/components/ui/toast';

export default function Dashboard() {
  const { toast } = useToast();

  const [userLinks, setUserLinks] = useState<Link[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [shortCode, setShortCode] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

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
        action: <ToastAction altText="بستن">باشه</ToastAction>,
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
      {!userLinks?.length && <div>شما هیچ لینک فعالی ندارید.</div>}
      <h1>User Links</h1>
      <ul>
        {userLinks.length ? (
          userLinks.map((link) => (
            <li key={link.id}>{link.shortCode}</li>
          ))
        ) : (
          <li>Loading...</li>
        )}
      </ul>
    </div>
  );
}

export interface Link {
  id: string | number;
  name: string;
  shortCode: string;
  // Add other properties as needed
}
