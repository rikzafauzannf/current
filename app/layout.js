import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "myCurrent",
  description: "Aplikasi Record Belanja Saya",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="night">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
