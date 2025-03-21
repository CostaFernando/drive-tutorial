export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main>
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        {children}
      </div>
    </main>
  );
}
