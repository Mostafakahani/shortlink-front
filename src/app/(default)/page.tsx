export const metadata = {
  title: 'Home - Simple',
  description: 'Page description',
};

import Hero from '@/components/mains/hero-home';
import BusinessCategories from '@/components/mains/business-categories';
import FeaturesPlanet from '@/components/mains/features-planet';
import LargeTestimonial from '@/components/mains/large-testimonial';
import Cta from '@/components/mains/cta';

export default function Home() {
  return (
    <>
      <Hero />
      <BusinessCategories />
      <FeaturesPlanet />
      <LargeTestimonial />
      <Cta />
    </>
  );
}
