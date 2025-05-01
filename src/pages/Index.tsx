
import { useState } from "react";
import Dashboard from "../components/Dashboard";
import Navbar from "../components/Navbar";

const Index = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <Dashboard />
    </div>
  );
};

export default Index;
