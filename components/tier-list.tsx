import { SectionHeading } from "@/components/section-heading"

type Tier = {
  rank: string
  label: string
  color: string
  entries: string[]
}

const TIERS: Tier[] = [
  {
    rank: "S",
    label: "Apex Threats",
    color: "border-primary bg-primary/20 text-primary",
    entries: ["The Requiem", "Hollow Matron", "Ashen Stalker"],
  },
  {
    rank: "A",
    label: "Lethal",
    color: "border-primary/70 bg-primary/12 text-primary",
    entries: ["Crimson Hound", "Warden X-2", "Pale Choir"],
  },
  {
    rank: "B",
    label: "Dangerous",
    color: "border-accent/60 bg-accent/15 text-accent",
    entries: ["Husk Brute", "Vault Leech", "Wretch"],
  },
  {
    rank: "C",
    label: "Manageable",
    color: "border-accent/50 bg-accent/10 text-accent",
    entries: ["Shambler", "Lurker", "Carrion Dog"],
  },
  {
    rank: "D",
    label: "Trivial",
    color: "border-border bg-secondary text-muted-foreground",
    entries: ["Crawler", "Swarmling"],
  },
]

export function TierList() {
  return (
    <section id="tiers" className="border-b border-border bg-card/30">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <SectionHeading
          eyebrow="Enemy Tier List"
          title="Threat Rankings"
          description="Community-voted danger ratings for every enemy and boss, ranked by lethality on Hardcore difficulty."
        />

        <div className="mt-10 overflow-hidden rounded-md border border-border bg-background">
          {TIERS.map((tier) => (
            <div
              key={tier.rank}
              className="flex items-stretch border-b border-border last:border-b-0"
            >
              <div
                className={`flex w-16 shrink-0 flex-col items-center justify-center border-r-2 ${tier.color} sm:w-20`}
              >
                <span className="font-heading text-2xl font-black sm:text-3xl">
                  {tier.rank}
                </span>
                <span className="px-1 text-center font-mono text-[8px] uppercase leading-tight tracking-widest opacity-80">
                  {tier.label}
                </span>
              </div>
              <div className="flex flex-1 flex-wrap items-center gap-2 p-3">
                {tier.entries.map((entry) => (
                  <span
                    key={entry}
                    className="rounded-sm border border-border bg-card px-3 py-2 font-mono text-xs tracking-wide text-foreground transition-colors hover:border-primary/50 hover:text-primary"
                  >
                    {entry}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
