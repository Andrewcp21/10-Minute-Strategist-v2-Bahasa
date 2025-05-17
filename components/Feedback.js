import React from 'react';
import { useAppContext } from '../context/AppContext';
import Confetti from 'react-confetti';
import graduates from '../data/graduates';

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
      
      <div className="flex justify-center my-8">
        <a 
          href="https://enroll.revou.co/digital-marketing-program-1?utm_source=leadgen&utm_medium=organic&utm_campaign=minicourse&utm_content=socialmediastrategist" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-full md:w-2/3 bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-lg transition duration-300 text-center text-lg"
        >
          Daftar Full-Stack Digital Marketing
        </a>
      </div>
      
      <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200 mb-8">
        <h3 className="text-xl font-bold text-black mb-4 text-center">
          Kenali Alumni RevoU yang Berkarier di Social Media 🎓
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 items-stretch">
          {graduates.map((grad, i) => (
            <div key={i} className="h-full">
              <a
                href={grad.profileLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col justify-between text-center p-4 bg-white rounded-lg shadow hover:shadow-lg hover:ring-2 hover:ring-purple-300 transition transform hover:-translate-y-1 active:scale-[0.98] group h-full min-h-[320px] cursor-pointer"
              >
                {/* Avatar */}
                <div className="relative w-24 h-24 mx-auto mb-3">
                  <img
                    src={grad.image}
                    alt={grad.name}
                    className="rounded-full object-cover border-2 border-purple-300 w-full h-full"
                  />
                  <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white text-xs font-medium">
                    View LinkedIn
                  </div>
                </div>

                {/* Name and Job */}
                <p className="font-semibold text-purple-800 truncate">{grad.name}</p>
                <p className="text-sm text-purple-600">{grad.job}</p>

                {/* Company */}
                <div className="flex flex-col items-center mt-2 grow">
                  {grad.logo && (
                    <img
                      src={grad.logo}
                      alt={grad.company}
                      className="object-contain w-10 h-10 sm:w-8 sm:h-8 mb-1"
                    />
                  )}
                  <p className="text-xs text-purple-500 italic text-center leading-snug">
                    {grad.company}
                  </p>
                </div>

                {/* Mobile CTA */}
                <div className="mt-3 text-xs text-purple-400 sm:hidden">
                  Tap untuk lihat profil ↗
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row justify-center gap-4">
        <button 
          className="w-full md:w-1/2 bg-gray-800 hover:bg-yellow-500 text-white hover:text-black font-bold py-3 px-4 rounded-lg transition duration-300"
          onClick={() => resetGame()}
        >
          Coba Klien Lain
        </button>
        
        <a 
          href="https://enroll.revou.co/digital-marketing-program-1?utm_source=leadgen&utm_medium=organic&utm_campaign=minicourse&utm_content=socialmediastrategist" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-full md:w-1/2 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 text-center"
        >
          Daftar Full-Stack Digital Marketing
        </a>
      </div>
    </div>
  );
};

export default Feedback;
