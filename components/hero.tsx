import Image from "next/image"
import { BookOpen, Play, Skull } from "lucide-react"
import { Button } from "@/components/ui/button"

const STATS = [
  { value: "240+", label: "Guides" },
  { value: "4", label: "Regions" },
  { value: "100%", label: "Completion" },
]

export function Hero() {
  return (
    <section id="top" className="grain relative overflow-hidden border-b border-border">
      {/* Atmospheric background */}
      <div className="absolute inset-0">
        <Image
          src="/hero-fog.png"
          alt=""
          fill
          priority
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-background/60" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,var(--background)_95%)]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12 lg:px-8 lg:py-24">
        {/* Copy */}
        <div className="relative z-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.25em] text-primary">
            <Skull className="size-3.5" />
            Resident Evil Requiem
          </span>

          <h1 className="mt-5 font-heading text-4xl font-black leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-6xl">
            The Definitive
            <span className="block text-primary">RE9 Survival Archive</span>
          </h1>

          <p className="mt-5 max-w-xl text-pretty leading-relaxed text-muted-foreground">
            Step back into the dark. Complete area walkthroughs, hidden item
            routes, boss strategies, and curated tier lists for every horror
            that stalks Wrenwood, Rhodes Hill, Raccoon City, and the ARK
            Facility.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Button
              size="lg"
              className="bg-primary font-mono text-xs uppercase tracking-widest text-primary-foreground hover:bg-primary/85"
            >
              <Play className="size-4" />
              Start Walkthrough
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border bg-card/40 font-mono text-xs uppercase tracking-widest text-foreground hover:bg-secondary"
            >
              <BookOpen className="size-4" />
              Browse Guides
            </Button>
          </div>

          <dl className="mt-10 flex max-w-md divide-x divide-border border-y border-border">
            {STATS.map((s) => (
              <div key={s.label} className="flex-1 px-4 py-4">
                <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {s.label}
                </dt>
                <dd className="mt-1 font-heading text-2xl font-bold text-foreground">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Game cover */}
        <div className="relative z-10 mx-auto w-full max-w-sm">
          <div className="group relative aspect-[3/4] overflow-hidden rounded-md border border-border shadow-2xl shadow-black/60">
            <Image
              src="/re9-cover.png"
              alt="Resident Evil Requiem cover art"
              fill
              priority
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                Now Surviving
              </p>
              <p className="mt-1 font-heading text-xl font-bold tracking-wide text-foreground">
                RE9: Requiem
              </p>
              <div className="mt-2 flex items-center gap-2">
                <span className="rounded-sm border border-border bg-background/60 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Survival Horror
                </span>
                <span className="rounded-sm border border-primary/40 bg-primary/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-primary">
                  Mature
                </span>
              </div>
            </div>
          </div>
          <div
            aria-hidden="true"
            className="absolute -inset-4 -z-10 rounded-lg bg-primary/10 blur-2xl"
          />
        </div>
      </div>
    </section>
  )
}
