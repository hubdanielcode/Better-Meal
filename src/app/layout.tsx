import "./globals.css";
import { Metadata } from "next";
import { NavigationBar } from "../shared/components/NavigationBar";

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
      <body className="w-full min-h-screen bg-gray-200 select-none">
        <NavigationBar />

        <div
          className="max-w-7xl pt-28 px-4 mx-auto min-h-screen"
          id="root"
        >
          {children}
        </div>
      </body>
    </html>
  );
};

export default rootLayout;
