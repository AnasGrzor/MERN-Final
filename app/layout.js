import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "@/features/auth/AuthContext";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Wiz App",
  description: "A video streaming app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ToastContainer />
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
