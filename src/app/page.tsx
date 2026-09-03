export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2C1810] to-[#1a0f0a] text-white">
      <div className="container mx-auto px-4 py-12 max-w-2xl">

        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#D4AF37]">
            Поминовение
          </h1>
          <p className="text-lg text-gray-300">
            Православные традиции памяти усопших
          </p>
        </header>

        <div className="space-y-4 mb-8">
          
           <a href="/add"
            className="block w-full py-4 px-6 rounded-xl bg-[#8C2F2F] text-white font-medium text-lg text-center hover:bg-[#A63939] transition-colors shadow-lg"
          >
            📅 Напоминания
          </a>

          
            <a href="/traditions"
            className="block w-full py-4 px-6 rounded-xl bg-[#4A5D23] text-white font-medium text-lg text-center hover:bg-[#5A6D33] transition-colors shadow-lg"
          >
            📖 Традиции
          </a>
        </div>

        <footer className="text-center mt-12">
          
            <a href="/about"
            className="text-[#D4AF37] hover:text-[#F4CF57] underline text-sm"
          >
            О проекте
          </a>
        </footer>

      </div>
    </div>
  );
  }