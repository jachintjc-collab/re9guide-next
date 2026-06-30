import { HelpCircle, AlertTriangle, Crosshair, MessageCircleQuestion } from "lucide-react"
import { ContentSection } from "@/components/content-section"

export function StuckHelp() {
  return (
    <ContentSection
      id="stuck"
      eyebrow="Stuck? Quick Help"
      title="Unstuck Yourself in Minutes"
      description="15 'I'm stuck' guides + 10 Q&A hubs for the moments when nothing in the official guidebook makes sense."
      bgClass="bg-card/30"
      viewAllHref="/all-guides/#stuck-help"
      viewAllLabel="All Stuck Guides"
      cards={[
        {
          icon: AlertTriangle,
          title: "Wrenwood Bridge (Ch. 1)",
          desc: "The early-game wall everyone hits. Exact route, lantern usage, and the timing window for the cabin escape.",
          href: "/stuck-chapter-1-wrenwood-bridge/",
          meta: "Chapter 1",
        },
        {
          icon: Crosshair,
          title: "Eveline Phase 3 — Can't Dodge",
          desc: "Frame-data analysis of phase 3 attacks. The dodge window everyone gets wrong, and the parry route shortcut.",
          href: "/stuck-eveline-phase-3-cant-dodge/",
          meta: "Boss",
        },
        {
          icon: HelpCircle,
          title: "Insanity Difficulty Stuck",
          desc: "If you're 5+ deaths in on the same room: it's not skill, it's a loadout issue. Charm + weapon adjustments.",
          href: "/stuck-insanity-difficulty-stuck/",
          meta: "Difficulty",
        },
        {
          icon: MessageCircleQuestion,
          title: "Boss Q&A Hub",
          desc: "Most-asked boss fight questions answered. The Requiem stagger window, Hollow Matron mask timing, all phases.",
          href: "/qa-hub-bosses/",
          meta: "Q&A",
        },
      ]}
    />
  )
}
