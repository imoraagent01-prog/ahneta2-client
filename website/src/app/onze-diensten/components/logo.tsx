export type LogoData = {
  imgSrc: string;
};
/** A logo. */
export default function Logo({ d }: { d: LogoData }) {
  return (
    <div className="w-47.5 h-[115.1px] min-h-6 block max-w-full py-4 px-[0.9375rem] shrink-0 max-md:w-[23.4375rem] max-md:h-[13.2rem] md:max-lg:w-180 md:max-lg:h-58 2xl:w-55 2xl:h-[130.7px]">
      <img className="w-40 h-[5.1875rem] block max-w-full overflow-clip align-middle mx-auto max-md:w-[21.5625rem] max-md:h-[11.1875rem] md:max-lg:w-[24.0625rem] md:max-lg:h-50 2xl:w-47.5 2xl:h-[6.1875rem]" data-component="image" alt="" src={d.imgSrc} />
      {" "}
    </div>
  );
}
