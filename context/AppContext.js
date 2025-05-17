import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Game state
  const [step, setStep] = useState('welcome'); // welcome, clientSelection, briefReview, pillarSelection, ideaInput, calendarGeneration, calendarReview, feedback
  const [userName, setUserName] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(600); // 10 minutes in seconds
  const [timerActive, setTimerActive] = useState(false);
  const [timerWarning, setTimerWarning] = useState(false);
  
  // Client data
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedPillars, setSelectedPillars] = useState([]);
  const [pillarIdeas, setPillarIdeas] = useState({});
  const [calendar, setCalendar] = useState(null);
  const [clientFeedback, setClientFeedback] = useState('');
  
  // Timer logic
  useEffect(() => {
    let interval;
    
    if (timerActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prevTime) => {
          const newTime = prevTime - 1;
          
          // Set warnings at 3:00 and 1:00
          if (newTime === 180 || newTime === 60) {
            setTimerWarning(true);
            setTimeout(() => setTimerWarning(false), 5000);
          }
          
          // Auto-submit if time expires
          if (newTime === 0) {
            handleTimeUp();
          }
          
          return newTime;
        });
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [timerActive, timeRemaining]);
  
  // Handle time up
  const handleTimeUp = () => {
    setTimerActive(false);
    
    // If user is still in idea input, auto-generate calendar
    if (step === 'ideaInput') {
      setStep('calendarGeneration');
      // Logic to auto-generate calendar would go here
    }
  };
  
  // Start timer
  const startTimer = () => {
    setTimerActive(true);
  };
  
  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  // Reset game
  const resetGame = () => {
    setStep('welcome');
    setTimeRemaining(600);
    setTimerActive(false);
    setTimerWarning(false);
    setSelectedClient(null);
    setSelectedPillars([]);
    setPillarIdeas({});
    setCalendar(null);
    setClientFeedback('');
    // Keep the userName
  };
  
  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        step,
        setStep,
        timeRemaining,
        timerActive,
        timerWarning,
        startTimer,
        formatTime,
        userName,
        setUserName,
        selectedClient,
        setSelectedClient,
        selectedPillars,
        setSelectedPillars,
        pillarIdeas,
        setPillarIdeas,
        calendar,
        setCalendar,
        clientFeedback,
        setClientFeedback,
        resetGame,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
