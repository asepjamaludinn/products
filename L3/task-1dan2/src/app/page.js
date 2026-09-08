import { HeroBanner } from "@/components/organisms/HeroBanner";
import { CategoryShowcase } from "@/components/organisms/CategoryShowcase";
import { FeaturedProducts } from "@/components/organisms/FeaturedProducts";
import { PromoBento } from "@/components/organisms/PromoBento";
import { SiteLayout } from "@/components/templates/SiteLayout";

export default function LandingPage() {
  return (
    <SiteLayout>
      <div className="flex flex-col gap-12">
        <HeroBanner />
        <PromoBento />
        <div className="-mx-6 sm:-mx-16 -my-8 md:-my-16"></div>
        <CategoryShowcase />
        <FeaturedProducts />
      </div>
    </SiteLayout>
  );
}
