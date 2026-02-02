import "@/app/globals.css";
import localFont from "next/font/local";
import { getAllPages } from "@/lib/content";
import { Nav } from "../../components/nav";

const bodyFont = localFont({
  src: [
    {
      path: "../../../public/brand/fonts/AvengaHaffer-Regular.woff2",
      weight: "560",
      style: "normal",
    },
    {
      path: "../../../public/brand/fonts/AvengaHaffer-Bold.woff2",
      weight: "730",
      style: "normal",
    },
  ],
  variable: "--font-body",
});

const headingFont = localFont({
  src: [
    {
      path: "../../../public/brand/fonts/AvengaReckless-Headline.woff2",
      weight: "480",
      style: "normal",
    },
    {
      path: "../../../public/brand/fonts/AvengaReckless-Regular.woff2",
      weight: "450",
      style: "normal",
    },
  ],
  variable: "--font-heading",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pages = await getAllPages();
  return (
    <html lang="en">
      <body
        className={`${bodyFont.variable} ${headingFont.variable} antialiased`}
      >
        <div className="root">
          <main className="mx-auto flex min-h-dvh max-w-[1440px] items-start px-10">
            <div className="sticky top-0 flex min-h-dvh w-60 flex-col items-start border-r pt-10">
              <div className="mb-12">
                <img alt="Logo" className="h-6" src="/brand/logo.svg" />
              </div>

              <Nav pages={pages} />
            </div>
            <div className="flex-1">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
