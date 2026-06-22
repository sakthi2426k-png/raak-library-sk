import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-800 flex flex-col items-center justify-center p-6 text-white">
      {/* Container with a "Glass" effect */}
      <div className="bg-white/10 backdrop-blur-lg p-12 rounded-3xl border border-white/20 shadow-2xl text-center max-w-lg w-full">
        <h1 className="text-5xl font-extrabold mb-6 tracking-tight">RAAK Arts Library</h1>
        <p className="text-indigo-100 text-lg mb-12">Your digital gateway to knowledge.</p>
        
        {/* Properly Aligned Buttons */}
        <div className="flex flex-col gap-4">
          <Link href="/dashboard" className="bg-white text-indigo-900 py-4 rounded-xl font-bold hover:scale-105 transition shadow-lg">
            Staff Portal
          </Link> <br/>
          <Link href="/student" className="bg-indigo-500 text-white py-4 rounded-xl font-bold hover:scale-105 transition shadow-lg border border-indigo-400">
            Student Portal
          </Link>
        </div>
      </div>
      
      <footer className="mt-12 text-white/50 text-sm">
        © 2026 RAAK Arts Library System
      </footer>
    </main>
  );
}