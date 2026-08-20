import CarouselHero from '../../components/CarouselHero';
import Mission from '../../components/Mission';
import FeaturedProjects from '../../components/FeaturedProjects';
import CallToAction from '../../components/CallToAction';

export default function Home() {
  return (
    <div className="space-y-8 sm:space-y-12 md:space-y-16 lg:space-y-20 pb-6 sm:pb-8 md:pb-12">
      <CarouselHero />
      <Mission />
      <FeaturedProjects />
      <CallToAction />
    </div>
  );
}