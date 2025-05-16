import React from 'react';
import { useAppContext } from '../context/AppContext';
import Confetti from 'react-confetti';

const Feedback = () => {
  const { selectedClient, clientFeedback, resetGame } = useAppContext();
  
  if (!clientFeedback) {
    return <div>Tidak ada Feedback tersedia. Silakan kembali dan selesaikan kalender.</div>;
  }
  
  return (
    <div className="card">
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        recycle={false}
        numberOfPieces={200}
        gravity={0.1}
      />
      
      <h2 className="text-2xl font-bold mb-6">Client Feedback</h2>
      
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mr-4 overflow-hidden">
            <img 
              src={selectedClient.logo} 
              alt={`${selectedClient.name} logo`} 
              className="object-cover w-full h-full" 
            />
          </div>
          <div>
            <h3 className="font-bold">Direktur Pemasaran {selectedClient.name}</h3>
            <p className="text-gray-600 text-sm">Baru saja me-review Content Calendar Anda</p>
          </div>
        </div>
        
        <div className="p-6 bg-gray-50 rounded-lg">
          <p className="italic">{clientFeedback}</p>
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="font-bold mb-4">Yang Telah Anda Pelajari</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>Cara memilih Content Pilar untuk sebuah Brand</li>
          <li>Membuat ide konten beragam untuk pilar yang berbeda</li>
          <li>Merencanakan Weekly Content Calendar</li>
          <li>Bekerja dalam batasan waktu (10 menit)</li>
          <li>Menyesuaikan konten untuk memenuhi tujuan klien dan kebutuhan audiens</li>
        </ul>
      </div>
      
      <div className="flex justify-between">
        <button 
          className="btn btn-secondary"
          onClick={() => resetGame()}
        >
          Coba Klien Lain
        </button>
        
        <button 
          className="btn btn-primary"
          onClick={() => resetGame()}
        >
          Mulai Lagi
        </button>
      </div>
    </div>
  );
};

export default Feedback;
