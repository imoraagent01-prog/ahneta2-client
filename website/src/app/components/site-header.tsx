"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Tile from "./tile";
import Link from "next/link";
import SiteSearch from "./site-search";

// Shared, interactive site header used by every route. The ditto.site capture emitted this
// markup duplicated verbatim into every page.tsx with dead `href="#"` dropdown toggles and no
// mobile menu panel at all (Bootstrap's `data-bs-toggle="dropdown"` behavior isn't static HTML).
// Centralized here once, wired up with real click-to-toggle dropdowns and a real mobile panel,
// matching the live site's actual nav structure and Bootstrap dropdown-on-click behavior.

const TILE_DATA = [
  { text: "Lageprijsgarantie" },
  { text: "30 dagen online retourneren" },
  { text: "Standaard verzending" },
];

const TILE_STYLES = [
  { className: "before:content-['']" },
  { className: "before:content-['']" },
  { className: "before:content-['']" },
];

const BEDRIJVEN_ITEMS = [
  { href: "/ondernemersplan", label: "Ondernemersplan" },
  { href: "/administratie", label: "Administratie" },
  { href: "/startende-ondernemer", label: "Startende Ondernemer" },
];

const PARTICULIEREN_ITEMS = [
  { href: "/aangifte-ib", label: "Aangifte IB" },
  { href: "/estate-planning", label: "Estate Planning" },
];

const BEDRIJVEN_PATHS = ["/bedrijven", ...BEDRIJVEN_ITEMS.map((i) => i.href)];
const PARTICULIEREN_PATHS = ["/particulieren", ...PARTICULIEREN_ITEMS.map((i) => i.href)];

function linkClass(active: boolean) {
  const base =
    "h-10 block p-2 [font-family:'Work_Sans',_'Odoo_Unicode_Support_Noto',_sans-serif] whitespace-nowrap text-nowrap cursor-pointer";
  return active ? `${base} text-color-007` : `${base} text-color-001`;
}

function caretClass(open: boolean) {
  const base =
    "after:content-[''] after:inline-block after:w-0 after:h-0 after:ml-1 after:-translate-y-0.5 after:border-x-[4.5px] after:border-x-transparent after:border-t-[4.5px] max-lg:after:w-auto max-lg:after:h-auto";
  return open ? `${base} after:border-t-current` : `${base} after:border-t-black/55`;
}

