import { useState, useEffect, useMemo } from "react";
import API from "../../utils/axios";
import SearchBar from "./SearchBar";
import UserTable from "./UserTable";
import Pagination from "./Pagination";
import StatsCards from "./StatsCards";
import { useToast } from "../../components/Toast";
import "./AdminList.css";

const AdminList = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState("");
  const { showToast } = useToast();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await API.get("/admin/users");
        setUsers(res.data); 
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch users:", err);
        setError("Failed to load users. Please try again later.");
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Reset to first page when search or status filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter]);

  const filteredUsers = useMemo(() => {
    return users.filter(
      (admin) => {
        const matchesSearch = 
          admin.name.toLowerCase().includes(search.toLowerCase()) ||
          admin.email.toLowerCase().includes(search.toLowerCase());

        const matchesStatus = !statusFilter || admin.status === statusFilter;

        return matchesSearch && matchesStatus;
      }
    );
  }, [users, search, statusFilter]);

  // Handle export functionality
  const handleExport = () => {
    showToast("Export started successfully!", "success");

    // Simulate export process
    setTimeout(() => {
      // In a real app, this would generate and download a CSV file
      const csvContent = "data:text/csv;charset=utf-8," 
        + "ID,Name,Email,Role,Status\n" 
        + filteredUsers.map(user => 
            `${user.id},${user.name},${user.email},${user.role},${user.status}`
          ).join("\n");

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "users.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      showToast("Users data exported to CSV", "success");
    }, 1000);
  };

  // Calculate total pages
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  // Get current page of users
  const currentUsers = useMemo(() => {
    const indexOfLastUser = currentPage * itemsPerPage;
    const indexOfFirstUser = indexOfLastUser - itemsPerPage;
    return filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  }, [filteredUsers, currentPage, itemsPerPage]);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle items per page change
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  const handleStatusChange = async (id) => {
    const user = users.find((admin) => admin.id === id);

    try {
      let endpoint = "";
      let newStatus = "";
      let action = "";

      if (user.status === "Pending" || user.status === "Suspended") {
        endpoint = "/admin/approve-user";
        newStatus = "Approved";
        action = "approved";
      } else if (user.status === "Approved") {
        endpoint = "/admin/suspend-user";
        newStatus = "Suspended";
        action = "suspended";
      }


      showToast(`Updating status for ${user.name}...`, "info");

      await API.post(endpoint, { userId: id });
      setUsers(
        users.map((admin) =>
          admin.id === id ? { ...admin, status: newStatus } : admin
        )
      );


      showToast(`User ${user.name} has been ${action} successfully!`, "success");
    } catch (err) {
      console.error("Failed to update user status:", err);
      showToast(`Failed to update status for ${user.name}`, "error");
    }
  };

  return (
    <div>
      <div className="gradient-bg py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-2">
              <i className="fas fa-users-cog mr-3"></i>
              User Management Dashboard
            </h1>
            <p className="text-xl opacity-90">Professional Admin Panel</p>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {!loading && !error && <StatsCards users={users} />}
        <div className="glass-effect rounded-xl p-6 shadow-custom mb-8 animate-fadeIn">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <SearchBar search={search} setSearch={setSearch} />
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="flex items-center gap-2">
                <label htmlFor="itemsPerPage" className="text-sm font-medium text-gray-700">Show:</label>
                <select
                  id="itemsPerPage"
                  value={itemsPerPage}
                  onChange={handleItemsPerPageChange}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={loading}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <label htmlFor="statusFilter" className="text-sm font-medium text-gray-700">Status:</label>
                <select
                  id="statusFilter"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={loading}
                >
                  <option value="">All Status</option>
                  <option value="Approved">Approved</option>
                  <option value="Pending">Pending</option>
                  <option value="Suspended">Suspended</option>
                </select>
              </div>
              <button
                onClick={handleExport}
                className="btn-primary text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
                disabled={loading || filteredUsers.length === 0}
              >
                <i className="fas fa-download mr-2"></i>
                Export
              </button>
            </div>
          </div>
        </div>
        {loading && (
          <div className="glass-effect rounded-xl p-12 shadow-custom text-center animate-fadeIn">
            <div className="loading-spinner mx-auto mb-4"></div>
            <p className="text-gray-600 font-medium">Loading users...</p>
          </div>
        )}
        {error && !loading && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 shadow-custom animate-fadeIn">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <i className="fas fa-exclamation-triangle text-red-400 text-xl"></i>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error Loading Users</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error}</p>
                </div>
                <div className="mt-4">
                  <button
                    onClick={() => window.location.reload()}
                    className="bg-red-100 text-red-800 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors duration-200"
                  >
                    <i className="fas fa-redo mr-2"></i>
                    Try Again
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {!loading && !error && filteredUsers.length === 0 && (
          <div className="glass-effect rounded-xl p-12 shadow-custom text-center animate-fadeIn">
            <div className="max-w-md mx-auto">
              <i className="fas fa-search text-gray-300 text-6xl mb-4"></i>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Users Found</h3>
              <p className="text-gray-600">
                {search || statusFilter 
                  ? `No results found for your search criteria. Try adjusting your filters.`
                  : "There are no users to display."}
              </p>
            </div>
          </div>
        )}

        {!loading && !error && filteredUsers.length > 0 && (
          <div className="mb-4 animate-fadeIn">
            <p className="text-sm text-gray-600 text-right font-medium">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, filteredUsers.length)} of{" "}
              {filteredUsers.length} users
            </p>
          </div>
        )}

        {!loading && !error && filteredUsers.length > 0 && (
          <UserTable 
            users={currentUsers} 
            onStatusChange={handleStatusChange} 
          />
        )}

        {!loading && !error && totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default AdminList;
