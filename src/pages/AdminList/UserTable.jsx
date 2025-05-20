import UserRow from './UserRow';

const UserTable = ({ users, onStatusChange }) => {
    return (
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
            {users.map((user) => (
              <UserRow 
                key={user.id} 
                user={user} 
                onStatusChange={onStatusChange} 
              />
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default UserTable;