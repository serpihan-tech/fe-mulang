import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function SidebarDropdown({ items, open }) {
  const pathname = usePathname();
  const [shouldRenderText, setShouldRenderText] = useState(open);

  useEffect(() => {
    if (open) {
      const timeout = setTimeout(() => setShouldRenderText(true), 300);
      return () => clearTimeout(timeout);
    } else {
      setShouldRenderText(false);
    }
  }, [open]);

  return (
    <div>
      {items.map((item, index) => {
        const isActive = pathname.startsWith(item.url);
        return (
          <a
            key={index}
            href={item.url}
            className={`block p-2 pl-8 text-sm rounded-xl transition 
              ${isActive ? 'text-pri-main dark:text-pri-border' : 'text-black dark:text-white hover:text-pri-main'}
            `}
          >
            {shouldRenderText && <>- {item.label}</>}
          </a>
        );
      })}
    </div>
  );
}
