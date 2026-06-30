import Image from "next/image"
import { ArrowUpRight, MapPin, Clock } from "lucide-react"
import { SectionHeading } from "@/components/section-heading"

const AREAS = [
  {
    name: "Wrenwood",
    chapter: "Chapter 1",
    image: "/area-wrenwood.png",
    href: "/wrenwood-complete-area-guide/",
    desc: "Escape the misty woods and the cabin that started it all. Lantern routes and first weapon pickups.",
    difficulty: "Easy",
    time: "2.5 hrs",
    guides: 38,
  },
  {
    name: "Rhodes Hill",
    chapter: "Chapter 2",
    image: "/area-rhodes.png",
    href: "/rhodes-hill-complete-area-guide/",
    desc: "Unlock the decaying manor's locked wings, solve the crest puzzles, and survive the first true hunter.",
    difficulty: "Medium",
    time: "4 hrs",
    guides: 61,
  },
  {
    name: "Raccoon City",
    chapter: "Chapter 3",
    image: "/area-raccoon.png",
    href: "/raccoon-city-complete-area-guide/",
    desc: "Navigate the fallen streets, manage horde density, and recover the RPD evidence cache.",
    difficulty: "Hard",
    time: "5.5 hrs",
    guides: 84,
  },
  {
    name: "ARK Facility",
    chapter: "Chapter 4",
    image: "/area-ark.png",
    href: "/ark-facility-complete-area-guide/",
    desc: "Breach the underground labs, disable containment, and face the Requiem in its final form.",
    difficulty: "Nightmare",
    time: "6 hrs",
    guides: 57,
  },
]

const DIFFICULTY: Record<string, string> = {
  Easy: "border-accent/40 bg-accent/15 text-accent",
  Medium: "border-accent/40 bg-accent/15 text-accent",
  Hard: "border-primary/40 bg-primary/15 text-primary",
  Nightmare: "border-primary/50 bg-primary/25 text-primary",
}

export function AreaGuides() {
  return (
    <section id="areas" className="border-b border-border">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <SectionHeading
          eyebrow="Area Walkthroughs"
          title="Survive Every Region"
          description="Four interconnected nightmares, each with full maps, collectible routes, and boss strategies."
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {AREAS.map((area) => (
            <a
              key={area.name}
              href={area.href}
              className="group relative flex flex-col overflow-hidden rounded-md border border-border bg-card transition-colors hover:border-primary/50"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={area.image || "/placeholder.svg"}
                  alt={`${area.name} environment`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                <span className="absolute left-3 top-3 rounded-sm border border-border bg-background/70 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground backdrop-blur">
                  {area.chapter}
                </span>
                <span
                  className={`absolute right-3 top-3 rounded-sm border px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest backdrop-blur ${DIFFICULTY[area.difficulty]}`}
                >
                  {area.difficulty}
                </span>
              </div>

              <div className="relative -mt-8 flex flex-1 flex-col p-4">
                <h3 className="flex items-center gap-1.5 font-heading text-lg font-bold tracking-wide text-foreground">
                  <MapPin className="size-4 text-primary" />
                  {area.name}
                </h3>
                <p className="mt-2 flex-1 text-xs leading-relaxed text-muted-foreground">
                  {area.desc}
                </p>
                <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                  <span className="flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground">
                    <Clock className="size-3.5" />
                    {area.time}
                  </span>
                  <span className="flex items-center gap-1 font-mono text-[11px] uppercase tracking-widest text-primary">
                    {area.guides} Guides
                    <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
