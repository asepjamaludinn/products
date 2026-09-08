import { DM_Sans } from "next/font/google";
import { AuthProvider } from "@/lib/context/AuthContext";
import { ToastProvider } from "@/lib/context/ToastContext";
import { CartProvider } from "@/lib/context/CartContext";
import { SocketProvider } from "@/lib/context/SocketContext";
import { NotificationProvider } from "@/lib/context/NotificationContext";
import { ToastViewport } from "@/components/molecules/ToastViewport";
import "./globals.css";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });

export const metadata = {
  title: "Tomorrow Co. — Shop Smart",
  description: "Browse products, manage your cart, and shop with confidence.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body>
        <ToastProvider>
          <AuthProvider>
            <SocketProvider>
              <NotificationProvider>
                <CartProvider>{children}</CartProvider>
              </NotificationProvider>
            </SocketProvider>
          </AuthProvider>
          <ToastViewport />
        </ToastProvider>
      </body>
    </html>
  );
}
