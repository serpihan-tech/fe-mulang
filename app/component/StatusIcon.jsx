export default function StatusIcon({ status }) {
    const statusStyles = {
      hadir: "text-success-main border-success-main",
      izin: "text-warn-main border-warn-main",
      sakit: "text-err-main border-err-main",
      alfa: "text-err-main border-err-main",
    };
  
    const getStatusStyle = (status) => {
      return statusStyles[status.toLowerCase()] || "text-gray-500 border-gray-500";
    };
  
    return (
      <div className="">
        <p
          className={`border py-2 w-[80px] rounded-md text-center text-xs font-semibold ${getStatusStyle(
            status
          )}`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </p>
      </div>
    );
  }
  