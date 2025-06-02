import { useState } from 'react';
import UserRow from './UserRow';

const UserTable = ({ users, onStatusChange, onPromote, onDemote }) => {
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };


  const sortedUsers = [...users].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];

    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    if (sortDirection === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  return (
    <div className="glass-effect rounded-xl shadow-custom overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                <div 
                  className="flex items-center cursor-pointer hover:text-blue-100 transition-colors duration-200"
                  onClick={() => handleSort('name')}
                >
                  <i className="fas fa-user mr-2"></i>
                  Name
                  <i className={`fas fa-sort ml-2 text-blue-200 ${
                    sortField === 'name' ? (sortDirection === 'asc' ? 'fa-sort-up' : 'fa-sort-down') : ''
                  }`}></i>
                </div>
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                <div 
                  className="flex items-center cursor-pointer hover:text-blue-100 transition-colors duration-200"
                  onClick={() => handleSort('email')}
                >
                  <i className="fas fa-envelope mr-2"></i>
                  Email
                  <i className={`fas fa-sort ml-2 text-blue-200 ${
                    sortField === 'email' ? (sortDirection === 'asc' ? 'fa-sort-up' : 'fa-sort-down') : ''
                  }`}></i>
                </div>
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                <div 
                  className="flex items-center cursor-pointer hover:text-blue-100 transition-colors duration-200"
                  onClick={() => handleSort('role')}
                >
                  <i className="fas fa-id-badge mr-2"></i>
                  Role
                  <i className={`fas fa-sort ml-2 text-blue-200 ${
                    sortField === 'role' ? (sortDirection === 'asc' ? 'fa-sort-up' : 'fa-sort-down') : ''
                  }`}></i>
                </div>
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                <div 
                  className="flex items-center cursor-pointer hover:text-blue-100 transition-colors duration-200"
                  onClick={() => handleSort('status')}
                >
                  <i className="fas fa-flag mr-2"></i>
                  Status
                  <i className={`fas fa-sort ml-2 text-blue-200 ${
                    sortField === 'status' ? (sortDirection === 'asc' ? 'fa-sort-up' : 'fa-sort-down') : ''
                  }`}></i>
                </div>
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                <i className="fas fa-cog mr-2"></i>
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sortedUsers.map((user) => (
              <UserRow 
                key={user.id} 
                user={user} 
                onStatusChange={onStatusChange} 
                onPromote={onPromote}
                onDemote={onDemote}
              />
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="5" className="p-8 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
