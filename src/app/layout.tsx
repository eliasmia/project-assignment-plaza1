import type { Metadata } from "next";
import "./globals.css";

import Header from "../components/common/Header"
import Footer from "../components/common/Footer"

export const metadata: Metadata = {
  title: "Walton Plaza | Online shopping from a great selection of electronics, refrigerators, AC, Mobile phones, etc.",
  description: "Walton Plaza is the largest selling and distribution network for Walton products in the country. Walton Plaza began its business in 2003. From then on, it continued to grow rapidly by providing quality service to customers. As of today, Walton Plaza has more than 642 well-furnished and compliance-based sales outlets and 81 service points all over the country.",
};

export default function RootLayout({ children, }: Readonly <{ children: React.ReactNode;}>) 
{
  return (
    <html
      lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
