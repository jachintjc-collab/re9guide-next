import { BookOpen, Settings, Users, Gauge } from "lucide-react"
import { ContentSection } from "@/components/content-section"

export function BeginnerKit() {
  return (
    <ContentSection
      id="beginner"
      eyebrow="Start Here"
      title="Beginner Survival Kit"
      description="New to RE9 or the Resident Evil series? 16 beginner guides covering difficulty, controls, co-op, and first-time fear-management."
      viewAllHref="/all-guides/#beginner-guides"
      viewAllLabel="All 16 Beginner Guides"
      cards={[
        {
          icon: BookOpen,
          title: "Complete Beginner Guide",
          desc: "First-time RE9 player walkthrough: what to expect, how to start, and what NOT to miss in Chapter 1.",
          href: "/beginner-guide-resident-evil-requiem/",
          meta: "Start Here",
        },
        {
          icon: Gauge,
          title: "Which Difficulty First?",
          desc: "Standard, Hardcore, Insanity compared. Recommended choice for first playthrough based on RE series experience.",
          href: "/beginner-difficulty-recommendation/",
          meta: "Choose",
        },
        {
          icon: Settings,
          title: "Controller vs Keyboard",
          desc: "Performance comparison, recommended bindings, motion controls verdict, and accessibility setup.",
          href: "/beginner-controller-vs-keyboard/",
          meta: "Setup",
        },
        {
          icon: Users,
          title: "Co-op Multiplayer Guide",
          desc: "How co-op works, who can host, what's locked behind solo, and the best co-op chapters.",
          href: "/beginner-co-op-multiplayer/",
          meta: "Co-op",
        },
      ]}
    />
  )
}
