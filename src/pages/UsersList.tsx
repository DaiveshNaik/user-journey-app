
import { useState, useEffect } from "react";
import { fetchUsers, deleteUser } from "@/services/api";
import UserCard from "@/components/UserCard";
import Pagination from "@/components/Pagination";
import DeleteConfirmation from "@/components/DeleteConfirmation";
import PageContainer from "@/components/PageContainer";
import { Loader, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const UsersList = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteDialog, setDeleteDialog] = useState({
    isOpen: false,
    userId: null as number | null,
    userName: "",
  });

  const loadUsers = async (page: number) => {
    setLoading(true);
    try {
      const response = await fetchUsers(page);
      setUsers(response.data);
      setFilteredUsers(response.data);
      setTotalPages(response.total_pages);
    } catch (error) {
      console.error("Failed to load users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter((user) => {
        const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
        const email = user.email.toLowerCase();
        const term = searchTerm.toLowerCase();
        
        return fullName.includes(term) || email.includes(term);
      });
      setFilteredUsers(filtered);
    }
  }, [searchTerm, users]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDeleteClick = (userId: number, userName: string) => {
    setDeleteDialog({
      isOpen: true,
      userId,
      userName,
    });
  };

  const handleDeleteConfirm = async () => {
    if (deleteDialog.userId) {
      try {
        await deleteUser(deleteDialog.userId);
        // After successful deletion, update the users list
        setUsers((prevUsers) => 
          prevUsers.filter((user) => user.id !== deleteDialog.userId)
        );
        setFilteredUsers((prevUsers) => 
          prevUsers.filter((user) => user.id !== deleteDialog.userId)
        );
      } catch (error) {
        console.error("Error deleting user:", error);
      } finally {
        setDeleteDialog({ isOpen: false, userId: null, userName: "" });
      }
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <PageContainer title="User Management">
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute w-5 h-5 text-gray-400 left-3 top-3" />
          <Input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="pl-10"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Loader className="w-8 h-8 text-primary animate-spin" />
        </div>
      ) : (
        <>
          {filteredUsers.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500">No users found matching your search.</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredUsers.map((user) => (
                <UserCard
                  key={user.id}
                  id={user.id}
                  firstName={user.first_name}
                  lastName={user.last_name}
                  email={user.email}
                  avatar={user.avatar}
                  onDeleteClick={() => 
                    handleDeleteClick(user.id, `${user.first_name} ${user.last_name}`)
                  }
                />
              ))}
            </div>
          )}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}

      <DeleteConfirmation
        isOpen={deleteDialog.isOpen}
        onClose={() => setDeleteDialog({ ...deleteDialog, isOpen: false })}
        onConfirm={handleDeleteConfirm}
        userName={deleteDialog.userName}
      />
    </PageContainer>
  );
};

export default UsersList;
