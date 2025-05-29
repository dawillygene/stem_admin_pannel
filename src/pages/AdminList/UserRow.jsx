import StatusBadge from "./StatusBadge";
import StatusButton from "./StatusButton";

const UserRow = ({ user, onStatusChange }) => {
  // Get initials from name
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('');
  };

  // Format join date if available
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // YYYY-MM-DD format
  };

  const joinDate = user.joinDate || user.createdAt || '';

  return (
    <tr className="table-row hover:bg-gray-50 border-b border-gray-200">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold">
              {getInitials(user.name)}
            </div>
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{user.name}</div>
            {joinDate && (
              <div className="text-sm text-gray-500">Joined {formatDate(joinDate)}</div>
            )}
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{user.email}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          <i className={`fas fa-${user.roles === 'Administrator' ? 'user-shield' : user.roles === 'Manager' ? 'user-tie' : 'user'} mr-1`}></i>
          {user.roles}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <StatusBadge status={user.status} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <div className="flex items-center space-x-2">
          <StatusButton 
            status={user.status} 
            onClick={() => onStatusChange(user.id)} 
          />
          <button className="text-blue-600 hover:text-blue-900 transition-colors duration-200" title="View Details">
            <i className="fas fa-eye"></i>
          </button>
          <button className="text-gray-600 hover:text-gray-900 transition-colors duration-200" title="Edit User">
            <i className="fas fa-edit"></i>
          </button>
        </div>
      </td>
    </tr>
  );
};

  export default UserRow;
