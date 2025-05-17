import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import Image from 'next/image';

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
    <div className="flex flex-col items-center justify-center min-h-screen gradient-bg p-4 animate-fadeIn">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 text-center space-y-6">
        {/* LOGO */}
        <div className="flex justify-center mb-2">
          <Image
            src="/Revou-alasan.original.png"
            alt="RevoU Logo"
            width={72}
            height={72}
            className="rounded-full"
            priority
          />
        </div>

        <h1 className="text-4xl font-extrabold text-black tracking-tight">
          10-Minute Strategist
        </h1>
        <p className="text-gray-700">
          Berlatih Menjadi Social Media Strategist hanya dalam 10 menit!
        </p>

        {/* CARA KERJA */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="font-bold text-xl mb-4 text-left">Cara Kerjanya:</h3>
          
          <div className="space-y-4 text-left">
            <div className="flex items-start">
              <div className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">1</div>
              <div>
                <p className="font-medium">Pilih klien dan tinjau brief mereka</p>
                <p className="text-gray-600 text-sm">Pilih dari 3 merek fiksi dan pahami tujuan mereka</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">2</div>
              <div>
                <p className="font-medium">Buat ide konten untuk Content Pillar terpilih</p>
                <p className="text-gray-600 text-sm">Pilih Content Pillar terbaik dan kembangkan ide konten</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">3</div>
              <div>
                <p className="font-medium">Hasilkan dan tinjau Content Calendar Anda</p>
                <p className="text-gray-600 text-sm">AI membuat Content Calendar 5 hari berdasarkan ide konten Anda</p>
              </div>
            </div>
          </div>
        </div>

        {/* INPUT */}
        <form onSubmit={handleSubmit} className="text-left space-y-2">
          <label htmlFor="name" className="block text-sm font-semibold text-gray-800">
            Siapa nama Anda?
          </label>
          <input
            type="text"
            id="name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            placeholder="Masukkan nama Anda"
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          
          {/* BUTTON */}
          <button 
            type="submit" 
            className="w-full bg-black hover:bg-primary hover:text-black text-white font-bold py-3 px-4 rounded-lg transition duration-300 mt-4"
          >
            Mulai
          </button>
        </form>
      </div>
    </div>
  );
};

export default Welcome;
