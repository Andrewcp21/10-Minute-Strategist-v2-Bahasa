import React from 'react';
import { useAppContext } from '../context/AppContext';
import { clients } from '../lib/clientData';

const ClientSelection = () => {
  const { setSelectedClient, setStep } = useAppContext();
  
  const handleClientSelect = (client) => {
    setSelectedClient(client);
    setStep('briefReview');
  };
  
  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-6">Pilih Klien</h2>
      <p className="mb-6 text-gray-600">
        Pilih salah satu klien berikut untuk membuat strategi media sosial untuk akun Instagram mereka.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {clients.map((client) => (
          <div 
            key={client.id}
            className="card hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => handleClientSelect(client)}
          >
            <div className="h-40 bg-gray-100 flex items-center justify-center mb-4 rounded overflow-hidden">
              <img 
                src={client.logo} 
                alt={`${client.name} logo`} 
                className="object-contain h-32 w-full" 
              />
            </div>
            <div className="p-4">
              <p className="font-medium text-gray-700">{client.industry}</p>
              <p className="text-gray-600 mt-2">Tujuan: {client.brief.goal}</p>
              <p className="text-gray-600">Audiens: {client.brief.audience}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientSelection;
