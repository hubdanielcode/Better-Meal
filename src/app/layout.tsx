import "./globals.css";
import { Metadata } from "next";
import { NavigationBar } from "../shared/components/NavigationBar";
import { QueryProvider } from "@/shared/providers/QueryProvider";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Better Meal",
  description: "Aplicativo voltado para geração de dietas saudáveis e balanceadas através de IA",
  icons: {
    icon: "/logo/better-meal-logo.png",
  },
};

const rootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="pt-BR">
      <QueryProvider>
        <body className="w-full min-h-screen bg-gray-200 select-none">
          <NavigationBar />

          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: "#C1F6CA",
                color: "#000000",
                fontWeight: 600,
                borderRadius: "8px",
              },

              iconTheme: { primary: "#FFFFFF", secondary: "#236A2F" },

              error: {
                style: {
                  background: "#EFAFAF",
                  color: "#000000",
                  fontWeight: 600,
                  borderRadius: "8px",
                },

                iconTheme: { primary: "#B91C1C", secondary: "#FFFFFF" },
              },
            }}
          />

          <div
            className="max-w-7xl pt-28 px-4 mx-auto min-h-screen"
            id="root"
          >
            {children}
          </div>
        </body>
      </QueryProvider>
    </html>
  );
};

export default rootLayout;
