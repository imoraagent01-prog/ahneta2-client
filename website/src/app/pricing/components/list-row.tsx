import type { ListRowStyles } from "../_styles";
import { cn } from "../../../lib/utils";
export type ListRowData = {
  href: string;
  label: string;
};
/** A list row. */
export default function ListRow({ d, styles }: { d: ListRowData; styles: ListRowStyles }) {
  return (
    <li className="list-item" role="presentation">
      <a className={cn("h-10 block p-2 [font-family:'Work_Sans',_'Odoo_Unicode_Support_Noto',_sans-serif] whitespace-nowrap text-nowrap cursor-pointer", styles.className)} data-component="link" href={d.href} role="menuitem">
        {" "}
        <span className="inline">
          {d.label}
        </span>
        {" "}
      </a>
      {" "}
    </li>
  );
}
