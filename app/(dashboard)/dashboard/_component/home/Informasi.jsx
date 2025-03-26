export default function Informasi () {
  return (
    <div className="w-full py-[10px] space-y-6 mt-5">
      <div className="flex space-x-2">
        <h1 className="text-black text-lg font-semibold">Informasi</h1>
        <div className="w-2.5 h-2.5 bg-[#dc1010] rounded-full" />
      </div>
      <div className="p-4 border-[1px] border-[#ADC0F5] rounded-[15px] space-y-3">
        <h2 className="text-center text-[#0841e2] text-lg font-semibold">Memperingati Hari Batik Nasional</h2>
        <hr className="border-[#0841e2] border-1" />
        <p className="text-justify">Dalam rangka memperingati Hari Batik Nasional yang jatuh pada tanggal 2 Oktober 2017, seluruh tenaga pendidik dan siswa-siswi diwajibkan untuk mengenakan baju batik bebas. Mari kita lestarikan budaya Indonesia dengan bangga mengenakan batik!
        Atas perhatian dan kerja samanya, kami ucapkan terima kasih.</p>
      </div>
    </div>
  )
}