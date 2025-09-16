<template>
  <div class="construtora-alpha">
    <!-- Header específico da Construtora Alpha -->
    <HeaderAlpha />

    <main>
      <HeroBanner />
      <PortfolioSection />
      <LaunchesSection />
      <VirtualTour />
      <StatsSection />
      <CareersSection />
    </main>

    <!-- Footer específico da Construtora Alpha -->
    <FooterAlpha />
  </div>
</template>

<script>
import HeaderAlpha from "@/components/HeaderAlpha.vue";
import FooterAlpha from "@/components/FooterAlpha.vue";
import HeroBanner from "@/components/HeroBanner.vue";
import PortfolioSection from "@/components/PortfolioSection.vue";
import LaunchesSection from "@/components/LaunchesSection.vue";
import VirtualTour from "@/components/VirtualTour.vue";
import StatsSection from "@/components/StatsSection.vue";
import CareersSection from "@/components/CareersSection.vue";

export default {
  name: "App",
  components: {
    HeaderAlpha,
    FooterAlpha,
    HeroBanner,
    PortfolioSection,
    LaunchesSection,
    VirtualTour,
    StatsSection,
    CareersSection,
  },
};
</script>

<style>
.construtora-alpha {
  font-family: "Montserrat", sans-serif;
}
</style>
