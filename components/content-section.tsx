import { ArrowUpRight, type LucideIcon } from "lucide-react"
import { SectionHeading } from "@/components/section-heading"

type Card = {
  icon: LucideIcon
  title: string
  desc: string
  href: string
  meta?: string
}

type Props = {
  id: string
  eyebrow: string
  title: string
  description: string
  cards: Card[]
  bgClass?: string
  viewAllHref?: string
  viewAllLabel?: string
}

export function ContentSection({
  id,
  eyebrow,
  title,
  description,
  cards,
  bgClass,
  viewAllHref,
  viewAllLabel = "View All",
}: Props) {
  return (
    <section id={id} className={`border-b border-border ${bgClass || ""}`}>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          description={description}
          action={
            viewAllHref ? (
              <a
                href={viewAllHref}
                className="rounded-sm border border-border bg-card/40 px-4 py-2 font-mono text-xs uppercase tracking-widest text-foreground hover:bg-secondary hover:border-primary/50"
              >
                {viewAllLabel} →
              </a>
            ) : undefined
          }
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <a
              key={card.title}
              href={card.href}
              className="group flex flex-col rounded-md border border-border bg-card p-5 transition-colors hover:border-primary/50"
            >
              <span className="flex size-10 items-center justify-center rounded-sm border border-primary/40 bg-primary/15 text-primary">
                <card.icon className="size-5" />
              </span>
              <h3 className="mt-4 font-heading text-base font-bold leading-snug tracking-wide text-foreground">
                {card.title}
              </h3>
              <p className="mt-2 flex-1 text-xs leading-relaxed text-muted-foreground">
                {card.desc}
              </p>
              <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                  {card.meta || "Read"}
                </span>
                <ArrowUpRight className="size-4 text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
