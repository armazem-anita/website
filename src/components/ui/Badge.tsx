import { MenuTag, tagLabels } from "@/data/menu";
import { cn } from "@/lib/utils";

const tagStyles: Record<MenuTag, string> = {
  "mais-pedido": "bg-anita-orange text-white",
  "especial-casa": "bg-anita-black text-white",
  "para-compartilhar": "bg-anita-cream-dark text-anita-black",
  novidade: "bg-green-800 text-white",
  "happy-hour": "bg-amber-500 text-anita-black",
  "sem-alcool": "bg-sky-700 text-white",
};

export function Badge({
  tag,
  className,
}: {
  tag: MenuTag;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider",
        tagStyles[tag],
        className,
      )}
    >
      {tagLabels[tag]}
    </span>
  );
}
