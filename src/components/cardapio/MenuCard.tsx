import Image from "next/image";
import { MenuItem } from "@/data/menu";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

interface MenuCardProps {
  item: MenuItem;
  compact?: boolean;
}

export function MenuCard({ item, compact = false }: MenuCardProps) {
  return (
    <article
      className={cn(
        "group overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
        compact && "flex gap-4 p-3",
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden",
          compact ? "h-24 w-24 shrink-0 rounded-xl" : "aspect-[4/3]",
        )}
      >
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes={compact ? "96px" : "(max-width: 768px) 100vw, 33vw"}
          loading="lazy"
        />
      </div>

      <div className={cn("p-4", compact && "flex flex-1 flex-col justify-center !p-0")}>
        <div className="mb-2 flex flex-wrap gap-1.5">
          {item.tags?.map((tag) => (
            <Badge key={tag} tag={tag} />
          ))}
        </div>
        <h3 className="font-semibold text-anita-black">{item.name}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-anita-gray">
          {item.description}
        </p>
        <p className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-0.5 font-display text-xl tracking-wide text-anita-orange uppercase">
          <span>{item.price}</span>
          {item.priceNote ? (
            <span className="font-sans text-xs font-semibold tracking-wide text-anita-gray normal-case">
              {item.priceNote}
            </span>
          ) : null}
        </p>
      </div>
    </article>
  );
}
