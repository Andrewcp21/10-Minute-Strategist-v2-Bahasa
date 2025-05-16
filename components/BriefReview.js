import React from 'react';
import { useAppContext } from '../context/AppContext';

const BriefReview = () => {
  const { selectedClient, setStep, startTimer } = useAppContext();
  
  if (!selectedClient) {
    return <div>Tidak ada klien yang dipilih. Silakan kembali dan pilih klien.</div>;
  }
  
  const handleContinue = () => {
    setStep('pillarSelection');
    startTimer(); // Start the 10-minute timer when planning begins
  };
  
  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-6">Brand Brief: {selectedClient.name}</h2>
      
      <div className="mb-8">
        <div className="h-40 bg-gray-100 flex items-center justify-center mb-4 rounded overflow-hidden">
          <img 
            src={selectedClient.logo} 
            alt={`${selectedClient.name} logo`} 
            className="object-contain h-32 w-full" 
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-bold mb-2">Industri</h4>
            <p className="mb-4">{selectedClient.industry}</p>
            
            <h4 className="font-bold mb-2">Tujuan</h4>
            <p className="mb-4">{selectedClient.brief.goal}</p>
          </div>
          
          <div>
            <h4 className="font-bold mb-2">Audiens Target</h4>
            <p className="mb-4">{selectedClient.brief.audience}</p>
            
            <h4 className="font-bold mb-2">Platform</h4>
            <p className="mb-4">{selectedClient.brief.platform}</p>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between">
        <button 
          className="btn btn-secondary"
          onClick={() => setStep('clientSelection')}
        >
          Kembali
        </button>
        <button 
          className="btn btn-primary"
          onClick={handleContinue}
        >
          Mulai Merencanakan
        </button>
      </div>
      
      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
        <p className="text-sm text-yellow-800">
          <strong>Catatan:</strong> Timer 10 menit akan dimulai ketika Anda mengklik "Mulai Merencanakan". 
          Anda perlu memilih pilar konten, membuat ide postingan, dan menghasilkan Content Calendar dalam waktu ini.
        </p>
      </div>
    </div>
  );
};

export default BriefReview;
