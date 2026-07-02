"use client"

import { useState } from "react"
import { Link2, MessageCircle, Twitter, Check } from "lucide-react"

type Props = {
  url: string // relative path e.g. "/about/"
  title: string
}

export function ShareButtons({ url, title }: Props) {
  const [copied, setCopied] = useState(false)
  const fullUrl = `https://www.re9guide.it.com${url}`
  const encodedUrl = encodeURIComponent(fullUrl)
  const encodedTitle = encodeURIComponent(title)

  const links = [
    {
      icon: Twitter,
      label: "X",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      color: "hover:text-sky-400",
    },
    {
      icon: MessageCircle,
      label: "Reddit",
      href: `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
      color: "hover:text-orange-400",
    },
  ]

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (e) {
      console.error("Copy failed:", e)
    }
  }

  return (
    <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-border pt-6">
      <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
        Share
      </span>
      {links.map((l) => (
        <a
          key={l.label}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex size-9 items-center justify-center rounded-sm border border-border bg-background text-muted-foreground transition-colors hover:border-primary/50 ${l.color}`}
          aria-label={`Share on ${l.label}`}
        >
          <l.icon className="size-4" />
        </a>
      ))}
      <button
        type="button"
        onClick={copyLink}
        className="flex size-9 items-center justify-center rounded-sm border border-border bg-background text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
        aria-label="Copy link"
      >
        {copied ? (
          <Check className="size-4 text-emerald-400" />
        ) : (
          <Link2 className="size-4" />
        )}
      </button>
      {copied && (
        <span className="font-mono text-[11px] text-emerald-400">
          Link copied
        </span>
      )}
    </div>
  )
}
