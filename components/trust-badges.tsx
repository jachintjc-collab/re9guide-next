import { ShieldCheck, Users, RefreshCw, Award } from "lucide-react"

const BADGES = [
  {
    icon: ShieldCheck,
    title: "Spoiler-Safe",
    desc: "Tagged & toggleable spoilers on every page",
  },
  {
    icon: Users,
    title: "1.2M Survivors",
    desc: "Trusted by a growing community of players",
  },
  {
    icon: RefreshCw,
    title: "Patch-Tracked",
    desc: "Updated within 24h of every game patch",
  },
  {
    icon: Award,
    title: "100% Verified",
    desc: "Routes tested on Hardcore difficulty",
  },
]

export function TrustBadges() {
  return (
    <section className="border-b border-border bg-card/30">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px overflow-hidden border-x border-border bg-border lg:grid-cols-4">
        {BADGES.map((b) => (
          <div
            key={b.title}
            className="flex items-start gap-3 bg-background px-5 py-6"
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-sm border border-primary/30 bg-primary/10 text-primary">
              <b.icon className="size-5" />
            </span>
            <div>
              <p className="font-heading text-sm font-bold tracking-wide text-foreground">
                {b.title}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                {b.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
