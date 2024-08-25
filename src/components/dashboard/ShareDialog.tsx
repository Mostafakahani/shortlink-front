'use client';
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Share2Icon,
  Copy,
  Twitter,
  Facebook,
  Linkedin,
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface ShareDialogProps {
  url: string;
}

export function ShareDialog({ url }: ShareDialogProps) {
  const { toast } = useToast();

  const copyToClipboard = async () => {
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

  const shareOnSocialMedia = (platform: string) => {
    let shareUrl = '';
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          url,
        )}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url,
        )}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
          url,
        )}`;
        break;
    }
    window.open(shareUrl, '_blank');
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size={'sm'}
          className="mb-2"
          icon={<Share2Icon className="!w-4 !h-4" />}
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="!text-right">
          <DialogTitle className="text-lg sm:text-xl">
            اشتراک‌گذاری لینک
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button
              onClick={copyToClipboard}
              variant="outline"
              className="w-full"
            >
              <Copy className="ml-2 h-4 w-4" /> کپی لینک
            </Button>
            <Button
              onClick={() => shareOnSocialMedia('twitter')}
              variant="outline"
              className="w-full"
            >
              <Twitter className="ml-2 h-4 w-4" /> توییتر
            </Button>
            <Button
              onClick={() => shareOnSocialMedia('facebook')}
              variant="outline"
              className="w-full"
            >
              <Facebook className="ml-2 h-4 w-4" /> فیسبوک
            </Button>
            <Button
              onClick={() => shareOnSocialMedia('linkedin')}
              variant="outline"
              className="w-full"
            >
              <Linkedin className="ml-2 h-4 w-4" /> لینکدین
            </Button>
          </div>
          <div className="mt-4 text-sm text-gray-500 text-center">
            <p>لینک به اشتراک گذاشته شده:</p>
            <p className="font-medium break-all">{url}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
