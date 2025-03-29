
import { toast } from "sonner";

const BASE_URL = "https://reqres.in/api";

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface UserResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
}

export const fetchUsers = async (page: number = 1): Promise<UserResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/users?page=${page}`);
    
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching users:", error);
    toast.error("Failed to load users");
    throw error;
  }
};

export const fetchUserById = async (id: number): Promise<User> => {
  try {
    const response = await fetch(`${BASE_URL}/users/${id}`);
    
    if (!response.ok) {
      throw new Error("User not found");
    }
    
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    toast.error("Failed to load user details");
    throw error;
  }
};

export const updateUser = async (id: number, userData: Partial<User>): Promise<User> => {
  try {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    
    if (!response.ok) {
      throw new Error("Failed to update user");
    }
    
    toast.success("User updated successfully");
    return await response.json();
  } catch (error) {
    console.error("Error updating user:", error);
    toast.error("Failed to update user");
    throw error;
  }
};

export const deleteUser = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
      method: "DELETE",
    });
    
    if (!response.ok) {
      throw new Error("Failed to delete user");
    }
    
    toast.success("User deleted successfully");
  } catch (error) {
    console.error("Error deleting user:", error);
    toast.error("Failed to delete user");
    throw error;
  }
};
