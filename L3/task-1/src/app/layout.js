import { AuthProvider } from "@/lib/context/AuthContext";
import "./globals.css";

export const metadata = {
  title: "Task-3",
  description: "Products & categories management",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
