import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { AuthProviders } from "@/components/auth/auth-providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Proto Loop",
  description:
    "Interactive proof-of-concepts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
            /* Prevent FOUC */
            html {
              visibility: visible;
              opacity: 1;
            }
            
            /* Optimize font loading */
            body {
              font-family: 'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
              margin-top: 0;
              margin-bottom: 0;
              margin-right: 0;
              margin-left: var(--nav-docked-offset, 0px);
              padding: 0;
              transition: margin-left 0.2s ease;
              background: #ffffff;
            }
            
            /* Prevent layout shift */
            * {
              box-sizing: border-box;
            }
            
            /* Hardware acceleration for smooth animations */
            .canvas-background {
              transform: translateZ(0);
              backface-visibility: hidden;
            }
          `,
          }}
        />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <AuthProviders>{children}</AuthProviders>
      </body>
    </html>
  );
}
