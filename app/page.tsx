import { AudioProvider } from '@/context/AudioContext';
import { FloatingAudioControl } from '@/components/ui/FloatingAudioControl';
import { IntroSequence } from '@/components/sections/IntroSequence';
import { Navbar } from '@/components/sections/Navbar';
import { Hero } from '@/components/sections/Hero';
import { Countdown } from '@/components/sections/Countdown';
import { Celebrate } from '@/components/sections/Celebrate';
import { Couple } from '@/components/sections/Couple';
import { ReceptionDetails } from '@/components/sections/ReceptionDetails';
import { VenueMap } from '@/components/sections/VenueMap';
import { Footer } from '@/components/sections/Footer';
import { ScrollTriggerRefresh } from '@/components/ui/ScrollTriggerRefresh';

export default function Home() {
  return (
    <AudioProvider>
      <div className="w-full bg-[#2D070F] min-h-screen flex justify-center selection:bg-accent selection:text-primary">
        <main className="w-full max-w-[500px] min-h-screen bg-secondary text-ink relative shadow-2xl overflow-x-hidden border-x border-accent/20 flex flex-col">
          {/* ScrollTrigger Refresh on Fonts & Window Load */}
          <ScrollTriggerRefresh />

          {/* Floating Audio Controller with subtle soundwave pulse */}
          <FloatingAudioControl />

          {/* Intro Sequence: Frame 1-97 Video Playback -> Frame 98-288 Scroll Scrubbing */}
          <IntroSequence />

          {/* 8 Core Sections in Strict Order */}
          <Navbar />
          <Hero />
          <Countdown />
          <Celebrate />
          <Couple />
          <ReceptionDetails />
          <VenueMap />
          <Footer />
        </main>
      </div>
    </AudioProvider>
  );
}
