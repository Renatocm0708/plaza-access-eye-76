
import { useEffect } from "react";
import Dashboard from "../components/Dashboard";
import Navbar from "../components/Navbar";
import { useAuth } from "@/context/AuthContext";

const Index = () => {
  const { user } = useAuth();

  // Check for user's preferred color scheme
  useEffect(() => {
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <Navbar />
      <Dashboard />
    </div>
  );
};

export default Index;
