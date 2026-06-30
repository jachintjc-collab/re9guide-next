"use client"

import { useState } from "react"
import { Biohazard, Menu, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const NAV = [
  { label: "Walkthroughs", href: "/wrenwood-complete-area-guide/" },
  { label: "Tier List", href: "/best-weapons-tier-list/" },
  { label: "Characters", href: "/character-eveline-deep-profile/" },
  { label: "Maps", href: "/wrenwood-interactive-map/" },
  { label: "About", href: "/about/" },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)

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

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="rounded-sm px-3 py-2 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {item.label}
            </a>
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
          <Button className="hidden bg-primary font-mono text-xs uppercase tracking-widest text-primary-foreground hover:bg-primary/85 sm:inline-flex">
            Start Survival
          </Button>
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

      {open && (
        <nav className="border-t border-border bg-background px-4 py-3 md:hidden">
          {NAV.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block rounded-sm px-3 py-2.5 font-mono text-xs uppercase tracking-widest text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}
