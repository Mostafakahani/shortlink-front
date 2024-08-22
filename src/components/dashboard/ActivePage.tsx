import { usePathname } from 'next/navigation';
import { navItems } from '../layout/Dashboard';

export default function ActivePage() {
  const pathname = usePathname();
  const isActive = navItems.find((x) => x.href === pathname);

  return (
    <>
      {isActive && (
        <div className="w-full flex flex-row items-center">
          {isActive.icon && (
            <isActive.icon className="h-7 w-7 ml-2" />
          )}
          <h3 className="font-bold text-3xl">{isActive.label}</h3>
        </div>
      )}
    </>
  );
}
