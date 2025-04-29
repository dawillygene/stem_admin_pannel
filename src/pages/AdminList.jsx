import { useState } from "react";

const AdminList = () => {
  const [admins, setAdmins] = useState([
    { id: 1, name: "abdulswamadu", email: "abdulswamadu@udom.ac.tz", role: "Admin", status: "Active" },
    { id: 2, name: "sabrina", email: "sabrina@udom.ac.tz", role: "Admin", status: "Suspended" },
  ]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newAdmin, setNewAdmin] = useState({
    name: "",
    email: "",
    role: "Admin",
    status: "Active",
  });

  const filteredAdmins = admins.filter(
    (admin) =>
      admin.name.toLowerCase().includes(search.toLowerCase()) ||
      admin.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddAdmin = () => setShowModal(true);

  const handleModalSubmit = (e) => {
    e.preventDefault();
    const newId = admins.length > 0 ? Math.max(...admins.map((admin) => admin.id)) + 1 : 1;
    setAdmins([...admins, { id: newId, ...newAdmin }]);
    setNewAdmin({ name: "", email: "", role: "Admin", status: "Active" });
    setShowModal(false);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setNewAdmin({ name: "", email: "", role: "Admin", status: "Active" });
  };

  const handleSuspend = (id) => {
    setAdmins(
      admins.map((admin) =>
        admin.id === id ? { ...admin, status: admin.status === "Active" ? "Suspended" : "Active" } : admin
      )
    );
  };

  return (
    <div className="p-4 sm:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800">
        List of Registered Admins
      </h1>

      <div className="flex flex-col sm:flex-row justify-center sm:space-x-4 mb-6">
        <input
          type="text"
          placeholder="Search admins..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-full sm:w-64 mb-2 sm:mb-0"
        />
        <button
          onClick={handleAddAdmin}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-md transition"
        >
          Add Admin
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4 text-center">Add New Admin</h2>
            <form onSubmit={handleModalSubmit}>
              <div className="mb-4">
                <label className="block text-sm mb-1">Full Name</label>
                <input
                  type="text"
                  value={newAdmin.name}
                  onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-1">Email</label>
                <input
                  type="email"
                  value={newAdmin.email}
                  onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                  className="w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-1">Role</label>
                <select
                  value={newAdmin.role}
                  onChange={(e) => setNewAdmin({ ...newAdmin, role: e.target.value })}
                  className="w-full border border-gray-300 rounded-md p-2"
                >
                  <option value="Admin">Admin</option>
                  <option value="Super Admin">Super Admin</option>
                </select>
              </div>
              <div className="mb-6">
                <label className="block text-sm mb-1">Status</label>
                <select
                  value={newAdmin.status}
                  onChange={(e) => setNewAdmin({ ...newAdmin, status: e.target.value })}
                  className="w-full border border-gray-300 rounded-md p-2"
                >
                  <option value="Active">Active</option>
                  <option value="Suspended">Suspended</option>
                </select>
              </div>
              <div className="flex justify-between">
                <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md">
                  Save
                </button>
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full max-w-6xl mx-auto table-auto border border-gray-200 rounded-lg shadow-sm">
          <thead className="bg-blue-600 text-white text-sm sm:text-base">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAdmins.map((admin) => (
              <tr key={admin.id} className="hover:bg-gray-50 text-sm sm:text-base">
                <td className="p-3">{admin.name}</td>
                <td className="p-3">{admin.email}</td>
                <td className="p-3">{admin.role}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      admin.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {admin.status}
                  </span>
                </td>
                <td className="p-3">
                  <button
                    onClick={() => handleSuspend(admin.id)}
                    className={`px-3 py-1 rounded-md text-white text-xs sm:text-sm ${
                      admin.status === "Active" ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"
                    }`}
                  >
                    {admin.status === "Active" ? "Suspend" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
            {filteredAdmins.length === 0 && (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No admins found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminList;
