export default function Card({children}) {
  return (
    <div className="p-7 rounded-md bg-white dark:bg-netral-0/10 dark:backdrop-blur-md dark:border-2 dark:border-pri-border w-44">{children}</div>
  );
}