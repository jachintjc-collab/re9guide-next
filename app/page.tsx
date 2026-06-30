import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { AreaGuides } from "@/components/area-guides"
import { TrustBadges } from "@/components/trust-badges"
import { TierList } from "@/components/tier-list"
import { FeaturedGuides } from "@/components/featured-guides"
import { CharacterSpotlight } from "@/components/character-spotlight"
import { TrophyHub } from "@/components/trophy-hub"
import { BeginnerKit } from "@/components/beginner-kit"
import { StuckHelp } from "@/components/stuck-help"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <Hero />
        <TrustBadges />
        <AreaGuides />
        <TierList />
        <CharacterSpotlight />
        <TrophyHub />
        <FeaturedGuides />
        <BeginnerKit />
        <StuckHelp />
      </main>
      <SiteFooter />
    </div>
  )
}
