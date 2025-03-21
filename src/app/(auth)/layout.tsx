export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main>
      <div className="flex min-h-screen flex-col items-center justify-center">
        {children}
      </div>
    </main>
  );
}
