import { Verify } from "iconsax-react";
import Image from "next/image";

export default function Notif({
  imgSource,
  sender,
  date,
  title,
  content,
  contentGap = 'space-y-1',
  variant = 'default',
  subjectName,
  bgSubject = 'bg-amber-300',
  hidden = '',
}) {
  const renderAdditionalInfo = () => {
    switch (variant) {
      case 'icon':
        return (
          <Verify
            variant="Bold"
            color="blue"
            size={20}
            className="ms-1"
          />
        );
      case 'subject':
        return (
          <div className={`ms-[12px] px-2 py-0.5 ${bgSubject} rounded-[10px] justify-center items-center`}>
            <div className="justify-center text-black text-[10px] md:text-xs lg:text-sm font-normal">{subjectName}</div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full flex self-stretch p-3 rounded-[10px] bg-white dark:bg-dark_net-ter outline outline-[0.50px] outline-offset-[-0.50px] outline-neutral-400 gap-2 items-center">
      <div className={`${hidden} w-11 h-11 lg:w-14 lg:h-14 rounded-full border border-stone-300 items-center`}>
        <Image 
          src={imgSource ? imgSource : '/picture/profilePhoto.jpg'} 
          width={48} 
          height={48} 
          className="rounded-full h-full w-full object-cover"
          alt={sender}
        />
      </div>
      <div className={`w-full ${contentGap}`}>
        <div className="w-full flex justify-between items-center">
          <div className="flex items-center"> 
            <h2 className="justify-center text-blue-700 dark:text-[#5D8BF8] text-sm md:text-sm lg:text-base font-bold">
              {sender}
            </h2>
            {renderAdditionalInfo()}
          </div>
          <div className="flex gap-1">
            <div className="text-black dark:text-slate-100 text-xs font-normal text-end">{date}</div>
            <div className="w-1.5 h-1.5 bg-red-600 dark:bg-[#ff4022] rounded-full" />
          </div>
        </div>
        <div className="flex space-x-2 items-start">
          <div className="text-black dark:text-slate-100 text-xs md:text-sm lg:text-base font-bold whitespace-nowrap">
            {title}
          </div>
          <p className="text-neutral-600 dark:text-slate-300 text-xs md:text-sm lg:text-base font-normal 
            line-clamp-1 
            overflow-hidden 
            text-ellipsis">
            {content}
          </p>
        </div>
      </div>
    </div>
  )
}