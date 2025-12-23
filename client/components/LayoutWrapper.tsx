'use client';

import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      <Sidebar />
      <main className="flex-1 flex flex-col md:ml-80 lg:ml-96 md:h-screen md:overflow-y-auto">
        <div className="flex-1 p-8 md:p-12 lg:p-16">{children}</div>
      </main>
    </div>
  );
}

