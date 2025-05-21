"use client";

import Image from 'next/image';

export default function SmallButton({
  type = 'button',
  onClick,
  icon,
  iconSize = "w-5",
  bgColor,
  colorIcon,
  bgColorDisabled,
  bgBorder,
  title,
  hover,
  noTitle = false,
  textColor = "text-white",
  disabled = false,
  minBtnSize = "min-w-fit"
}) {
  const renderIcon = () => {
    if (!icon) return null; 
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
          size={iconSize}
        />
      );
    }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`h-9 px-2.5 md:px-[15px] ${minBtnSize} py-2 rounded-lg md:rounded-xl justify-center items-center gap-1.5 md:gap-2.5 inline-flex ${
                  disabled ? `${bgColorDisabled}` : `${bgColor} ${hover} ${bgBorder} ${textColor} transition-shadow  ease-in-out duration-300 hover:shadow-md hover:scale-105`
                } cursor-pointer `}
    >
      {icon && (
        <div className={`${iconSize} flex items-center justify-start`}>
          {renderIcon()}
        </div>
      )}
      
      <p className={`hidden ${noTitle ? '' : 'md:block' } text-xs md:text-sm font-medium whitespace-nowrap`}>{title}</p>
    </button>
  );
}