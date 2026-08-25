import type { ListRow2Styles } from "../_styles";
import { cn } from "../../../lib/utils";
export type ListRow2Data = {
  text: string;
};
/** A list row. */
export default function ListRow2({ d, styles }: { d: ListRow2Data; styles: ListRow2Styles }) {
  return (
    <li className={cn("block relative py-2 px-4 bg-background", styles.className)}>
      <font className="inline">
        {" "}
        <font className="inline">
          {d.text}
        </font>
        {" "}
      </font>
      {" "}
      <br className="inline" />
      {" "}
    </li>
  );
}
