import { Biohazard, Globe, MessageCircle, Rss } from "lucide-react"

const COLUMNS = [
  {
    title: "Walkthroughs",
    links: ["Wrenwood", "Rhodes Hill", "Raccoon City", "ARK Facility"],
  },
  {
    title: "Resources",
    links: ["Enemy Tier List", "Item Database", "Interactive Maps", "Achievements"],
  },
  {
    title: "Community",
    links: ["Forums", "Discord", "Submit a Guide", "Contributors"],
  },
]

export function SiteFooter() {
  return (
    <footer className="bg-card/40">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex size-9 items-center justify-center rounded-sm border border-primary/50 bg-primary/15 text-primary">
                <Biohazard className="size-5" aria-hidden="true" />
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-heading text-sm font-bold tracking-[0.25em] text-foreground">
                  REQUIEM
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  Archive
                </span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-xs leading-relaxed text-muted-foreground">
              An unofficial fan-made survival archive for Resident Evil Requiem.
              Stay alert. Conserve ammo. Trust no one.
            </p>
            <div className="mt-5 flex items-center gap-2">
              {[MessageCircle, Globe, Rss].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex size-9 items-center justify-center rounded-sm border border-border bg-background text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
                  aria-label="Social link"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-primary">
                {col.title}
              </p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 sm:flex-row">
          <p className="font-mono text-[11px] text-muted-foreground">
            &copy; {new Date().getFullYear()} Requiem Archive. Fan project, not
            affiliated with Capcom.
          </p>
          <div className="flex items-center gap-5">
            <a href="#" className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground hover:text-foreground">
              Privacy
            </a>
            <a href="#" className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground hover:text-foreground">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
