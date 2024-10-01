import "./globals.css";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import CreateEvent from "../components/CreateEvent";
import Header from "../components/Header";

export const metadata = {
  title: "Schedulr",
  description: "Meetings, simplified.",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
 <ClerkProvider>
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
          {children}
        </main>
        <footer className="bg-blue-100 py-12">
          <div className="container mx-auto px-4 text-center text-gray-600">
            <p>© 2024 Schedulr</p>
          </div>
        </footer>
        <CreateEvent />
      </body>
    </html>
 </ClerkProvider>
  );
}
