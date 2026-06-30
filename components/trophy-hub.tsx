import { Award, Sparkles, MapPin, KeyRound } from "lucide-react"
import { ContentSection } from "@/components/content-section"

export function TrophyHub() {
  return (
    <ContentSection
      id="trophies"
      eyebrow="100% Completion"
      title="Trophy Hunter's Path"
      description="43 trophy guides for platinum completion: all 25 Mr. Raccoon locations, every charm, safe codes, file collectibles."
      bgClass="bg-card/30"
      viewAllHref="/all-guides/#trophies-achievements"
      viewAllLabel="All 43 Trophies"
      cards={[
        {
          icon: Award,
          title: "Platinum Guide (49 trophies)",
          desc: "Complete platinum walkthrough. Every trophy explained with order of operations and missable warnings.",
          href: "/all-49-trophies-platinum-guide/",
          meta: "Platinum",
        },
        {
          icon: MapPin,
          title: "All 25 Mr. Raccoon Locations",
          desc: "Every Mr. Raccoon figure across all 4 regions with exact coordinates and approach routes.",
          href: "/all-25-mr-raccoon-locations/",
          meta: "Collectibles",
        },
        {
          icon: KeyRound,
          title: "All 5 Safe Codes",
          desc: "Every safe in the game with location, code, and contents. No combination scrambling between playthroughs.",
          href: "/all-5-safe-codes-guide/",
          meta: "Puzzles",
        },
        {
          icon: Sparkles,
          title: "Charm Loadout Optimizer",
          desc: "All 18 charms ranked, optimal combinations for difficulty / playstyle, and the hidden 19th-charm rumor verified.",
          href: "/charm-loadout-optimizer/",
          meta: "Build",
        },
      ]}
    />
  )
}
