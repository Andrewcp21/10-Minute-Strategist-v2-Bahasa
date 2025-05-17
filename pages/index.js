import { useEffect } from 'react';
import Head from 'next/head';
import { useAppContext } from '../context/AppContext';
import Welcome from '../components/Welcome';
import ClientSelection from '../components/ClientSelection';
import BriefReview from '../components/BriefReview';
import PillarSelection from '../components/PillarSelection';
import IdeaInput from '../components/IdeaInput';
import CalendarGeneration from '../components/CalendarGeneration';
import CalendarReview from '../components/CalendarReview';
import Feedback from '../components/Feedback';
import Timer from '../components/Timer';

export default function Home() {
  const { step, timerActive } = useAppContext();

  // Determine if we should use the gradient background
  const useGradientBg = step === 'welcome' || step === 'clientSelection' || step === 'ideaInput';

  return (
    <div className={`min-h-screen ${useGradientBg ? 'gradient-bg' : 'bg-gray-50'}`}>
      <Head>
        <title>10-Minute Strategist</title>
        <meta name="description" content="Train to think like a Social Media Strategist" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-black">10-Minute Strategist</h1>
          {timerActive && (
            <div className="bg-white px-4 py-2 rounded-lg shadow-md">
              <Timer />
            </div>
          )}
        </header>

        {/* Render the appropriate component based on the current step */}
        {step === 'welcome' && <Welcome />}
        {step === 'clientSelection' && <ClientSelection />}
        {step === 'briefReview' && <BriefReview />}
        {step === 'pillarSelection' && <PillarSelection />}
        {step === 'ideaInput' && <IdeaInput />}
        {step === 'calendarGeneration' && <CalendarGeneration />}
        {step === 'calendarReview' && <CalendarReview />}
        {step === 'feedback' && <Feedback />}
      </main>

      <footer className="py-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} 10-Minute Strategist
      </footer>
    </div>
  );
}
