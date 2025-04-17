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
  bgSubject,
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
          <div className={`ms-[12px] px-2 py-1 ${bgSubject} rounded-[10px] justify-center items-center`}>
            <div className="justify-center text-black text-[10px] md:text-xs lg:text-sm font-normal">{subjectName}</div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full flex self-stretch p-3 rounded-[10px] outline outline-[0.50px] outline-offset-[-0.50px] outline-neutral-400 gap-2 items-center">
      <div className={`${hidden} w-11 h-11 lg:w-14 lg:h-14 rounded-full border border-stone-300 items-center`}>
        <Image 
          src={imgSource} 
          width={48} 
          height={48} 
          className="rounded-full h-full w-full object-cover"
          alt={sender}
        />
      </div>
      <div className={`w-full ${contentGap}`}>
        <div className="w-full flex justify-between items-center">
          <div className="flex items-center"> 
            <h2 className="justify-center text-blue-700 text-sm md:text-base lg:text-lg font-bold">
              {sender}
            </h2>
            {renderAdditionalInfo()}
          </div>
          <div className="flex gap-1">
            <div className="text-black text-xs font-normal">{date}</div>
            <div className="w-1.5 h-1.5 bg-red-600 rounded-full" />
          </div>
        </div>
        <div className="flex space-x-2 items-start">
          <div className="text-black text-xs md:text-sm lg:text-base font-bold whitespace-nowrap">
            {title}
          </div>
          <p className="text-neutral-600 text-xs md:text-sm lg:text-base font-normal 
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