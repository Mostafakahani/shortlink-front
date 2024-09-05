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
import { Textarea } from '../ui/textarea';

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
  name: string | null;
  onChangeName: (value: string) => void;
}

export function CreateNoteDialog({
  originalUrl,
  onChangeOrginalLink,
  shortCode,
  onChangeShortCode,
  password,
  onChangePassword,
  onClick,
  open,
  setOpen,
  name,
  onChangeName,
}: DialogDemoProps) {
  const [error, setError] = useState<{
    [key: string]: string | null;
  }>({
    link: null,
    shortUrl: null,
  });

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
            <Label htmlFor="name" className="text-right">
              اسم یادداشت
            </Label>
            <Input
              autoComplete="off"
              id="name"
              type="text"
              placeholder="نمونه: لینک گوگل اَم"
              className="col-span-3"
              value={name ?? ''}
              onChange={(e) => onChangeName(e.target.value)}
            />
          </div>
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
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              aria-required="true"
              htmlFor="originalUrl"
              className="text-right"
            >
              یادداشت <span className="text-red-500">*</span>
            </Label>
            <Textarea
              autoComplete="off"
              id="originalUrl"
              placeholder="یادداشت خود را وارد کنید..."
              value={originalUrl ?? ''}
              className={`col-span-3 ${
                error.originalUrl &&
                'focus-visible:ring-0 border-red-500'
              }`}
              style={{ direction: 'ltr' }}
              required
              onChange={(e) => onChangeOrginalLink(e.target.value)}
            />
          </div>
          {error.originalUrl && (
            <p className="text-red-500 text-xs italic">
              {error.originalUrl}
            </p>
          )}
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
