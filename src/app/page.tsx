export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-[#FAF7F2]">
      <div className="max-w-md w-full text-center">
        <h1 className="text-3xl font-semibold text-[#5C1A1A] mb-3">
          Поминовение
        </h1>
        <p className="text-gray-600 mb-10 leading-relaxed">
          Напомним о памятных днях после смерти близкого человека и подскажем,
          какие молитвы читать
        </p>

        <div className="flex flex-col gap-4">
          
            href="/add"
            className="block w-full py-4 px-6 rounded-xl bg-[#8C2F2F] text-white font-medium text-lg shadow-sm hover:bg-[#7a2828] transition"
          >
            Добавить памятную дату
          </a>

          
            href="/library"
            className="block w-full py-4 px-6 rounded-xl bg-white border border-[#8C2F2F] text-[#8C2F2F] font-medium text-lg hover:bg-[#f5eaea] transition"
          >
            Библиотека молитв
          </a>

          
            href="/about"
            className="block w-full py-4 px-6 rounded-xl bg-white border border-gray-300 text-gray-700 font-medium text-lg hover:bg-gray-50 transition"
          >
            О проекте
          </a>
        </div>
      </div>
    </main>
  );
}
