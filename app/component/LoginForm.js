export default function LoginForm() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-2xl shadow-2xl flex w-[800px]">
        <div className="w-1/2 flex items-center justify-center">
          <img src="/login.png" alt="Login" className="object-contain h-60 w-full" />
        </div>

        <div className="w-1/2 px-6 flex flex-col justify-center items-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Selamat Datang!</h2>
          <p className="text-gray-600 mb-6">Masuk ke akun anda</p>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Kata Sandi</label>
              <input
                type="password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Masuk
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
