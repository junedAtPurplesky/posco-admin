export function AdminHeader() {
  return (
    <header className="flex justify-between items-center sticky z-20 top-0 bg-white px-8 py-4">
      <div className="flex items-center justify-between gap-4 w-full">
        <div>
          <h1>Today</h1>
          <h1>May 20, 2025</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="rounded-full bg-primary text-white p-2">AS</div>
          <h1>Aaftab Sheikh</h1>
        </div>
      </div>
    </header>
  );
}
