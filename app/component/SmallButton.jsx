"use client";

export default function SmallButton({ 
  type = 'button', 
  onClick,
  colorIcon,
  title,
  icon: Icon,
  iconSize = "w-5",
  bgColor,
  hover,
  textColor = "text-white"
}) {

  return (
    <button 
      type={type}
      onClick={onClick}
      className={`h-9 px-[15px] py-2 rounded-xl justify-end items-center gap-2.5 inline-flex ${bgColor} ${hover} cursor-pointer transition-shadow duration-300 hover:shadow-md hover:shadow-gray-400`}
    >
      <div>
        <Icon 
          className={`${iconSize} flex items-center justify-start `} 
          variant="Bold" 
          color={colorIcon} 
        />
      </div>
      <p className={`${textColor} text-sm font-medium`}>{title}</p>
    </button>
  );
}