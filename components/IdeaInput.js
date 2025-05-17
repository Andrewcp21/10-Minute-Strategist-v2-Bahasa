import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { FaMagic } from 'react-icons/fa';

const IdeaInput = () => {
  const { selectedClient, selectedPillars, pillarIdeas, setPillarIdeas, setStep } = useAppContext();
  const [loadingPillar, setLoadingPillar] = useState(null);
  const [suggestions, setSuggestions] = useState({});
  
  if (!selectedClient || selectedPillars.length === 0) {
    return <div>Tidak ada klien atau pilar yang dipilih. Silakan kembali dan buat pilihan.</div>;
  }
  
  // Initialize ideas for all pillars if not already done
  useEffect(() => {
    if (selectedPillars.length > 0) {
      const newIdeas = { ...pillarIdeas };
      let hasChanges = false;
      
      selectedPillars.forEach(pillar => {
        if (!pillarIdeas[pillar.id]) {
          newIdeas[pillar.id] = { mainIdea: '' };
          hasChanges = true;
        }
      });
      
      if (hasChanges) {
        setPillarIdeas(newIdeas);
      }
    }
  }, [selectedPillars, pillarIdeas, setPillarIdeas]);
  
  const handleInputChange = (pillarId, field, value) => {
    setPillarIdeas({
      ...pillarIdeas,
      [pillarId]: {
        ...pillarIdeas[pillarId],
        [field]: value
      }
    });
  };
  
  const handleSuggestions = async (pillar, field) => {
    setLoadingPillar(`${pillar.id}-${field}`);
    try {
      const response = await fetch('/api/suggestions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client: selectedClient,
          pillar: pillar,
          field: field
        }),
      });
      
      const data = await response.json();
      
      // Parse the suggestion and apply it directly to the input field
      if (data.suggestions) {
        const lines = data.suggestions.split('\n');
        let suggestion = '';
        
        for (const line of lines) {
          if (field === 'mainIdea' && line.includes('Main Idea:')) {
            suggestion = line.split('Main Idea:')[1].trim();
            break;
          } else if (field === 'postFormat' && line.includes('Post Format:')) {
            suggestion = line.split('Post Format:')[1].trim();
            break;
          }
        }
        
        if (suggestion) {
          // Apply the suggestion directly to the input
          handleInputChange(pillar.id, field, suggestion);
        }
      }
    } catch (error) {
      console.error('Error getting suggestions:', error);
    } finally {
      setLoadingPillar(null);
    }
  };
  
  const handleNext = () => {
    setStep('calendarGeneration');
  };
  
  const handleBack = () => {
    setStep('pillarSelection');
  };
  
  const areAllPillarsComplete = () => {
    return selectedPillars.every(pillar => 
      pillarIdeas[pillar.id]?.mainIdea?.trim() !== ''
    );
  };
  
  return (
    <div className="bg-transparent">
      <h2 className="text-3xl font-extrabold tracking-tight text-black mb-6">
        Buat Ide Konten untuk Setiap Content Pillars
      </h2>
      <p className="mb-6 text-gray-700">
        Isi ide untuk setiap Content Pillars yang telah Anda pilih untuk {selectedClient.name}.
      </p>
      
      {selectedPillars.map((pillar, index) => (
        <div key={pillar.id} className="mb-8 p-6 bg-white rounded-xl shadow-md">
          <h3 className="text-xl font-bold mb-2">{pillar.name}</h3>
          <p className="mb-4 text-gray-600">{pillar.description}</p>
          
          <div className="mb-4">
            <label className="block mb-2 font-medium">Ide Utama</label>
            <div className="relative">
              <textarea
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition h-24 pr-12"
                placeholder={`Jelaskan ide utama Anda untuk ${pillar.name}...`}
                value={pillarIdeas[pillar.id]?.mainIdea || ''}
                onChange={(e) => handleInputChange(pillar.id, 'mainIdea', e.target.value)}
              />
              <button
                type="button"
                className="absolute right-2 top-2 bg-black text-white p-2 rounded-full hover:bg-primary hover:text-black transition-colors duration-300"
                onClick={() => handleSuggestions(pillar, 'mainIdea')}
                disabled={loadingPillar === `${pillar.id}-mainIdea`}
                title="Get AI suggestion"
              >
                {loadingPillar === `${pillar.id}-mainIdea` ? (
                  <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
                ) : (
                  <FaMagic size={16} />
                )}
              </button>
            </div>
          </div>
        </div>
      ))}
      
      <div className="flex justify-between mt-6">
        <button 
          className="btn btn-secondary"
          onClick={handleBack}
        >
          Kembali
        </button>
        <button 
          className="btn btn-primary"
          onClick={handleNext}
          disabled={!areAllPillarsComplete()}
        >
          Buat Content Calendar
        </button>
      </div>
    </div>
  );
};

export default IdeaInput;
