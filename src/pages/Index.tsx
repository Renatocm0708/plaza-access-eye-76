
import { useState, useEffect } from "react";
import Dashboard from "../components/Dashboard";
import Navbar from "../components/Navbar";

const Index = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors">
      <Navbar />
      <Dashboard />
    </div>
  );
};

export default Index;
