export default function SidebarDropdown({ items }) {
  return (
    <div>
      {items.map((item, index) => (
        <a
          key={index}
          href={item.url}
          className="block p-2 pl-8 text-sm text-black dark:text-white hover:bg-pri-main hover:text-white rounded-xl"
        >
          - {item.label}
        </a>
      ))}
    </div>
  );
}
