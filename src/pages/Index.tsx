import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Pause, RotateCcw, Volume2, VolumeX } from "lucide-react";

const POMODORO_TIME = 25 * 60; // 25 minutes
const SHORT_BREAK_TIME = 5 * 60; // 5 minutes
const LONG_BREAK_TIME = 15 * 60; // 15 minutes

type SessionType = 'focus' | 'shortBreak' | 'longBreak';

const Index = () => {
  const [timeLeft, setTimeLeft] = useState(POMODORO_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionType, setSessionType] = useState<SessionType>('focus');
  const [completedSessions, setCompletedSessions] = useState(0);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const musicRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element for background music
    musicRef.current = new Audio('/underwater-loop-amb.mp3');
    musicRef.current.loop = true;
    musicRef.current.volume = 0.3; // Set lower volume for background music
  }, []);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft]);

  useEffect(() => {
    if (timeLeft === 0) {
      handleSessionComplete();
    }
  }, [timeLeft]);

  // This effect hook syncs the music playback with the musicPlaying state
  useEffect(() => {
    if (musicRef.current) {
      if (musicPlaying) {
        musicRef.current.play().catch(() => {
          // Autoplay was prevented.
        });
      } else {
        musicRef.current.pause();
      }
    }
  }, [musicPlaying]);

  const handleSessionComplete = () => {
    setIsRunning(false);

    if (sessionType === 'focus') {
      const newCompletedSessions = completedSessions + 1;
      setCompletedSessions(newCompletedSessions);
      
      if (newCompletedSessions % 4 === 0) {
        setSessionType('longBreak');
        setTimeLeft(LONG_BREAK_TIME);
      } else {
        setSessionType('shortBreak');
        setTimeLeft(SHORT_BREAK_TIME);
      }
    } else {
      setSessionType('focus');
      setTimeLeft(POMODORO_TIME);
    }
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setSessionType('focus');
    setTimeLeft(POMODORO_TIME);
    setCompletedSessions(0);
  };

  // This function now only toggles the state
  const toggleMusic = () => {
    setMusicPlaying(!musicPlaying);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getSessionTitle = () => {
    switch (sessionType) {
      case 'focus':
        return 'Focus Time';
      case 'shortBreak':
        return 'Short Break';
      case 'longBreak':
        return 'Long Break';
    }
  };

  const progress = sessionType === 'focus' 
    ? ((POMODORO_TIME - timeLeft) / POMODORO_TIME) * 100
    : sessionType === 'shortBreak'
    ? ((SHORT_BREAK_TIME - timeLeft) / SHORT_BREAK_TIME) * 100
    : ((LONG_BREAK_TIME - timeLeft) / LONG_BREAK_TIME) * 100;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
      >
        <source src="/Underwater_Ocean_3840x2160.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Dark overlay for better readability */}
      <div className="absolute inset-0 bg-black/40"></div>
      
      <Card className="w-full max-w-md bg-slate-800/80 border-blue-500/20 backdrop-blur-sm relative z-10">
        <CardContent className="p-8 text-center">
          <div className="mb-6">
            <img src="/logo.png" alt="Pomodori Logo" className="h-16 w-auto mx-auto mb-2" />
            <p className="text-blue-300 text-lg">{getSessionTitle()}</p>
          </div>

          <div className="mb-8">
            <div className="text-6xl font-mono font-bold text-white mb-4">
              {formatTime(timeLeft)}
            </div>
            
            <div className="w-full bg-slate-700 rounded-full h-3 mb-4 relative overflow-hidden">
              <div 
                className="bg-gradient-to-r from-blue-400 to-cyan-400 h-3 rounded-full transition-all duration-1000 ease-out relative"
                style={{ width: `${progress}%` }}
              >
                <img 
                  src="/lovable-uploads/ffb16381-09c1-4958-9965-9743264759c0.png"
                  alt="Dory"
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 w-8 h-6 object-contain"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4 mb-6">
            <Button
              onClick={toggleTimer}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-16 h-16"
            >
              {isRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </Button>
            
            <Button
              onClick={resetTimer}
              size="lg"
              variant="outline"
              className="border-blue-500 text-blue-300 hover:bg-blue-500/20 rounded-full w-16 h-16"
            >
              <RotateCcw className="w-6 h-6" />
            </Button>
            
            <Button
              onClick={toggleMusic}
              size="lg"
              variant="outline"
              className="border-blue-500 text-blue-300 hover:bg-blue-500/20 rounded-full w-16 h-16"
            >
              {musicPlaying ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
            </Button>
          </div>

          <div className="text-blue-300">
            <p>Sessions completed: {completedSessions}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;