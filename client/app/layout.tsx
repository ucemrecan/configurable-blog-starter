import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Personal Blog",
  description: "A personal blog built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex flex-col md:flex-row bg-white">
          <Sidebar />
          <main className="flex-1 flex flex-col md:ml-80 lg:ml-96 md:h-screen md:overflow-y-auto">
            <div className="flex-1 p-8 md:p-12 lg:p-16">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
