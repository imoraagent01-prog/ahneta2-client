export type ListRowData = {
  href: string;
  label: string;
};
/** A list row. */
export default function ListRow({ d }: { d: ListRowData }) {
  return (
    <li className="list-item" role="presentation">
      <a className="h-10 block p-2 text-color-001 [font-family:'Work_Sans',_'Odoo_Unicode_Support_Noto',_sans-serif] whitespace-nowrap text-nowrap cursor-pointer" data-component="link" href={d.href} role="menuitem">
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
