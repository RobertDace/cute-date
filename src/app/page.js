import DateAskingFlow from "@/components/DateAskingFlow";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full flex items-center justify-center bg-gradient-to-tr from-rose-100 via-pink-50 to-amber-50 overflow-hidden font-sans select-none">
      {/* Background Decorative Ambient */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-pink-200 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-rose-200 rounded-full filter blur-3xl animate-pulse delay-700" />
      </div>

      {/* Core Component App Flow */}
      <DateAskingFlow />
    </main>
  );
}