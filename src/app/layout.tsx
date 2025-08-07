import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.scss";
import ClientToast from "./clientToast";
import "react-toastify/dist/ReactToastify.css"; 
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Ead",
  description: "Ead",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
    <html lang="pt-br">
      <body className={`${geistSans.variable ?? ''} ${geistMono.variable ?? ''}`}>
      <ClientToast />
      <PrimeReactProvider>
        {children}    
      </PrimeReactProvider>    
      </body>
       
    </html>
  );
}
