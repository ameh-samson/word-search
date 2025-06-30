import PWABadge from "./PWABadge.tsx";
import retry from "./assets/retry.svg";

function App() {
  return (
    <>
      <div className="h-dvh flex flex-col p-4">
        <header className="bg-linear-to-r from-[#3B82F6] to-[#4F46E5] p-4 rounded-t-2xl flex items-center justify-between">
          <h1 className="text-4xl text-white font-bold">
            Word Search Challenge
          </h1>

          <div className="flex items-center gap-4">
            <p className="py-2.5 px-3 rounded-2xl bg-white/20 text-white text-[28px] font-medium">
              03:54
            </p>

            <button className="flex items-center justify-center rounded-full bg-white p-2">
              <img src={retry} alt="retry" />
            </button>
          </div>
        </header>

        <main className="h-full bg-white shadow-sm p-4"></main>
      </div>

      <PWABadge />
    </>
  );
}

export default App;
