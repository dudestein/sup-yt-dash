"use client";
import SideBar from "./components/Sidebar/SideBar";

export default function Home() {
  const handleVideoSelection = (videoId: string) => {
    console.log(videoId);
  };
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col  row-start-2 items-center sm:items-start">
        <SideBar handleVideoSelection={handleVideoSelection} />
        Youtube Dashboard
      </main>
    </div>
  );
}
