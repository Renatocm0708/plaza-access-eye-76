
import React, { useEffect } from "react";
import Dashboard from "../components/Dashboard";
import Navbar from "../components/Navbar";
import VehicleCounter from "../components/VehicleCounter";
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
      <div className="container mx-auto px-4 pb-8">
        <div className="mt-6">
          <VehicleCounter />
        </div>
      </div>
    </div>
  );
};

export default Index;
