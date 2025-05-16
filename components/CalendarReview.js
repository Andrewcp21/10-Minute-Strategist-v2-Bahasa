import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';

const CalendarReview = () => {
  const { selectedClient, calendar, setStep } = useAppContext();
  const [editMode, setEditMode] = useState(false);
  const [editedCalendar, setEditedCalendar] = useState({});
  const [debugInfo, setDebugInfo] = useState('');
  
  useEffect(() => {
    // Log calendar data for debugging
    console.log('Calendar data in CalendarReview:', calendar);
    
    if (calendar) {
      // Initialize edited calendar with current calendar data
      setEditedCalendar(calendar);
      
      // Create debug info
      const info = JSON.stringify(calendar, null, 2);
      setDebugInfo(info);
    }
  }, [calendar]);
  
  if (!calendar) {
    return <div>Tidak ada kalender yang dihasilkan. Silakan kembali dan hasilkan kalender.</div>;
  }
  
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
  
  const handleEdit = (day, field, value) => {
    setEditedCalendar({
      ...editedCalendar,
      [day]: {
        ...editedCalendar[day],
        content: {
          ...editedCalendar[day].content,
          [field]: value
        }
      }
    });
  };
  
  const handleSaveEdits = () => {
    // In a real app, you might want to save these edits to your state or backend
    setEditMode(false);
  };
  
  const handleContinue = () => {
    setStep('feedback');
  };
  
  // Ensure all days have content
  const ensureAllDaysHaveContent = () => {
    const filledCalendar = { ...calendar };
    
    days.forEach(day => {
      if (!filledCalendar[day]) {
        // Create empty content for missing days
        filledCalendar[day] = {
          day: day.charAt(0).toUpperCase() + day.slice(1),
          content: {
            pillar: '',
            format: '',
            idea: '',
            caption: '',
            hashtags: []
          }
        };
      }
    });
    
    console.log('Filled calendar:', filledCalendar);
    return filledCalendar;
  };
  
  const displayCalendar = ensureAllDaysHaveContent();
  const filledCalendar = ensureAllDaysHaveContent();
  
  // If we're in edit mode, make sure editedCalendar also has all days
  if (editMode && Object.keys(editedCalendar).length !== days.length) {
    setEditedCalendar(filledCalendar);
  }

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">5-day Content Calendar</h2>
        <button 
          className="btn btn-secondary"
          onClick={() => setEditMode(!editMode)}
        >
          {editMode ? 'Batalkan Pengeditan' : 'Edit Kalender'}
        </button>
      </div>
      
      <p className="mb-6 text-gray-600">
        Ini adalah Instagram Content Calendar untuk {selectedClient.name}. Review postingan untuk setiap hari.
      </p>
      
      {/* Calendar Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse mb-6">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-left">Day</th>
              <th className="border p-2 text-left">Content Pillar</th>
              <th className="border p-2 text-left">Post Format</th>
              <th className="border p-2 text-left">Post Idea</th>
              <th className="border p-2 text-left">Caption & Hashtag</th>
            </tr>
          </thead>
          <tbody>
            {days.map((day) => {
              const dayData = editMode ? editedCalendar[day] : filledCalendar[day];
              const content = dayData?.content || { pillar: '', format: '', idea: '', caption: '', hashtags: [] };
              
              return (
                <tr key={day} className="border hover:bg-gray-50">
                  <td className="border p-3 font-medium capitalize">{day}</td>
                  
                  {editMode ? (
                    <>
                      <td className="border p-2">
                        <input
                          type="text"
                          className="input"
                          value={content.pillar}
                          onChange={(e) => handleEdit(day, 'pillar', e.target.value)}
                        />
                      </td>
                      <td className="border p-2">
                        <select
                          className="input"
                          value={content.format}
                          onChange={(e) => handleEdit(day, 'format', e.target.value)}
                        >
                          <option value="">Pilih format</option>
                          <option value="Carousel">Carousel</option>
                          <option value="Reel">Reel</option>
                          <option value="Single Image">Single Image</option>
                          <option value="Story">Story</option>
                          <option value="IGTV">IGTV</option>
                        </select>
                      </td>
                      <td className="border p-2">
                        <textarea
                          className="textarea h-24"
                          value={content.idea}
                          onChange={(e) => handleEdit(day, 'idea', e.target.value)}
                        />
                      </td>
                      <td className="border p-2">
                        <div className="mb-2">
                          <label className="block text-xs font-medium mb-1">Caption:</label>
                          <textarea
                            className="textarea h-24"
                            value={content.caption}
                            onChange={(e) => handleEdit(day, 'caption', e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium mb-1">Hashtag:</label>
                          <input
                            type="text"
                            className="input"
                            value={content.hashtags.join(' ')}
                            onChange={(e) => handleEdit(day, 'hashtags', e.target.value.split(' '))}
                            placeholder="#hashtag #dipisahkan #denganspasi"
                          />
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="border p-3" style={{ borderLeft: `4px solid ${getColorForPillar(content.pillar)}` }}>
                        {content.pillar || '-'}
                      </td>
                      <td className="border p-3">
                        {content.format || '-'}
                      </td>
                      <td className="border p-3">
                        {content.idea || '-'}
                      </td>
                      <td className="border p-3">
                        <div className="mb-2">
                          <p className="text-sm">{content.caption || '-'}</p>
                        </div>
                        <div>
                          {content.hashtags && content.hashtags.length > 0 ? (
                            <div className="flex flex-wrap">
                              {content.hashtags.map((tag, i) => (
                                <span key={i} className="inline-block bg-gray-100 rounded-full px-2 py-1 text-xs font-semibold text-gray-700 mr-1 mb-1">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          ) : '-'}
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      {/* Debug section - will be hidden in production */}
      <div className="mt-6 p-4 bg-gray-100 rounded">
        <h3 className="text-lg font-semibold mb-2">Debug Info</h3>
        <p>Calendar Object Keys: {Object.keys(calendar).join(', ')}</p>
        <details>
          <summary className="cursor-pointer text-blue-500">Show Raw Calendar Data</summary>
          <pre className="mt-2 p-2 bg-gray-200 rounded text-xs overflow-auto" style={{ maxHeight: '200px' }}>
            {debugInfo}
          </pre>
        </details>
      </div>
      
      <div className="flex justify-between mt-8">
        <button 
          className="btn btn-secondary"
          onClick={() => setStep('ideaInput')}
        >
          Kembali
        </button>
        
        {editMode ? (
          <button 
            className="btn btn-primary"
            onClick={handleSaveEdits}
          >
            Simpan Edits
          </button>
        ) : (
          <button 
            className="btn btn-primary"
            onClick={handleContinue}
          >
            Dapatkan Feedback dari Klien
          </button>
        )}
      </div>
    </div>
  );
};

// Helper function to get a color based on the pillar name
const getColorForPillar = (pillarName) => {
  // Simple hash function to generate a color
  const hash = pillarName.split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);
  
  const hue = Math.abs(hash % 360);
  return `hsl(${hue}, 70%, 50%)`;
};

export default CalendarReview;
