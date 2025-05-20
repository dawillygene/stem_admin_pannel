import { useState, useEffect } from "react";
import API from "../../utils/axios";
import SearchBar from "./SearchBar";
import UserTable from "./UserTable";

const AdminList = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await API.get("/admin/users");
        setUsers(res.data); 
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    (admin) =>
      admin.name.toLowerCase().includes(search.toLowerCase()) ||
      admin.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleStatusChange = async (id) => {
    const user = users.find((admin) => admin.id === id);
    
    try {
      let endpoint = "";
      let newStatus = "";
      
      if (user.status === "Pending" || user.status === "Suspended") {
        endpoint = "/admin/approve-user";
        newStatus = "Approved";
      } else if (user.status === "Approved") {
        endpoint = "/admin/suspend-user";
        newStatus = "Suspended";
      }
      
      await API.post(endpoint, { userId: id });
      setUsers(
        users.map((admin) =>
          admin.id === id ? { ...admin, status: newStatus } : admin
        )
      );
    } catch (err) {
      console.error("Failed to update user status:", err);
    }
  };

  return (
    <div className="p-0 sm:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800">
        List of Registered Users
      </h1>
      
      <SearchBar search={search} setSearch={setSearch} />
      
      <UserTable 
        users={filteredUsers} 
        onStatusChange={handleStatusChange} 
      />
    </div>
  );
};

export default AdminList;