<template>
  <div class="home">
    <HeroBanner />
    <PortfolioSection />
    <LaunchesSection />
    <VirtualTour />
    <StatsSection />
    <CareersSection />
  </div>
</template>

<script>
import HeroBanner from "@/components/HeroBanner.vue";
import PortfolioSection from "@/components/PortfolioSection.vue";
import LaunchesSection from "@/components/LaunchesSection.vue";
import VirtualTour from "@/components/VirtualTour.vue";
import StatsSection from "@/components/StatsSection.vue";
import CareersSection from "@/components/CareersSection.vue";

export default {
  name: "HomeAlpha",
  components: {
    HeroBanner,
    PortfolioSection,
    LaunchesSection,
    VirtualTour,
    StatsSection,
    CareersSection,
  },
};
</script>

<style scoped>
.home {
  overflow-x: hidden;
}
</style>
