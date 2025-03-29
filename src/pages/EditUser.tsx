
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchUserById, updateUser } from "@/services/api";
import PageContainer from "@/components/PageContainer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Loader, Save } from "lucide-react";

interface UserFormData {
  first_name: string;
  last_name: string;
  email: string;
  avatar?: string;
}

const EditUser = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [userData, setUserData] = useState<UserFormData>({
    first_name: "",
    last_name: "",
    email: "",
    avatar: "",
  });
  const [errors, setErrors] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  useEffect(() => {
    const loadUser = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        const user = await fetchUserById(Number(id));
        setUserData({
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          avatar: user.avatar,
        });
      } catch (error) {
        console.error("Error loading user:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {
      first_name: "",
      last_name: "",
      email: "",
    };
    let isValid = true;

    if (!userData.first_name.trim()) {
      newErrors.first_name = "First name is required";
      isValid = false;
    }

    if (!userData.last_name.trim()) {
      newErrors.last_name = "Last name is required";
      isValid = false;
    }

    if (!userData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setSaving(true);
    try {
      if (id) {
        // Remove avatar from update data as we're not updating it
        const { avatar, ...updateData } = userData;
        await updateUser(Number(id), updateData);
        navigate("/users");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <PageContainer title="Edit User">
        <div className="flex items-center justify-center h-64">
          <Loader className="w-8 h-8 text-primary animate-spin" />
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer title="Edit User">
      <Button
        variant="outline"
        className="mb-6 flex items-center space-x-2"
        onClick={() => navigate("/users")}
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Users</span>
      </Button>

      <Card>
        <CardContent className="p-6">
          <div className="flex justify-center mb-6">
            {userData.avatar && (
              <img
                src={userData.avatar}
                alt="User avatar"
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
              />
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="first_name">First Name</Label>
              <Input
                id="first_name"
                name="first_name"
                value={userData.first_name}
                onChange={handleChange}
              />
              {errors.first_name && (
                <p className="text-sm text-red-500">{errors.first_name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="last_name">Last Name</Label>
              <Input
                id="last_name"
                name="last_name"
                value={userData.last_name}
                onChange={handleChange}
              />
              {errors.last_name && (
                <p className="text-sm text-red-500">{errors.last_name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={userData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            <div className="flex justify-end">
              <Button 
                type="submit" 
                className="flex items-center space-x-2"
                disabled={saving}
              >
                {saving ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default EditUser;
