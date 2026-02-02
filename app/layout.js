import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`
          ${inter.variable}
          min-h-screen
          bg-booth-dark
          text-white
          antialiased
          relative
          overflow-x-hidden
        `}
      >
        {/* 🔴 Ruby animated gradient (BASE – only once) */}
        <div className="ruby-animated-bg" />

        {/* 🩸 Ruby ambient circles */}
        <div className="ruby-circles">
          <div className="ruby-circle sm ruby-800" style={{ top: "30%", left: "-150px" }} />
          <div className="ruby-circle md ruby-700" style={{ top: "10%", left: "-300px", animationDelay: "0.3s" }} />
          <div className="ruby-circle lg ruby-900" style={{ top: "-10%", left: "-450px", animationDelay: "0.6s" }} />
          <div className="ruby-circle xl ruby-950" style={{ top: "-25%", left: "-600px", animationDelay: "0.9s" }} />
          <div className="ruby-circle xxl ruby-500" style={{ top: "-40%", left: "-750px", animationDelay: "1.2s" }} />
        </div>

        {/* 🌊 Ruby waves */}
        <div className="ruby-wave" />
        <div className="ruby-wave ruby-wave-2" />
        <div className="ruby-wave ruby-wave-3" />

        {/* 🎞️ Film grain (TOP texture) */}
        <div className="film-grain" />

        {/* 🌐 App content */}
        <div className="relative z-10 min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
