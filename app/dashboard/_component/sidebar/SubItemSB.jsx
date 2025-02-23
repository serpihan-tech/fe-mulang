export default function SidebarDropdown({ items }) {
  return (
    <div className="ml-6">
      {items.map((item, index) => (
        <a
          key={index}
          href="#"
          className="block p-2 text-sm hover:bg-pri-main hover:text-white rounded-xl"
        >
          {item}
        </a>
      ))}
    </div>
  );
}
