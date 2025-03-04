"use client";

import Image from 'next/image';

export default function SmallButton({
  type = 'button',
  onClick,
  icon,
  iconSize = "w-5",
  bgColor,
  colorIcon,
  title,
  hover,
  textColor = "text-white"
}) {
  const renderIcon = () => {
    if (typeof icon === 'string') {
      // Jika icon adalah string (path gambar)
      return (
        <Image
          src={icon}
          alt={title}
          width={20}
          height={20}
        />
      );
    } else {
      // Jika icon adalah komponen
      const Icon = icon;
      return (
        <Icon
          className={`${iconSize} flex items-center justify-start`}
          variant="Bold"
          color={colorIcon}
        />
      );
    }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`h-9 px-[15px] py-2 rounded-xl justify-end items-center gap-2.5 inline-flex ${bgColor} ${hover} cursor-pointer transition-shadow duration-300 hover:shadow-md hover:shadow-gray-400`}
    >
      <div className={`${iconSize} flex items-center justify-start`}>
        {renderIcon()}
      </div>
      <p className={`${textColor} text-sm font-medium`}>{title}</p>
    </button>
  );
}