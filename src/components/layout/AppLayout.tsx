import { Outlet } from "react-router-dom";
import { BottomNav } from "./BottomNav";
import { TopNav } from "./TopNav";

export function AppLayout() {
  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      <main className="pt-4 lg:pt-24 pb-28 lg:pb-8 px-4 lg:px-8 max-w-7xl mx-auto">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
