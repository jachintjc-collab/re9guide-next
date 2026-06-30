"use client"

import { useState } from "react"
import { Biohazard, ChevronDown, Menu, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"

type NavChild = { label: string; href: string }
type NavItem = { label: string; href: string; children?: NavChild[] }

const NAV: NavItem[] = [
  {
    label: "Walkthroughs",
    href: "/wrenwood-complete-area-guide/",
    children: [
      { label: "Wrenwood — Ch. 1", href: "/wrenwood-complete-area-guide/" },
      { label: "Rhodes Hill — Ch. 2", href: "/rhodes-hill-complete-area-guide/" },
      { label: "Raccoon City — Ch. 3", href: "/raccoon-city-complete-area-guide/" },
      { label: "ARK Facility — Ch. 4", href: "/ark-facility-complete-area-guide/" },
      { label: "Insanity Walkthrough", href: "/insanity-chapter-walkthrough/" },
      { label: "Beginner Guide", href: "/beginner-guide-resident-evil-requiem/" },
      { label: "All 9 Walkthroughs", href: "/all-guides/#walkthroughs" },
    ],
  },
  {
    label: "Tier Lists",
    href: "/best-weapons-tier-list/",
    children: [
      { label: "Best Weapons", href: "/best-weapons-tier-list/" },
      { label: "Best Bosses", href: "/re9-best-bosses-ranked-tier-list/" },
      { label: "All Charms Ranked", href: "/re9-all-charms-ranked-tier-list/" },
      { label: "All Endings", href: "/re9-best-endings-ranked-tier-list/" },
      { label: "Best Moments", href: "/re9-best-moments-ranked-tier-list/" },
      { label: "All 13 Tier Lists", href: "/all-guides/#tier-lists" },
    ],
  },
  {
    label: "Characters",
    href: "/character-eveline-deep-profile/",
    children: [
      { label: "Eveline", href: "/character-eveline-deep-profile/" },
      { label: "Vivien Davies", href: "/character-vivien-davies-deep-profile/" },
      { label: "Grace Ashcroft", href: "/character-grace-ashcroft-deep-profile/" },
      { label: "Father Riley", href: "/character-father-riley-deep-profile/" },
      { label: "Leon Kennedy", href: "/character-leon-kennedy-deep-profile/" },
      { label: "Chris Redfield", href: "/character-chris-redfield-deep-profile/" },
      { label: "All 16 Characters", href: "/all-guides/#character-deep-profiles" },
    ],
  },
  {
    label: "All Guides",
    href: "/all-guides/",
    children: [
      { label: "Trophies (43)", href: "/all-guides/#trophies-achievements" },
      { label: "Beginner (16)", href: "/all-guides/#beginner-guides" },
      { label: "Stuck? Help (15)", href: "/all-guides/#stuck-help" },
      { label: "Insanity (14)", href: "/all-guides/#insanity-difficulty" },
      { label: "Q&A Hubs (10)", href: "/all-guides/#q-a" },
      { label: "Complete Index — 710 Guides", href: "/all-guides/" },
    ],
  },
  { label: "About", href: "/about/" },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [mobileExpand, setMobileExpand] = useState<string | null>(null)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a href="/" className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-sm border border-primary/50 bg-primary/15 text-primary">
            <Biohazard className="size-5 animate-flicker" aria-hidden="true" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-heading text-sm font-bold tracking-[0.25em] text-foreground">
              REQUIEM
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Archive
            </span>
          </span>
        </a>

        {/* Desktop nav with dropdowns */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <div key={item.label} className="group relative">
              <a
                href={item.href}
                className="flex items-center gap-1 rounded-sm px-3 py-2 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors group-hover:bg-secondary group-hover:text-foreground"
              >
                {item.label}
                {item.children && <ChevronDown className="size-3" />}
              </a>
              {item.children && (
                <div className="invisible absolute left-0 top-full z-10 min-w-[14rem] -translate-y-1 opacity-0 transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="mt-1 rounded-md border border-border bg-background shadow-lg shadow-black/40">
                    {item.children.map((child) => (
                      <a
                        key={child.label}
                        href={child.href}
                        className="block border-b border-border px-4 py-2.5 font-mono text-xs text-muted-foreground last:border-b-0 hover:bg-secondary hover:text-primary"
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground"
            aria-label="Search guides"
          >
            <Search className="size-4" />
          </Button>
          <a href="/wrenwood-complete-area-guide/" className="hidden sm:inline-flex">
            <Button className="bg-primary font-mono text-xs uppercase tracking-widest text-primary-foreground hover:bg-primary/85">
              Start Survival
            </Button>
          </a>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile nav with expandable submenus */}
      {open && (
        <nav className="border-t border-border bg-background px-4 py-3 md:hidden">
          {NAV.map((item) => (
            <div key={item.label} className="border-b border-border last:border-b-0">
              <div className="flex items-center justify-between">
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block flex-1 rounded-sm px-3 py-2.5 font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground"
                >
                  {item.label}
                </a>
                {item.children && (
                  <button
                    type="button"
                    className="px-3 py-2.5 text-muted-foreground"
                    onClick={() =>
                      setMobileExpand(mobileExpand === item.label ? null : item.label)
                    }
                    aria-label={`Toggle ${item.label} submenu`}
                  >
                    <ChevronDown
                      className={`size-4 transition-transform ${
                        mobileExpand === item.label ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                )}
              </div>
              {item.children && mobileExpand === item.label && (
                <div className="pb-2 pl-6">
                  {item.children.map((child) => (
                    <a
                      key={child.label}
                      href={child.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-sm px-3 py-2 font-mono text-[11px] text-muted-foreground hover:text-primary"
                    >
                      {child.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      )}
    </header>
  )
}
