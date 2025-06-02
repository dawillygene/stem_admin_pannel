import StatusBadge from "./StatusBadge";
import StatusButton from "./StatusButton";

const UserRow = ({ user, onStatusChange, onPromote, onDemote }) => {
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
  
  // Check if user is admin
  const isAdmin = user.role === 'ROLE_ADMIN' || user.roles[1] === 'ROLE_ADMIN';

  console.log("UserRow:", user, "isAdmin:", isAdmin);
  
  // Admin styling
  const adminRowClass = isAdmin 
    ? "table-row hover:bg-gradient-to-r hover:from-amber-50 hover:to-yellow-50 border-b border-amber-200 bg-gradient-to-r from-amber-25 to-yellow-25" 
    : "table-row hover:bg-gray-50 border-b border-gray-200";

  return (
    <tr className={adminRowClass}>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <div className={`h-10 w-10 rounded-full ${
              isAdmin 
                ? 'bg-gradient-to-r from-amber-400 to-yellow-500 ring-2 ring-amber-300' 
                : 'bg-gradient-to-r from-blue-400 to-blue-600'
            } flex items-center justify-center text-white font-semibold`}>
              {isAdmin && <i className="fas fa-crown text-xs absolute -top-1 -right-1 text-yellow-300"></i>}
              {getInitials(user.name)}
            </div>
          </div>
          <div className="ml-4">
            <div className={`text-sm font-medium ${isAdmin ? 'text-amber-900' : 'text-gray-900'}`}>
              {user.name}
              {isAdmin && <i className="fas fa-shield-alt ml-2 text-amber-600"></i>}
            </div>
            {joinDate && (
              <div className={`text-sm ${isAdmin ? 'text-amber-700' : 'text-gray-500'}`}>
                Joined {formatDate(joinDate)}
              </div>
            )}
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className={`text-sm ${isAdmin ? 'text-amber-900' : 'text-gray-900'}`}>{user.email}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
          isAdmin 
            ? 'bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 border border-amber-200' 
            : 'bg-gray-100 text-gray-800'
        }`}>
          <i className={`fas fa-${
            isAdmin ? 'user-shield' : 
            user.roles === 'ROLE_USER' ? 'user-tie' : 'user'
          } mr-1`}></i>
          {user.roles[0]} : {user.roles[1]}
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
          
          {/* Admin promotion/demotion buttons */}
          {!isAdmin ? (
            <button 
              className="text-amber-600 hover:text-amber-900 transition-colors duration-200 bg-amber-50 hover:bg-amber-100 px-2 py-1 rounded border border-amber-200" 
              title="Promote to Admin"
              onClick={() => onPromote(user.id)}
            >
              <i className="fas fa-arrow-up mr-1"></i>
              <span className="text-xs">Promote</span>
            </button>
          ) : (
            <button 
              className="text-red-600 hover:text-red-900 transition-colors duration-200 bg-red-50 hover:bg-red-100 px-2 py-1 rounded border border-red-200" 
              title="Demote from Admin"
              onClick={() => onDemote(user.id)}
            >
              <i className="fas fa-arrow-down mr-1"></i>
              <span className="text-xs">Demote</span>
            </button>
          )}
          
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
