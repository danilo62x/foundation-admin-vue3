<template>
  <div class="min-h-screen bg-white dark:bg-gray-dark">
    <LandingNav />
    <main>
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      <FaqSection />
      <ContactSection />
    </main>
    <LandingFooter />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import LandingNav from '@/components/landing/LandingNav.vue'
import HeroSection from '@/components/landing/HeroSection.vue'
import FeaturesSection from '@/components/landing/FeaturesSection.vue'
import PricingSection from '@/components/landing/PricingSection.vue'
import FaqSection from '@/components/landing/FaqSection.vue'
import ContactSection from '@/components/landing/ContactSection.vue'
import LandingFooter from '@/components/landing/LandingFooter.vue'

onMounted(() => {
  document.title = 'Admin Template — O template admin que acelera seu produto'
})
</script>
