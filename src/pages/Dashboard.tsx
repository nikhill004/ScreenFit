import { Battery, TrendingDown, Target, Flame } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

function num50_300(){
  return Math.floor(Math.random()*251)+50;
} 

const toHM = (num) => `${Math.floor(num/60)}h ${num%60}min`;

const Dashboard = () => {
  const digitalCalories = num50_300();
  const dailyGoal = 240;
  const screenTimeToday = toHM(digitalCalories);
  const streak = Math.floor(Math.random()*10)+2;

  const caloriePercentage = (digitalCalories / dailyGoal) * 100;
  const isOverGoal = digitalCalories > dailyGoal;

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Digital Wellness
        </h1>
        <p className="text-muted-foreground">
          Track your digital calories and stay balanced
        </p>
      </div>

      {/* Main Digital Calories Card */}
      <Card className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20 shadow-lg">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Today's Digital Calories</p>
            <h2 className="text-5xl font-bold text-foreground">{digitalCalories}</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Goal: {dailyGoal} cal
            </p>
          </div>
          <div className={cn(
            "p-3 rounded-full",
            isOverGoal ? "bg-destructive/10" : "bg-secondary/10"
          )}>
            <Battery className={cn(
              "h-8 w-8",
              isOverGoal ? "text-destructive" : "text-secondary"
            )} />
          </div>
        </div>
        
        <Progress 
          value={Math.min(caloriePercentage, 100)} 
          className="h-3 mb-2"
        />
        
        <p className={cn(
          "text-sm font-medium",
          isOverGoal ? "text-destructive" : "text-secondary"
        )}>
          {isOverGoal 
            ? `${digitalCalories - dailyGoal} calories over goal` 
            : `${dailyGoal - digitalCalories} calories left`}
        </p>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-accent/10 rounded-lg">
              <TrendingDown className="h-5 w-5 text-accent" />
            </div>
            <p className="text-sm text-muted-foreground">Screen Time</p>
          </div>
          <p className="text-2xl font-bold text-foreground">{screenTimeToday}</p>
          <p className="text-xs text-muted-foreground mt-1">{Math.floor(Math.random()*100)-40}% from yesterday</p>
        </Card>

        <Card className="p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Flame className="h-5 w-5 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground">Streak</p>
          </div>
          <p className="text-2xl font-bold text-foreground">{streak} days</p>
          <p className="text-xs text-muted-foreground mt-1">Keep it going!</p>
        </Card>
      </div>

      {/* Daily Goal Card */}
      <Card className="p-5">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-secondary/10 rounded-lg">
            <Target className="h-6 w-6 text-secondary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground mb-1">Today's Goal</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Stay under {dailyGoal} digital calories
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Social Media</span>
                <span className="font-medium text-foreground"> {Math.floor(Math.random()*100)+50} cal </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Entertainment</span>
                <span className="font-medium text-foreground">{Math.floor(Math.random()*80)+50} cal </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Other Apps</span>
                <span className="font-medium text-foreground">{Math.floor(Math.random()*50)+50} cal </span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Tips Card */}
      <Card className="p-5 bg-gradient-to-br from-secondary/5 to-primary/5 border-secondary/20">
        <h3 className="font-semibold text-foreground mb-2">💡 Wellness Tip</h3>
        <p className="text-sm text-muted-foreground">
          Schedule focused work sessions in your task manager to reduce mindless scrolling and stay productive.
        </p>
      </Card>
    </div>
  );
};

export default Dashboard;

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
