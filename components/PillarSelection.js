import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

const PillarSelection = () => {
  const { selectedClient, selectedPillars, setSelectedPillars, setStep, startTimer } = useAppContext();
  
  if (!selectedClient) {
    return <div>Tidak ada klien yang dipilih. Silakan kembali dan pilih klien.</div>;
  }
  
  const togglePillar = (pillar) => {
    if (selectedPillars.find(p => p.id === pillar.id)) {
      setSelectedPillars(selectedPillars.filter(p => p.id !== pillar.id));
    } else {
      if (selectedPillars.length < 4) {
        setSelectedPillars([...selectedPillars, pillar]);
      }
    }
  };
  
  const handleContinue = () => {
    if (selectedPillars.length >= 3) {
      // Start the timer when moving to ideaInput
      startTimer();
      setStep('ideaInput');
    }
  };
  
  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-6">Pilih Content Pillar</h2>
      <p className="mb-6 text-gray-600">
        Pilih 3-4 Content Pillar untuk strategi Instagram {selectedClient.name}.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {selectedClient.brief.pillars.map((pillar) => {
          const isSelected = selectedPillars.find(p => p.id === pillar.id);
          return (
            <div 
              key={pillar.id}
              className={`pillar-card cursor-pointer ${isSelected ? 'selected' : ''}`}
              onClick={() => togglePillar(pillar)}
            >
              <h3 className="font-bold mb-2">{pillar.name}</h3>
              <p className="text-gray-600">{pillar.description}</p>
              {isSelected && (
                <div className="mt-2 text-primary font-medium">Dipilih</div>
              )}
            </div>
          );
        })}
      </div>
      
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600">
          {selectedPillars.length < 3 ? (
            <span className="text-red-500">Silakan pilih minimal 3 pilar</span>
          ) : (
            <span>{selectedPillars.length} pilar dipilih</span>
          )}
        </div>
        
        <div className="flex gap-4">
          <button 
            className="btn btn-secondary"
            onClick={() => setStep('briefReview')}
          >
            Kembali
          </button>
          <button 
            className="btn btn-primary"
            onClick={handleContinue}
            disabled={selectedPillars.length < 3}
          >
            Lanjutkan
          </button>
        </div>
      </div>
    </div>
  );
};

export default PillarSelection;
