
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

interface UserCardProps {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  onDeleteClick: () => void;
}

const UserCard = ({ 
  id, 
  firstName, 
  lastName, 
  email, 
  avatar, 
  onDeleteClick 
}: UserCardProps) => {
  return (
    <Card className="overflow-hidden user-card">
      <CardContent className="p-0">
        <div className="p-4 text-center bg-blue-50">
          <img 
            src={avatar} 
            alt={`${firstName} ${lastName}`}
            className="object-cover w-24 h-24 mx-auto rounded-full"
          />
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold text-gray-900">{firstName} {lastName}</h2>
          <p className="text-sm text-gray-500">{email}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between p-4 pt-0">
        <Button 
          variant="outline" 
          size="sm" 
          asChild
          className="flex items-center space-x-1"
        >
          <Link to={`/users/${id}/edit`}>
            <Edit className="w-4 h-4" />
            <span>Edit</span>
          </Link>
        </Button>
        <Button 
          variant="destructive" 
          size="sm"
          className="flex items-center space-x-1"
          onClick={onDeleteClick}
        >
          <Trash2 className="w-4 h-4" />
          <span>Delete</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UserCard;