export default function SiteHeader() {
  const pathname = usePathname() || "/";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<"bedrijven" | "particulieren" | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  const isHome = pathname === "/";
  const isDiensten = pathname === "/onze-diensten";
  const isBedrijven = BEDRIJVEN_PATHS.includes(pathname);
  const isParticulieren = PARTICULIEREN_PATHS.includes(pathname);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("click", onClickOutside);
    return () => document.removeEventListener("click", onClickOutside);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  function toggleDropdown(which: "bedrijven" | "particulieren") {
    setOpenDropdown((cur) => (cur === which ? null : which));
  }

  return (
    <header className="block z-1030 shrink-0 sticky top-0" id="top">
      <nav
        ref={navRef}
        className="block relative justify-start items-center bg-background shadow-[var(--color-006)_0px_1px_3px_0px] max-lg:hidden"
        data-component="nav"
        aria-label="Hoofd"
      >
        <div className="block" id="o_main_nav">
          <div className="border-b border-solid border-b-color-006 block relative z-1 bg-border" aria-label="Boven">
            <div className="flex max-w-285 mx-auto px-[0.9375rem] justify-between gap-4 h-[40.38px] 2xl:max-w-330 max-lg:h-100">
              <ul className="flex py-1 items-center gap-4 [list-style-type:none] list-outside">
                <li className="w-[34.9rem] list-item grow shrink-0 basis-0">
                  <div className="flex items-center gap-6 mx-auto">
                    {TILE_DATA.map((d, i) => (
                      <Tile key={i} d={d} styles={TILE_STYLES[i]} />
                    ))}
                  </div>
                </li>
              </ul>
              <div className="flex [list-style-type:none] list-outside">
                <li className="list-item">
                  <SiteSearch pathname={pathname} variant="desktop" />
                </li>
                <div className="block">
                  <section className="block relative">
                    <div className="flex items-center gap-2 relative h-[40.38px] max-lg:h-100">
                      <Link
                        className="border border-solid border-accent flex py-[0.45rem] px-[1.35rem] items-center align-middle text-accent text-center whitespace-nowrap text-nowrap bg-background cursor-pointer h-[40.38px] rounded-full max-lg:h-100"
                        href="/start"
                      >
                        Start uw traject
                      </Link>
                      <Link
                        className="border border-solid border-accent flex py-[0.45rem] px-[1.35rem] items-center align-middle text-background text-center whitespace-nowrap text-nowrap bg-accent cursor-pointer h-[40.38px] max-lg:h-100"
                        href="/contactus"
                      >
                        Contact
                      </Link>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
          <div className="flex max-w-285 mx-auto py-2 px-[0.9375rem] items-center 2xl:max-w-330" aria-label="Onder">
            <Link
              className="h-13 block max-w-[75%] mr-6 shrink-0 text-color-002 [font-family:'Work_Sans',_'Odoo_Unicode_Support_Noto',_sans-serif] text-[2.1875rem] leading-13 whitespace-nowrap text-nowrap cursor-pointer"
              href="/"
            >
              <span className="inline" aria-label="Logo of Ahneta Advies" role="img" title="Ahneta Advies">
                <img
                  className="w-full h-13 block max-w-full overflow-clip object-contain aspect-[auto_95/40] align-middle"
                  alt="Ahneta Advies"
                  height="40"
                  src="/assets/cloned/images/f0163c3f57fb.png"
                  width="95"
                />
              </span>
            </Link>
            <div className="block ml-auto">
              <ul className="flex justify-end items-center gap-2 [list-style-type:none] list-outside w-[596.7px] max-lg:w-100">
                <li className="list-item relative">
                  <a
                    className="block p-2 rounded-[160px] text-color-001 [font-family:'Work_Sans',_'Odoo_Unicode_Support_Noto',_sans-serif] text-xs font-semibold leading-4.5 uppercase whitespace-nowrap text-nowrap cursor-pointer"
                    href="https://www.ahneta.nl/web/login"
                  >
                    Aanmelden
                  </a>
                </li>
              </ul>
              <ul className="flex justify-end [list-style-type:none] list-outside" id="top_menu" role="menu">
                <li className="list-item" role="presentation">
                  <Link className={linkClass(isHome)} href="/" role="menuitem">
                    <span className="inline">Home</span>
                  </Link>
                </li>
                <li className="list-item" role="presentation">
                  <Link className={linkClass(isDiensten)} href="/onze-diensten" role="menuitem">
                    <span className="inline">Diensten</span>
                  </Link>
                </li>
                <li
                  className="list-item relative"
                  role="presentation"
                  onMouseEnter={() => setOpenDropdown("bedrijven")}
                  onMouseLeave={() => setOpenDropdown((cur) => (cur === "bedrijven" ? null : cur))}
                >
                  <Link
                    className={`${linkClass(isBedrijven)} ${caretClass(openDropdown === "bedrijven")}`}
                    href="#"
                    role="menuitem"
                    aria-expanded={openDropdown === "bedrijven"}
                    onClick={(e) => {
                      e.preventDefault();
                      toggleDropdown("bedrijven");
                    }}
                  >
                    <span className="inline">Bedrijven</span>
                  </Link>
                  {openDropdown === "bedrijven" && (
                    <ul
                      role="menu"
                      className="absolute top-full left-0 min-w-45 py-1 rounded-md bg-background shadow-[var(--color-006)_0px_4px_16px_0px] [list-style-type:none] list-outside z-1040"
                    >
                      {BEDRIJVEN_ITEMS.map((item) => (
                        <li key={item.href} role="presentation">
                          <Link
                            role="menuitem"
                            href={item.href}
                            className="block py-2 px-4 text-color-001 whitespace-nowrap hover:bg-border cursor-pointer"
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
                <li
                  className="list-item relative"
                  role="presentation"
                  onMouseEnter={() => setOpenDropdown("particulieren")}
                  onMouseLeave={() => setOpenDropdown((cur) => (cur === "particulieren" ? null : cur))}
                >
                  <Link
                    className={`${linkClass(isParticulieren)} ${caretClass(openDropdown === "particulieren")}`}
                    href="#"
                    role="menuitem"
                    aria-expanded={openDropdown === "particulieren"}
                    onClick={(e) => {
                      e.preventDefault();
                      toggleDropdown("particulieren");
                    }}
                  >
                    <span className="inline">Particulieren</span>
                  </Link>
                  {openDropdown === "particulieren" && (
                    <ul
                      role="menu"
                      className="absolute top-full left-0 min-w-45 py-1 rounded-md bg-background shadow-[var(--color-006)_0px_4px_16px_0px] [list-style-type:none] list-outside z-1040"
                    >
                      {PARTICULIEREN_ITEMS.map((item) => (
                        <li key={item.href} role="presentation">
                          <Link
                            role="menuitem"
                            href={item.href}
                            className="block py-2 px-4 text-color-001 whitespace-nowrap hover:bg-border cursor-pointer"
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
                <li className="list-item" role="presentation">
                  <Link className={linkClass(pathname === "/pricing")} href="/pricing" role="menuitem">
                    <span className="inline">Prijs</span>
                  </Link>
                </li>
                <li className="list-item" role="presentation">
                  <Link className={linkClass(pathname === "/over-ons")} href="/over-ons" role="menuitem">
                    <span className="inline">Over ons</span>
                  </Link>
                </li>
                <li className="list-item" role="presentation">
                  <Link className={linkClass(pathname === "/contactus")} href="/contactus" role="menuitem">
                    <span className="inline">Contact</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      <nav
        className="hidden relative py-2 flex-wrap justify-between items-center bg-background shadow-[var(--color-006)_0px_1px_3px_0px] max-lg:block"
        aria-label="Mobile"
      >
        <div className="flex max-w-285 mx-auto px-[0.9375rem] flex-wrap justify-between items-center">
          <Link
            className="block min-w-0 max-w-[75%] mr-4 shrink-0 text-color-002 [font-family:'Work_Sans',_'Odoo_Unicode_Support_Noto',_sans-serif] text-[2.1875rem] leading-13 whitespace-nowrap text-nowrap cursor-pointer max-lg:h-13"
            href="/"
          >
            <span className="inline" aria-label="Logo of Ahneta Advies" role="img" title="Ahneta Advies">
              <img
                className="w-full h-13 block max-w-full overflow-clip object-contain aspect-[auto_95/40] align-middle max-md:max-h-13"
                alt="Ahneta Advies"
                height="40"
                src="/assets/cloned/images/f0163c3f57fb.png"
                width="95"
              />
            </span>
          </Link>
          <ul className="flex min-w-0 items-center gap-2 [list-style-type:none] list-outside">
            <li className="list-item min-w-0">
              <button
                className="border border-solid border-color-008 block p-2 rounded-[160px] align-middle text-color-001 [font-family:'Work_Sans',_'Odoo_Unicode_Support_Noto',_sans-serif] text-center whitespace-nowrap text-nowrap cursor-pointer"
                aria-controls="top_menu_collapse_mobile"
                aria-expanded={mobileOpen}
                aria-label="Navigatie aan/uitzetten"
                type="button"
                onClick={() => setMobileOpen((v) => !v)}
              >
                <span
                  className="h-6 w-6 inline-block align-middle [background-size:100%] [background-position:50%_50%] bg-no-repeat"
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%280, 0, 0, 0.55%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e\")",
                  }}
                />
              </button>
            </li>
          </ul>
        </div>
        {mobileOpen && (
          <div id="top_menu_collapse_mobile" className="block bg-background border-t border-solid border-color-006">
            <div className="block px-4 py-3">
              <SiteSearch pathname={pathname} variant="mobile" />
            </div>
            <ul className="block [list-style-type:none] list-outside" role="menu">
              <li role="presentation">
                <Link href="/" role="menuitem" className={`block py-3 px-4 ${isHome ? "text-color-007" : "text-color-001"}`}>
                  Home
                </Link>
              </li>
              <li role="presentation">
                <Link
                  href="/onze-diensten"
                  role="menuitem"
                  className={`block py-3 px-4 ${isDiensten ? "text-color-007" : "text-color-001"}`}
                >
                  Diensten
                </Link>
              </li>
              <li role="presentation" className={`px-4 py-2 text-xs font-semibold uppercase ${isBedrijven ? "text-color-007" : "text-color-001"}`}>
                Bedrijven
              </li>
              {BEDRIJVEN_ITEMS.map((item) => (
                <li key={item.href} role="presentation">
                  <Link href={item.href} role="menuitem" className="block py-2 pl-8 pr-4 text-color-001">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li role="presentation" className={`px-4 py-2 text-xs font-semibold uppercase ${isParticulieren ? "text-color-007" : "text-color-001"}`}>
                Particulieren
              </li>
              {PARTICULIEREN_ITEMS.map((item) => (
                <li key={item.href} role="presentation">
                  <Link href={item.href} role="menuitem" className="block py-2 pl-8 pr-4 text-color-001">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li role="presentation">
                <Link href="/pricing" role="menuitem" className="block py-3 px-4 text-color-001">
                  Prijs
                </Link>
              </li>
              <li role="presentation">
                <Link href="/over-ons" role="menuitem" className="block py-3 px-4 text-color-001">
                  Over ons
                </Link>
              </li>
              <li role="presentation">
                <Link href="/contactus" role="menuitem" className="block py-3 px-4 text-color-001">
                  Contact
                </Link>
              </li>
              <li role="presentation">
                <Link href="/start" role="menuitem" className="block py-3 px-4 text-accent font-medium">
                  Start uw traject
                </Link>
              </li>
              <li role="presentation">
                <a href="https://www.ahneta.nl/web/login" role="menuitem" className="block py-3 px-4 text-color-001 text-xs font-semibold uppercase">
                  Aanmelden
                </a>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
