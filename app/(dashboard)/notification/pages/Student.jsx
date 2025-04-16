import Notif from "../_component/Notif";

export default function NotificationStudent () {
  return (
    <div className="w-full bg-neutral-50 p-2 md:-4 lg:p-8 min-h-screen">
      <h1 className="text-black text-xl font-semibold">Notifikasi</h1>
      <div className="mt-7 space-y-3">
        <Notif
          variant="subject"
          imgSource="/picture/profilePhoto.jpg"
          sender="Brian Harina"
          date="15 Jan"
          title="Pemberitahuan UTS -"
          content="Dalam rangka memperingati Hari Batik Nasional yang jatuh pada tanggal 2 Oktober 2017, seluruh siswa-siswi diwajibkan untuk mengenakan baju batik bebas. Mari kita lestarikan budaya Indonesia dengan bangga mengenakan batik! Atas perhatian dan kerja samanya, kami ucapkan terima kasih."
          subjectName="PKN"
          bgSubject="bg-amber-300"
        />
        <Notif
          variant="subject"
          imgSource="/picture/profilePhoto.jpg"
          sender="Brian Harina"
          date="15 Jan"
          title="Pemberitahuan UTS -"
          content="Dalam rangka memperingati Hari Batik Nasional yang jatuh pada tanggal 2 Oktober 2017, seluruh siswa-siswi diwajibkan untuk mengenakan baju batik bebas. Mari kita lestarikan budaya Indonesia dengan bangga mengenakan batik! Atas perhatian dan kerja samanya, kami ucapkan terima kasih."
          subjectName="Matematika"
          bgSubject="bg-blue-700"
        />
        
      </div>
    </div>
  )
}