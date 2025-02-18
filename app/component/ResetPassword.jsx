export default function ResetPassword() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white px-16 py-20 rounded-2xl shadow-[8px_4px_64px_rgba(0,0,0,0.25)] flex w-[1000px] z-10">
        <div className="w-1/2 flex items-center justify-center">
          <img src="/otp.svg" alt="otp" className="object-contain h-80 w-full" />
        </div>

        <div className="w-1/2 px-6 flex flex-col justify-center items-center">
          <h2 className="text-4xl font-semibold text-blue-600 mb-2">Verifikasi OTP</h2>
          <p className="text-base mb-[32px] font-normal">OTP telah dikirim ke admin*****@gmail.com</p>
          <div className="justify-center w-full">
            <div className="flex justify-center space-x-4">
              <input
                type="text"
                className="w-16 h-16 text-3xl text-center border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
                required
              />
              <input
                type="text"
                className="w-16 h-16 text-3xl text-center border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
                required
              />
              <input
                type="text"
                className="w-16 h-16 text-3xl text-center border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
                required
              />
              <input
                type="text"
                className="w-16 h-16 text-3xl text-center border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
                required
              />
            </div>
            <div className="w-full flex justify-center items-center mt-4">
              <p className="text-base font-normal text-slate-600">01.00</p>
            </div>
            <div className="w-full flex flex-col items-center mt-[26px]">
              <p className="text-sm font-normal">Tidak menerima OTP?</p>
              <button className="text-sm text-blue-600 font-semibold hover:text-blue-700">
                Kirim ulang OTP
              </button>
            </div>

            <div className="flex justify-center mt-[32px]">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
              >
                Verifikasi
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}