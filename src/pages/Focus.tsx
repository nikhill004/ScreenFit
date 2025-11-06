import { Play, Pause, RotateCcw, Smartphone, Volume2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";

const Focus = () => {
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [sessionType, setSessionType] = useState<"focus" | "break">("focus");
  const [sessionsCompleted, setSessionsCompleted] = useState(0);

  const totalTime = sessionType === "focus" ? 25 * 60 : 5 * 60;
  const progress = ((totalTime - timeLeft) / totalTime) * 100;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Session completed
      if (sessionType === "focus") {
        setSessionsCompleted(prev => prev + 1);
        setSessionType("break");
        setTimeLeft(5 * 60);
      } else {
        setSessionType("focus");
        setTimeLeft(25 * 60);
      }
      setIsActive(false);
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, sessionType]);

  const toggleTimer = () => setIsActive(!isActive);
  
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(sessionType === "focus" ? 25 * 60 : 5 * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Focus Mode
        </h1>
        <p className="text-muted-foreground">
          Deep work sessions to boost productivity
        </p>
      </div>

      {/* Timer Card */}
      <Card className="p-8 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20 shadow-xl">
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-background/80 rounded-full">
            <div className={`w-3 h-3 rounded-full animate-pulse ${
              isActive ? "bg-primary" : "bg-muted-foreground"
            }`} />
            <span className="text-sm font-medium text-foreground">
              {isActive ? "In Progress" : "Paused"} • {sessionType === "focus" ? "Focus" : "Break"}
            </span>
          </div>

          <div className="relative">
            <div className="text-8xl font-bold text-foreground tracking-tight">
              {formatTime(timeLeft)}
            </div>
            <Progress 
              value={progress} 
              className="h-2 mt-6"
            />
          </div>

          <div className="flex items-center justify-center gap-4 pt-4">
            <Button
              size="lg"
              onClick={toggleTimer}
              className="h-16 w-16 rounded-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity shadow-lg"
            >
              {isActive ? (
                <Pause className="h-7 w-7" />
              ) : (
                <Play className="h-7 w-7 ml-1" />
              )}
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              onClick={resetTimer}
              className="h-16 w-16 rounded-full"
            >
              <RotateCcw className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Smartphone className="h-5 w-5 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground">Sessions Today</p>
          </div>
          <p className="text-3xl font-bold text-foreground">{sessionsCompleted}</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-secondary/10 rounded-lg">
              <Volume2 className="h-5 w-5 text-secondary" />
            </div>
            <p className="text-sm text-muted-foreground">Focus Time</p>
          </div>
          <p className="text-3xl font-bold text-foreground">{sessionsCompleted * 25}m</p>
        </Card>
      </div>

      {/* Duration Options */}
      <Card className="p-5">
        <h3 className="font-semibold text-foreground mb-4">Quick Start</h3>
        <div className="grid grid-cols-3 gap-3">
          {[15, 25, 45].map((duration) => (
            <Button
              key={duration}
              variant="outline"
              className="h-16 flex-col gap-1"
              onClick={() => {
                setTimeLeft(duration * 60);
                setSessionType("focus");
                setIsActive(false);
              }}
            >
              <span className="text-xl font-bold">{duration}</span>
              <span className="text-xs text-muted-foreground">minutes</span>
            </Button>
          ))}
        </div>
      </Card>

      {/* Tips Card */}
      <Card className="p-5 bg-gradient-to-br from-secondary/5 to-primary/5 border-secondary/20">
        <h3 className="font-semibold text-foreground mb-2">🎯 Focus Tips</h3>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Put your phone in another room</li>
          <li>• Close unnecessary browser tabs</li>
          <li>• Use noise-cancelling headphones</li>
          <li>• Stay hydrated during sessions</li>
        </ul>
      </Card>
    </div>
  );
};

export default Focus;
