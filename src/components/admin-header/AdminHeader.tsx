import { useAuthStore } from "@/services";
import { getInitials } from "@/utils";

export function AdminHeader() {
  const today = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const { activeSession } = useAuthStore()
  const user = activeSession?.user

  return (
    <header className="flex justify-between items-center sticky z-20 top-0 bg-white px-8 py-4">
      <div className="flex items-center justify-between gap-4 w-full">
        <div>
          <h1 className="text-[0.9rem]">Today</h1>
          <h1>{today}</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="rounded-full bg-primary text-white p-2">{getInitials(`${user?.first_name}`)}{getInitials(`${user?.last_name}`)}</div>
        </div>
      </div>
    </header>
  );
}
