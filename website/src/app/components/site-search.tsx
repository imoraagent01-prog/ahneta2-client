"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SEARCH_INDEX, type SearchEntry } from "../search-index";

// Real, working client-side site search. The ditto.site capture shipped a decorative
// `<input type="search">` with no state, no results and no navigation (Bootstrap's live-search
// behavior isn't static HTML). This component replaces it: a controlled input matched against a
// small hand-maintained index of the site's 18 real routes (see ../search-index.ts), rendered as
// a dropdown of next/link results. No backend involved, safe for `output: "export"`.

// Lowercase and drop apostrophes/quote marks so "ZZP'er", "ZZP’er" (curly quote, as captured
// from the live site), and plain "zzp" all normalize to the same comparable string.
function normalize(s: string): string {
  return s.toLowerCase().replace(/['’‘´`]/g, "");
}

function matchesQuery(entry: SearchEntry, query: string): boolean {
  const needle = normalize(query.trim());
  if (!needle) return false;
  if (normalize(entry.title).includes(needle) || normalize(entry.excerpt).includes(needle)) return true;
  return (entry.keywords ?? []).some((k) => normalize(k).includes(needle));
}

type SiteSearchProps = {
  pathname: string;
  variant?: "desktop" | "mobile";
};

export default function SiteSearch({ pathname, variant = "desktop" }: SiteSearchProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const trimmed = query.trim();
  const results = trimmed ? SEARCH_INDEX.filter((entry) => matchesQuery(entry, trimmed)).slice(0, 8) : [];

  // Reset on navigation, matching the same pattern SiteHeader already uses to close its own
  // mobile panel / dropdowns on route change.
  useEffect(() => {
    setQuery("");
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("click", onClickOutside);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("click", onClickOutside);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  function handleSelect() {
    setQuery("");
    setOpen(false);
  }

  const isMobile = variant === "mobile";

  return (
    <div ref={rootRef} className={`block relative z-0 ${isMobile ? "w-full" : ""}`}>
      <form
        className={`block relative z-0 h-[40.38px] max-lg:h-100 ${isMobile ? "w-full" : ""}`}
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          if (results.length > 0) {
            router.push(results[0].href);
            handleSelect();
          }
        }}
      >
        <div className="flex relative items-stretch">
          <input
            className={`${isMobile ? "w-full" : "w-[12.8125rem]"} h-10 block relative min-w-0 py-1.5 pr-[1.4375rem] pl-3 rounded-tl-md rounded-bl-md grow overflow-clip bg-border [background-clip:padding-box] [-webkit-background-clip:padding-box] cursor-text text-foreground`}
            name="search"
            placeholder="Zoeken..."
            type="search"
            autoComplete="off"
            aria-label="Zoeken"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            onFocus={() => {
              if (trimmed) setOpen(true);
            }}
          />
          <button
            className="h-[2.525rem] border border-solid border-border block relative z-2 -ml-px py-[0.45rem] px-[1.35rem] rounded-tr-md rounded-br-md align-middle text-center whitespace-nowrap text-nowrap bg-border cursor-pointer"
            aria-label="Zoeken"
            title="Zoeken"
            type="submit"
          >
            <i className="inline-block [font-family:odoo_ui_icons] leading-4 before:content-[''] before:text-foreground before:text-base before:leading-4 before:text-center" />
          </button>
        </div>
      </form>
      {open && trimmed && (
        <ul
          role="listbox"
          aria-label="Zoekresultaten"
          className={`absolute top-full left-0 mt-1 ${isMobile ? "w-full" : "w-72"} max-h-96 overflow-y-auto py-1 rounded-md bg-background shadow-[var(--color-006)_0px_4px_16px_0px] [list-style-type:none] list-outside z-1040`}
        >
          {results.length === 0 ? (
            <li className="block py-2 px-4 text-color-001 text-sm">Geen resultaten voor &ldquo;{trimmed}&rdquo;</li>
          ) : (
            results.map((entry) => (
              <li key={entry.href} role="presentation">
                <Link
                  href={entry.href}
                  role="option"
                  aria-label={entry.title}
                  onClick={handleSelect}
                  className="block py-2 px-4 hover:bg-border cursor-pointer"
                >
                  <span className="block text-color-001 text-sm font-semibold">{entry.title}</span>
                  <span className="block text-color-001 text-xs leading-4.5 line-clamp-2">{entry.excerpt}</span>
                </Link>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
