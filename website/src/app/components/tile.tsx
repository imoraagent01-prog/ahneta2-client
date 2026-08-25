import type { TileStyles } from "../_styles";
import { cn } from "../../lib/utils";
export type TileData = {
  text: string;
};
/** A content tile. */
export default function Tile({ d, styles }: { d: TileData; styles: TileStyles }) {
  return (
    <small className="flex items-center text-sm leading-[1.3125rem]">
      <i className={cn("w-7 h-7 block relative mr-1 align-middle [font-family:FontAwesome] leading-7 text-center before:text-foreground before:text-sm before:leading-7 before:text-center", styles.className)} />
      {d.text}
    </small>
  );
}
