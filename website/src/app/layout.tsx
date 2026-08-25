import "./globals.css";
import type { ReactNode } from "react";
import { SITE_ORIGIN } from "../lib/site";
import SiteHeader from "./components/site-header";

export const metadata = {
  "metadataBase": new URL(SITE_ORIGIN || "http://localhost:3000"),
  "title": "Home | Ahneta Advies",
  "alternates": {
    "canonical": "/"
  },
  "openGraph": {
    "title": "Home | Ahneta Advies",
    "type": "website",
    "siteName": "Ahneta Advies",
    "url": "/",
    "images": [
      "https://www.ahneta.nl/web/image/website/1/logo?unique=ace4424"
    ]
  },
  "twitter": {
    "card": "summary_large_image",
    "title": "Home | Ahneta Advies",
    "images": [
      "https://www.ahneta.nl/web/image/website/1/logo/300x300?unique=ace4424"
    ]
  },
  "icons": {
    "shortcut": [
      {
        "url": "/assets/cloned/images/2d40eddaef73.ico",
        "type": "image/x-icon"
      }
    ]
  }
};
export const viewport = {
  "width": "device-width",
  "initialScale": 1
};


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={"nl-NL"}>
      <body className="cn0" suppressHydrationWarning>
        <div className="h-full flex relative z-0 flex-col overflow-auto" id="wrapwrap">
          <SiteHeader />
          {children}
        </div>
      </body>
    </html>
  );
}
