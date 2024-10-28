import type { Metadata } from "next";
import { Red_Hat_Display, Roboto, Poppins } from "next/font/google";
import "./style/globals.css";
import { Toaster } from "react-hot-toast";

const redHatDisplay = Red_Hat_Display({
  subsets: ["latin"],
  variable: "--font-redHatDisplay",
  weight: ["300", "400", "500", "600", "700"],
});
const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["300", "400", "500", "700"],
});
const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    absolute: "",
    default: "Sawari",
    template: "%s | Sawari",
  },
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${redHatDisplay.variable} ${roboto.variable} ${poppins.variable} bg-[#fcfcfc]`}
      >
        {/* <NextTopLoader /> */}
        <Toaster />
        {children}
      </body>
    </html>
  );
}
