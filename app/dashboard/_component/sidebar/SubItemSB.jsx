import { usePathname } from 'next/navigation';

export default function SidebarDropdown({ items }) {
  const pathname = usePathname();

  return (
    <div>
      {items.map((item, index) => {
        const isActive = pathname === item.url;
        return (
          <a
            key={index}
            href={item.url}
            className={`block p-2 pl-8 text-sm rounded-xl transition ${isActive ? 'text-pri-main dark:text-pri-border' : 'text-black dark:text-white hover:text-pri-main'}`}
          >
            - {item.label}
          </a>
        );
      })}
    </div>
  );
}