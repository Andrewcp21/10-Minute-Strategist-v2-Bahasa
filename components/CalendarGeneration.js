import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';

const CalendarGeneration = () => {
  const { selectedClient, selectedPillars, pillarIdeas, setCalendar, setClientFeedback, setStep } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const generateCalendar = async () => {
      try {
        console.log('Generating calendar with:', {
          client: selectedClient,
          pillars: selectedPillars,
          ideas: pillarIdeas,
        });

        const response = await fetch('/api/openai', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            client: selectedClient,
            pillars: selectedPillars,
            ideas: pillarIdeas,
          }),
        });
        
        if (!response.ok) {
          throw new Error('Gagal menghasilkan kalender');
        }
        
        const data = await response.json();
        console.log('API response:', data);
        
        // Check if calendar data is valid
        if (!data.calendar || Object.keys(data.calendar).length === 0) {
          console.error('Empty calendar data received from API');
          
          // Create a fallback calendar with empty content
          const fallbackCalendar = {};
          ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'].forEach(day => {
            fallbackCalendar[day] = {
              day: day,
              content: {
                pillar: 'Content Pillar',
                format: 'Format',
                idea: 'Idea will be generated',
                caption: 'Caption will be generated',
                hashtags: ['#content', '#social', '#media']
              }
            };
          });
          
          console.log('Using fallback calendar:', fallbackCalendar);
          setCalendar(fallbackCalendar);
        } else {
          setCalendar(data.calendar);
        }
        
        setClientFeedback(data.feedback || 'Feedback akan segera tersedia');
        setStep('calendarReview');
      } catch (error) {
        console.error('Error generating calendar:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    
    generateCalendar();
  }, []);
  
  return (
    <div className="card text-center">
      <h2 className="text-2xl font-bold mb-6">Menyiapkan Content Calendar Anda</h2>
      
      {loading ? (
        <div className="py-12">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">
            AI kami sedang membuat 5-day Instagram Content Calendar berdasarkan ide Anda...
          </p>
        </div>
      ) : error ? (
        <div className="py-12">
          <div className="text-red-500 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-red-600 mb-4">Kesalahan: {error}</p>
          <button 
            className="btn btn-primary"
            onClick={() => setStep('ideaInput')}
          >
            Kembali dan Coba Lagi
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default CalendarGeneration;
