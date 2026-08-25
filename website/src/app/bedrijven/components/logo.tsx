import type { LogoStyles } from "../_styles";
import { cn } from "../../../lib/utils";
export type LogoData = {
  ariadescribedby: string;
  imgSrc: string;
};
/** A logo. */
export default function Logo({ d, styles }: { d: LogoData; styles: LogoStyles }) {
  return (
    <div className="w-95 block max-w-full py-4 px-[0.9375rem] shrink-0 max-md:w-[23.4375rem] md:max-lg:w-180 2xl:w-110">
      <img className={cn("block max-w-full mx-auto overflow-clip align-middle", styles.className)} data-component="image" alt="" aria-describedby={d.ariadescribedby} src={d.imgSrc} />
      {" "}
    </div>
  );
}
