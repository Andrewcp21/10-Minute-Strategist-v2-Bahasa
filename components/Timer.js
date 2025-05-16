import React from 'react';
import { useAppContext } from '../context/AppContext';

const Timer = () => {
  const { timeRemaining, formatTime, timerWarning } = useAppContext();
  
  return (
    <div className={`text-xl font-bold ${timerWarning ? 'timer-warning' : ''}`}>
      Time Remaining: {formatTime(timeRemaining)}
    </div>
  );
};

export default Timer;
