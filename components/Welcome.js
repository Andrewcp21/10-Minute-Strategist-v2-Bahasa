import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

const Welcome = () => {
  const { userName, setUserName, setStep } = useAppContext();
  const [inputName, setInputName] = useState(userName || '');
  const [error, setError] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (inputName.trim() === '') {
      setError('Silakan masukkan nama Anda');
      return;
    }
    
    setUserName(inputName);
    setStep('clientSelection');
  };
  
  return (
    <div className="card max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Selamat Datang di 10-Minute Strategist</h2>
      
      <div className="mb-8">
        <p className="text-lg text-center mb-6">
          Berlatih Menjadi Social Media Strategist hanya dalam 10 menit!
        </p>
        
        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <h3 className="font-bold text-xl mb-4">Cara Kerjanya:</h3>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">1</div>
              <div>
                <p className="font-medium">Pilih klien dan tinjau brief mereka</p>
                <p className="text-gray-600 text-sm">Pilih dari 3 merek fiksi dan pahami tujuan mereka</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">2</div>
              <div>
                <p className="font-medium">Buat ide konten untuk Content Pillar terpilih</p>
                <p className="text-gray-600 text-sm">Pilih Content Pillar terbaik dan kembangkan ide konten</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">3</div>
              <div>
                <p className="font-medium">Hasilkan dan tinjau Content Calendar Anda</p>
                <p className="text-gray-600 text-sm">AI membuat Content Calendar 5 hari berdasarkan ide konten Anda</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-4">
          <label htmlFor="name" className="block font-medium mb-2">
            Masukkan nama Anda untuk memulai:
          </label>
          <input
            type="text"
            id="name"
            className="input"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            placeholder="Nama Anda"
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
        
        <button type="submit" className="btn btn-primary w-full">
          Mulai
        </button>
      </form>
    </div>
  );
};

export default Welcome;
