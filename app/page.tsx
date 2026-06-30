import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { AreaGuides } from "@/components/area-guides"
import { TrustBadges } from "@/components/trust-badges"
import { TierList } from "@/components/tier-list"
import { FeaturedGuides } from "@/components/featured-guides"
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
        <FeaturedGuides />
      </main>
      <SiteFooter />
    </div>
  )
}
