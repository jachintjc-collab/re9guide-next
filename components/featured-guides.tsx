import { ArrowUpRight, Flame, Crosshair, KeyRound, Heart } from "lucide-react"
import { SectionHeading } from "@/components/section-heading"
import { Button } from "@/components/ui/button"

const FEATURED = [
  {
    icon: Crosshair,
    tag: "Boss",
    title: "Defeating The Requiem — Phase 3 Strategy",
    desc: "Ammo conservation, the safe-spot loop, and the exact stagger window to end the final encounter.",
    read: "12 min read",
    href: "/re9-best-boss-strategy/",
    featured: true,
  },
  {
    icon: KeyRound,
    tag: "Puzzle",
    title: "Rhodes Hill Crest Puzzle Solution",
    desc: "Every dial combination and the hidden lever behind the portrait hall.",
    read: "5 min read",
    href: "/all-quartz-puzzle-solutions/",
  },
  {
    icon: Heart,
    tag: "Resource",
    title: "Herb & Healing Route — No Damage Run",
    desc: "Where to farm green herbs and which fights to skip entirely.",
    read: "8 min read",
    href: "/re9-insanity-preparation-checklist/",
  },
  {
    icon: Flame,
    tag: "Build",
    title: "Best Early-Game Weapon Upgrades",
    desc: "Prioritize these three upgrades before reaching Raccoon City.",
    read: "6 min read",
    href: "/re9-best-weapon/",
  },
]

export function FeaturedGuides() {
  return (
    <section id="featured" className="border-b border-border">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <SectionHeading
          eyebrow="Featured Guides"
          title="Editor's Survival Picks"
          description="Hand-selected deep dives that will keep you breathing through the worst the Requiem throws at you."
          action={
            <a href="/tier-lists/">
              <Button
                variant="outline"
                className="border-border bg-card/40 font-mono text-xs uppercase tracking-widest hover:bg-secondary"
              >
                View All Guides
              </Button>
            </a>
          }
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {/* Featured large card */}
          {FEATURED.filter((g) => g.featured).map((g) => (
            <a
              key={g.title}
              href={g.href}
              className="group relative flex flex-col justify-between overflow-hidden rounded-md border border-primary/40 bg-primary/10 p-6 lg:row-span-2"
            >
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-sm border border-primary/50 bg-primary/20 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-primary">
                  <g.icon className="size-3.5" />
                  {g.tag}
                </span>
                <h3 className="mt-5 font-heading text-2xl font-bold leading-tight tracking-tight text-balance text-foreground">
                  {g.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {g.desc}
                </p>
              </div>
              <div className="mt-8 flex items-center justify-between border-t border-primary/30 pt-4">
                <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                  {g.read}
                </span>
                <span className="flex items-center gap-1 font-mono text-xs uppercase tracking-widest text-primary">
                  Read Guide
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </a>
          ))}

          {/* Smaller cards */}
          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-2">
            {FEATURED.filter((g) => !g.featured).map((g) => (
              <a
                key={g.title}
                href={g.href}
                className="group flex flex-col rounded-md border border-border bg-card p-5 transition-colors hover:border-primary/50"
              >
                <span className="inline-flex w-fit items-center gap-1.5 rounded-sm border border-border bg-secondary px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  <g.icon className="size-3.5 text-accent" />
                  {g.tag}
                </span>
                <h3 className="mt-4 font-heading text-base font-bold leading-snug tracking-wide text-foreground">
                  {g.title}
                </h3>
                <p className="mt-2 flex-1 text-xs leading-relaxed text-muted-foreground">
                  {g.desc}
                </p>
                <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                  <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                    {g.read}
                  </span>
                  <ArrowUpRight className="size-4 text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
