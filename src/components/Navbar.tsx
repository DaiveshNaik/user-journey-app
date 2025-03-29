
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { LogOut, Users } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { logout } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container flex items-center justify-between px-4 py-4 mx-auto max-w-7xl">
        <Link to="/users" className="flex items-center space-x-2">
          <Users className="w-6 h-6 text-primary" />
          <span className="text-xl font-bold text-gray-900">User Management</span>
        </Link>
        
        <Button 
          variant="ghost" 
          className="flex items-center space-x-2"
          onClick={logout}
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </Button>
      </div>
    </header>
  );
};

export default Navbar;
