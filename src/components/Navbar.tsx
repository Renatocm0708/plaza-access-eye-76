
import { useState } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Navbar = () => {
  const [alertsCount, setAlertsCount] = useState(3);
  
  return (
    <header className="bg-white border-b border-slate-200">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-bold text-slate-900">Plaza Control de Acceso</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" className="relative">
            <Bell className="h-5 w-5" />
            {alertsCount > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-red-500">
                {alertsCount}
              </Badge>
            )}
          </Button>
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
              <span className="text-white font-medium text-sm">SA</span>
            </div>
            <span className="text-sm font-medium">Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
