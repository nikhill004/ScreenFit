import { TrendingDown, TrendingUp, Calendar, Award } from "lucide-react";
import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line } from "recharts";

function num50_300(){
  return Math.floor(Math.random()*251)+50;
} 
function num30_130(){
  return Math.floor(Math.random()*100)+30;
} 


const Stats = () => {
  const weeklyData = [
    { day: "Mon", calories: num50_300(), screenTime: 0 },
    { day: "Tue", calories: num50_300(), screenTime: 0 },
    { day: "Wed", calories: num50_300(), screenTime: 0 },
    { day: "Thu", calories: num50_300(), screenTime: 0 },
    { day: "Fri", calories: num50_300(), screenTime: 0 },
    { day: "Sat", calories: num50_300(), screenTime: 0 },
    { day: "Sun", calories: num50_300(), screenTime: 0 },
  ];

  weeklyData.forEach(day => {
    day.screenTime = (day.calories)/60;
  });

  const weeklyTotalScreenTime = weeklyData.reduce((sum, d) => sum + d.screenTime, 0);

  const dayWithMinCalories = weeklyData.reduce((min, day) => 
    day.calories < min.calories ? day : min
  );


  const appBreakdown = [
    { app: "Social Media", calories: num30_130(), color: "hsl(174, 62%, 47%)" },
    { app: "Streaming", calories:num30_130(), color: "hsl(188, 78%, 41%)" },
    { app: "Games", calories:num30_130(), color: "hsl(158, 58%, 42%)" },
    { app: "Other", calories:num30_130(), color: "hsl(210, 20%, 70%)" },
  ];

  const weeklyAverage = Math.round(weeklyData.reduce((acc, day) => acc + day.calories, 0) / weeklyData.length);
  const weeklyChange = num30_130(); // percentage change from last week
  const totalScreenTime = `${Math.floor(weeklyTotalScreenTime)}h ${Math.round((weeklyTotalScreenTime % 1) * 60)}min`;


  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Statistics
        </h1>
        <p className="text-muted-foreground">
          Your digital wellness insights
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="h-4 w-4 text-primary" />
            <p className="text-sm text-muted-foreground">Weekly Avg</p>
          </div>
          <p className="text-3xl font-bold text-foreground">{weeklyAverage}</p>
          <div className="flex items-center gap-1 mt-1">
            <TrendingDown className="h-4 w-4 text-secondary" />
            <p className="text-xs text-secondary font-medium">
              {Math.abs(weeklyChange)}% less
            </p>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-secondary/10 to-primary/10 border-secondary/20">
          <div className="flex items-center gap-2 mb-2">
            <Award className="h-4 w-4 text-secondary" />
            <p className="text-sm text-muted-foreground">Best Day</p>
          </div>
          <p className="text-3xl font-bold text-foreground">{dayWithMinCalories.calories}</p>
          <p className="text-xs text-muted-foreground mt-1">
            {dayWithMinCalories.day}
          </p>
        </Card>
      </div>

      {/* Weekly Trend Chart */}
      <Card className="p-5">
        <h3 className="font-semibold text-foreground mb-4">Weekly Digital Calories</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="day" 
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            />
            <YAxis 
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            />
            <Bar 
              dataKey="calories" 
              fill="hsl(var(--primary))" 
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Screen Time Trend */}
      <Card className="p-5">
        <h3 className="font-semibold text-foreground mb-4">Screen Time Trend</h3>
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="day" 
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            />
            <YAxis 
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            />
            <Line 
              type="monotone" 
              dataKey="screenTime" 
              stroke="hsl(var(--accent))" 
              strokeWidth={3}
              dot={{ fill: "hsl(var(--accent))", r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="mt-4 text-center">
          <p className="text-sm text-muted-foreground">Total this week</p>
          <p className="text-2xl font-bold text-foreground">{totalScreenTime}</p>
        </div>
      </Card>

      {/* App Breakdown */}
      <Card className="p-5">
        <h3 className="font-semibold text-foreground mb-4">Today's App Breakdown</h3>
        <div className="space-y-4">
          {appBreakdown.map((item) => (
            <div key={item.app} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-foreground">{item.app}</span>
                <span className="text-sm font-bold text-foreground">{item.calories} cal</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all"
                  style={{ 
                    width: `${(item.calories / 320) * 100}%`,
                    backgroundColor: item.color
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Achievement Card */}
      <Card className="p-5 bg-gradient-to-br from-secondary/10 to-primary/10 border-secondary/20">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-secondary/20 rounded-full">
            <Award className="h-6 w-6 text-secondary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-1">Great Progress! 🎉</h3>
            <p className="text-sm text-muted-foreground">
              You've reduced your digital calories by {Math.abs(weeklyChange)}% this week. Keep up the healthy digital habits!
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Stats;
