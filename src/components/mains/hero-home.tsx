'use client';
import Image from 'next/image';
import PageIllustration from '@/components/mains/page-illustration';
import Avatar01 from '/public/images/avatar-01.jpg';
import Avatar02 from '/public/images/avatar-02.jpg';
import Avatar03 from '/public/images/avatar-03.jpg';
import Avatar04 from '/public/images/avatar-04.jpg';
import Avatar05 from '/public/images/avatar-05.jpg';
import Avatar06 from '/public/images/avatar-06.jpg';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Eye, EyeOff } from 'lucide-react';
import { useRef, useState } from 'react';
import { Button } from '../ui/button';

export default function HeroHome() {
  const linkRef = useRef<HTMLDivElement>(null);
  const [showPassword, setShowPassword] = useState<Boolean>(false);

  const handleScrollToLink = (
    e: React.MouseEvent<HTMLAnchorElement>,
  ) => {
    e.preventDefault();
    if (linkRef.current) {
      const yOffset = -100; // Adjust this value to scroll further down
      const y =
        linkRef.current.getBoundingClientRect().top +
        window.pageYOffset +
        yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <section className="relative">
      <PageIllustration />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Hero content */}
        <div className="pb-12 pt-32 md:pb-20 md:pt-40">
          {/* Section header */}
          <div className="pb-12 text-center md:pb-16">
            <div
              className="mb-6 border-y [border-image:linear-gradient(to_left,transparent,theme(colors.slate.300/.8),transparent)1]"
              data-aos="zoom-y-out"
            >
              <div className="-mx-0.5 flex justify-center -space-x-3">
                <Image
                  className="box-content rounded-full border-2 border-gray-50"
                  src={Avatar01}
                  width={32}
                  height={32}
                  alt="Avatar 01"
                />
                <Image
                  className="box-content rounded-full border-2 border-gray-50"
                  src={Avatar02}
                  width={32}
                  height={32}
                  alt="Avatar 01"
                />
                <Image
                  className="box-content rounded-full border-2 border-gray-50"
                  src={Avatar03}
                  width={32}
                  height={32}
                  alt="Avatar 02"
                />
                <Image
                  className="box-content rounded-full border-2 border-gray-50"
                  src={Avatar04}
                  width={32}
                  height={32}
                  alt="Avatar 03"
                />
                <Image
                  className="box-content rounded-full border-2 border-gray-50"
                  src={Avatar05}
                  width={32}
                  height={32}
                  alt="Avatar 04"
                />
                <Image
                  className="box-content rounded-full border-2 border-gray-50"
                  src={Avatar06}
                  width={32}
                  height={32}
                  alt="Avatar 05"
                />
              </div>
            </div>
            <h1
              className="mb-6 border-y text-5xl font-bold [border-image:linear-gradient(to_left,transparent,theme(colors.slate.300/.8),transparent)1] md:text-6xl"
              data-aos="zoom-y-out"
              data-aos-delay={150}
            >
              کوتاه کننده لینک های شما{' '}
              <br className="max-lg:hidden" />
              رایگان برای شما
            </h1>
            <div className="mx-auto max-w-3xl">
              <p
                className="mb-8 text-lg text-gray-700"
                data-aos="zoom-y-out"
                data-aos-delay={300}
              >
                وب سایت ویکسا ارائه خدمات کوتاه کننده و آنالیزور لینک
                های شما.
                <br />
                برای مشاهده آنالیزور باید ثبت نام کنید.
              </p>
              <div className="relative before:absolute before:inset-0 before:border-y before:[border-image:linear-gradient(to_left,transparent,theme(colors.slate.300/.8),transparent)1]">
                <div
                  className="mx-auto max-w-xs sm:flex sm:max-w-none sm:justify-center"
                  data-aos="zoom-y-out"
                  data-aos-delay={450}
                >
                  <a
                    className="btn w-full bg-white text-gray-800 shadow hover:bg-gray-50 sm:ml-4 sm:w-auto"
                    href="#0"
                  >
                    درباره ما
                  </a>

                  <a
                    className="btn group mt-4 sm:mt-0 w-full bg-gradient-to-t from-blue-600 to-blue-500 bg-[length:100%_100%] bg-[bottom] text-white shadow hover:bg-[length:100%_150%] sm:mb-0 sm:w-auto"
                    href="#link"
                    onClick={handleScrollToLink}
                  >
                    <span className="relative inline-flex items-center">
                      ساخت لینک کوتاه{' '}
                      <span className="mr-1 tracking-normal text-blue-300 transition-transform group-hover:translate-x-0.5">
                        -&gt;
                      </span>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          {/* Hero image */}
          <div
            ref={linkRef}
            className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8"
            data-aos="zoom-y-out"
            data-aos-delay={600}
            id="link"
          >
            <form
              autoComplete="off"
              onSubmit={(e) => e.preventDefault()}
              className="space-y-4"
            >
              <div className="w-full">
                <Label
                  htmlFor="originalLink"
                  className="text-right block mb-1"
                >
                  آدرسی را که می‌خواهید کوتاه شود را وارد کنید:
                </Label>
                <Input
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                  autoFocus={false}
                  id="originalLink"
                  name="originalLink"
                  style={{ direction: 'ltr' }}
                  placeholder="https://example-long-url.net/example"
                  className="w-full rounded-lg"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full sm:w-1/2">
                  <Label
                    htmlFor="shortLink1"
                    className="text-right block mb-1"
                  >
                    آدرس کوتاه:
                  </Label>
                  <Input
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                    autoFocus={false}
                    id="shortLink1"
                    name="shortLink1"
                    style={{ direction: 'ltr' }}
                    placeholder={
                      window.location.hostname + '/example-link'
                    }
                    className="w-full rounded-lg"
                  />
                </div>

                <div className="w-full sm:w-1/2">
                  <Label
                    htmlFor="shortLink2"
                    className="text-right block mb-1"
                  >
                    رمز آدرس کوتاه:
                  </Label>
                  <div className="relative">
                    <Input
                      autoComplete="new-password"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck="false"
                      autoFocus={false}
                      id="shortLink2"
                      name="shortLink2"
                      type={showPassword ? 'text' : 'password'}
                      style={{ direction: 'ltr' }}
                      placeholder="********"
                      className="w-full pr-10 rounded-lg"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-center sm:justify-end">
                <Button
                  className="w-full sm:w-auto rounded-lg"
                  onClick={() => window.alert('متصل نکردمش.')}
                >
                  کوتاه کن
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
