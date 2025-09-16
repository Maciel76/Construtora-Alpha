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
import HeroBanner from "@/components/servicepage/construtora-alpha/HeroBanner.vue";
import PortfolioSection from "@/components/servicepage/construtora-alpha/PortfolioSection.vue";
import LaunchesSection from "@/components/servicepage/construtora-alpha/LaunchesSection.vue";
import VirtualTour from "@/components/servicepage/construtora-alpha/VirtualTour.vue";
import StatsSection from "@/components/servicepage/construtora-alpha/StatsSection.vue";
import CareersSection from "@/components/servicepage/construtora-alpha/CareersSection.vue";

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
