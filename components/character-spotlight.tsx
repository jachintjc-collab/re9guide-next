import { Users, Skull, Search, Cross } from "lucide-react"
import { ContentSection } from "@/components/content-section"

export function CharacterSpotlight() {
  return (
    <ContentSection
      id="characters"
      eyebrow="Cast Analysis"
      title="Character Deep Dives"
      description="16 detailed character profiles from RE9: psychology, voice direction, plot function, and franchise legacy."
      viewAllHref="/all-guides/#character-deep-profiles"
      viewAllLabel="All 16 Characters"
      cards={[
        {
          icon: Users,
          title: "Eveline",
          desc: "Project E-001 engineered bioweapon — RE7-RE9 arc, consciousness preservation ethics, chapter 8 final boss.",
          href: "/character-eveline-deep-profile/",
          meta: "Engineered",
        },
        {
          icon: Cross,
          title: "Vivien Davies",
          desc: "Care Center director. Antagonist motivation, research history, and the family connection to Grace.",
          href: "/character-vivien-davies-deep-profile/",
          meta: "Antagonist",
        },
        {
          icon: Search,
          title: "Grace Ashcroft",
          desc: "RE9 protagonist BSAA operative. Investigation framework and the 23-year cover-up reveal.",
          href: "/character-grace-ashcroft-deep-profile/",
          meta: "Protagonist",
        },
        {
          icon: Skull,
          title: "Father Riley",
          desc: "Care Center pastor. Hidden 9th ending mold projection reveal — institutional cover narrative function.",
          href: "/character-father-riley-deep-profile/",
          meta: "Mystery",
        },
      ]}
    />
  )
}
