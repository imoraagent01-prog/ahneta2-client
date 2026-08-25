"use client";
import { useState } from "react";
import { cn } from "../../../lib/utils";

// Source: https://www.ahneta.nl/bedrijven (myQuoteCarousel617108)
// Live site cycles 3 avatar images through the same placeholder quote; the
// ditto capture only recorded the active slide. Restored the other 2 avatars
// and wired the dots/prev/next controls so the carousel actually cycles.
const AVATARS = [
 "/assets/cloned/images/e964d90c8602.jpg",
 "/assets/cloned/images/quote-avatar-4.jpg",
 "/assets/cloned/images/quote-avatar-5.jpg"
];

export default function QuoteCarousel() {
 const [active, setActive] = useState(0);
 const prev = () => setActive((a) => (a - 1 + AVATARS.length) % AVATARS.length);
 const next = () => setActive((a) => (a + 1) % AVATARS.length);
 return (
 <section className="block relative">
 <div className="block relative bg-border" data-ditto-id="style-span-18" id="myQuoteCarousel617108">
 <ol className="h-[1.1rem] flex absolute bottom-0 inset-x-0 z-2 mb-4 mx-48 justify-center [list-style-type:none] list-outside max-md:mx-[56.3px] md:max-lg:mx-[7.2rem] " data-ditto-id="style-p-6">
 {AVATARS.map((_, i) => (
 <li
 key={i}
 className={cn(
 "box-content w-7.5 h-[0.6rem] list-item mb-2 mx-[0.1875rem] rounded-[4.8px] indent-[-999px] bg-background [background-clip:padding-box] shadow-[var(--color-006)_0px_1px_3px_0px] [-webkit-background-clip:padding-box] cursor-pointer",
 i !== active && "opacity-50"
 )}
 onClick={() => setActive(i)}
 role="button"
 aria-label={`Quote ${i + 1}`}
 />
 ))}
 </ol>
 {" "}
 <div className="block relative isolate overflow-hidden after:content-[''] after:block after:w-full after:h-0">
 <div className="w-full h-88.5 min-h-88.5 block relative float-left -mr-320 py-20 bg-cover [background-position:50%_50%] bg-no-repeat max-lg:h-[440.3px] max-lg:min-h-[440.3px] max-md:-mr-[23.4375rem] md:max-lg:-mr-192 2xl:-mr-480" style={{ backgroundImage: "url(\"/assets/cloned/images/647d672ef452.jpg\")" }}>
 <div className="h-full block absolute top-0 inset-x-0 overflow-hidden text-background bg-color-004 bg-no-repeat pointer-events-none" data-ditto-id="style-link-25" />
 {" "}
 <div className="h-full block relative max-w-285 mx-auto px-[0.9375rem] max-md:max-w-none md:max-lg:max-w-180 2xl:max-w-330 before:content-[''] before:table before:w-0 before:h-0 after:content-[''] after:table after:w-0 after:h-0">
 <blockquote className="h-full block mx-auto text-xl italic leading-7.5 w-[34.6875rem] max-lg:w-[21.5625rem] 2xl:w-[40.3125rem]">
 <i className="w-12 h-12 block float-left rounded-tl-md rounded-bl-md align-middle text-background [font-family:FontAwesome] text-base not-italic leading-12 text-center bg-accent before:content-[''] before:text-background before:text-base before:leading-12 before:text-center" />
 {" "}
 <div className="h-full block p-6 overflow-hidden bg-background" data-ditto-id="style-div-18">
 <p className="block mb-4">
 Schrijf hier een citaat van één van je klanten. Citaten zijn een geweldige manier om het vertrouwen in je producten of diensten te vergroten.
 </p>
 {" "}
 <footer className="block text-muted-foreground text-lg leading-[1.625rem] before:content-['']">
 <img className="w-10 h-10 inline max-h-10 mr-2 rounded-[50%] overflow-clip align-middle" data-ditto-id="style-avatar" data-component="avatar" alt="" src={AVATARS[active]} />
 {" "}
 <span className="inline opacity-75">
 <b className="inline font-bold">
 Jane DOE
 </b>
 {" • CEO of MyCompany"}
 </span>
 {" "}
 </footer>
 {" "}
 </div>
 {" "}
 </blockquote>
 {" "}
 </div>
 {" "}
 </div>
 {" "}
 </div>
 {" "}
 <div className="h-full flex absolute top-0 right-[73.6rem] left-0 z-1 justify-start items-center text-background text-center cursor-pointer max-md:hidden md:max-lg:right-[44.1625rem] 2xl:right-[110.4rem]" aria-label="Vorige" role="img" title="Vorige" onClick={prev}>
 <span className="w-[46.9px] h-12 block text-foreground [background-size:100%_100%] [background-position:50%_50%] bg-no-repeat md:max-lg:w-11 md:max-lg:h-[2.6375rem] before:content-[''] before:inline-block before:w-[22.9px] before:h-12 before:ml-6 before:text-background before:text-[2rem] before:leading-12 before:text-center max-md:before:text-[1.5625rem] max-md:before:leading-[2.3125rem] max-md:before:w-auto max-md:before:h-auto md:max-lg:before:w-5 md:max-lg:before:h-[2.6375rem] md:max-lg:before:text-[1.75rem] md:max-lg:before:leading-[2.625rem]" data-ditto-id="style-span-14" />
 {" "}
 <span className="w-px h-px block absolute top-[177.5px] left-0 min-w-0 -m-px overflow-hidden whitespace-nowrap text-nowrap" data-ditto-id="style-span-21">
 Vorige
 </span>
 {" "}
 </div>
 {" "}
 <div className="h-full flex absolute top-0 right-0 left-[73.6rem] z-1 justify-end items-center text-background text-center cursor-pointer max-md:hidden md:max-lg:left-[44.1625rem] 2xl:left-[110.4rem]" aria-label="Volgende" role="img" title="Volgende" onClick={next}>
 <span className="w-[46.9px] h-12 block text-foreground [background-size:100%_100%] [background-position:50%_50%] bg-no-repeat md:max-lg:w-11 md:max-lg:h-[2.6375rem] before:content-[''] before:inline-block before:w-[22.9px] before:h-12 before:mr-6 before:text-background before:text-[2rem] before:leading-12 before:text-center max-md:before:text-[1.5625rem] max-md:before:leading-[2.3125rem] max-md:before:w-auto max-md:before:h-auto md:max-lg:before:w-5 md:max-lg:before:h-[2.6375rem] md:max-lg:before:text-[1.75rem] md:max-lg:before:leading-[2.625rem]" data-ditto-id="style-span-19" />
 {" "}
 <span className="w-px h-px block absolute left-[3.2rem] min-w-0 -m-px overflow-hidden whitespace-nowrap text-nowrap md:max-lg:left-[30.7px] 2xl:left-[4.8rem]">
 Volgende
 </span>
 {" "}
 </div>
 {" "}
 </div>
 {" "}
 </section>
 );
}
