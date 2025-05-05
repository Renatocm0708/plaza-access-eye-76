
import { useState } from "react";
import { Bell, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

const Navbar = () => {
  const [alertsCount, setAlertsCount] = useState(3);
  const { user, logout } = useAuth();
  const { toast } = useToast();
  
  const handleLogout = () => {
    logout();
    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión exitosamente",
    });
  };
  
  return (
    <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">Plaza Control de Acceso</h1>
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
            <div className="h-8 w-8 rounded-full bg-lime-600 flex items-center justify-center">
              <span className="text-white font-medium text-sm">{user?.name.charAt(0) || 'A'}</span>
            </div>
            <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{user?.name || 'Admin'}</span>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleLogout}
            className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
          >
            <LogOut className="h-5 w-5 mr-1" />
            Salir
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
