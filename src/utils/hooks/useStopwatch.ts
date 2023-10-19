import React, {useState, useEffect} from 'react';

interface StopwatchState {
  formattedTime: string;
  isRunning: boolean;
  start: () => void;
  stop: () => void;
  reset: () => void;
}

// Custom hook for a stopwatch
export const useStopwatch = (): StopwatchState => {
  const [isRunning, setIsRunning] = useState(false);
  const [totalSeconds, setTotalSeconds] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;

    if (isRunning) {
      timer = setInterval(() => {
        setTotalSeconds(prevSeconds => prevSeconds + 1);
      }, 1000); // Update time every 1 second
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    }; // Cleanup on unmount or isRunning change
  }, [isRunning]);

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

  const formattedTime = `${formattedMinutes}:${formattedSeconds}`;

  const start = () => {
    setIsRunning(true);
  };

  const stop = () => {
    setIsRunning(false);
  };

  const reset = () => {
    setTotalSeconds(0);
    setIsRunning(false);
  };

  return {
    formattedTime,
    isRunning,
    start,
    stop,
    reset,
  };
};
