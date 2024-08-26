import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';
import { useState } from 'react';

interface DialogDemoProps {
  originalUrl: string | null;
  onChangeOrginalLink: (value: string) => void;
  shortCode: string | null;
  onChangeShortCode: (value: string) => void;
  password: string | null;
  onChangePassword: (value: string) => void;
  onClick: () => void;
  open: boolean;
  setOpen: (value: boolean) => void;
}

export function DialogDemo({
  originalUrl,
  onChangeOrginalLink,
  shortCode,
  onChangeShortCode,
  password,
  onChangePassword,
  onClick,
  open,
  setOpen,
}: DialogDemoProps) {
  const [error, setError] = useState<{
    [key: string]: string | null;
  }>({
    link: null,
    shortUrl: null,
  });

  const handleLinkChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value.trim();

    // More permissive URL pattern for validation
    const urlPattern =
      /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=% ]*)?$/i;
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
    onChangeOrginalLink(value);
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

    onChangeShortCode(value);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setOpen(true)}
          icon={<Plus />}
          size={'sm'}
        >
          ساخت لینک جدید
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="!text-start ">
          <DialogTitle>ساخت لینک کوتاه جدید</DialogTitle>
          <DialogDescription className="pt-2">
            لطفا مقادیر مورد نیاز خود را در بخش پایین بصورت کامل و
            معتبر وارد کنید.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              aria-required="true"
              htmlFor="link"
              className="text-right"
            >
              لینک
              <span className="text-red-500">*</span>
            </Label>
            <Input
              autoComplete="off"
              id="link"
              placeholder="لینک را وارد کنید (مثال: https://google.com)"
              type="text"
              value={originalUrl ?? ''}
              className={`col-span-3 appearance-none ${
                error.link && 'focus-visible:ring-0 border-red-500'
              }`}
              style={{ direction: 'ltr' }}
              required
              onChange={handleLinkChange}
            />
          </div>
          {error.link && (
            <p className="text-red-500 text-xs italic">
              {error.link}
            </p>
          )}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              aria-required="true"
              htmlFor="shortUrl"
              className="text-right"
            >
              آدرس کوتاه <span className="text-red-500">*</span>
            </Label>
            <Input
              autoComplete="off"
              id="shortUrl"
              placeholder="/example"
              type="text"
              value={shortCode ?? ''}
              className={`col-span-3 ${
                error.shortUrl &&
                'focus-visible:ring-0 border-red-500'
              }`}
              style={{ direction: 'ltr' }}
              required
              onChange={handleShortCodeChange}
            />
          </div>
          {error.shortUrl && (
            <p className="text-red-500 text-xs italic">
              {error.shortUrl}
            </p>
          )}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              رمز لینک
            </Label>
            <Input
              autoComplete="off"
              id="password"
              type="text"
              placeholder="********"
              className="col-span-3"
              style={{ direction: 'ltr' }}
              value={password ?? ''}
              onChange={(e) => onChangePassword(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter className="items-center">
          <Button
            disabled={
              !originalUrl ||
              !shortCode ||
              Object.values(error).some((err) => err !== null)
            }
            onClick={onClick}
            type="submit"
          >
            افزودن لینک
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
