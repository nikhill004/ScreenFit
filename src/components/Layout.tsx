import { Home, CheckSquare, Focus, BarChart3 } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();

  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/tasks", icon: CheckSquare, label: "Tasks" },
    { path: "/focus", icon: Focus, label: "Focus" },
    { path: "/stats", icon: BarChart3, label: "Stats" },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <main className="container max-w-md mx-auto px-4 py-6">
        {children}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
        <div className="container max-w-md mx-auto px-4">
          <div className="flex items-center justify-around py-3">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all",
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Icon className={cn("h-5 w-5", isActive && "fill-current")} />
                  <span className="text-xs font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Layout;
