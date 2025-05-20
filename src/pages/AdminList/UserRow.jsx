import StatusBadge from "./StatusBadge";
import StatusButton from "./StatusButton";

const UserRow = ({ user, onStatusChange }) => {
    return (
      <tr className="hover:bg-gray-50 text-sm sm:text-base">
        <td className="p-3">{user.name}</td>
        <td className="p-3">{user.email}</td>
        <td className="p-3">{user.role}</td>
        <td className="p-3">
          <StatusBadge status={user.status} />
        </td>
        <td className="p-3">
          <StatusButton 
            status={user.status} 
            onClick={() => onStatusChange(user.id)} 
          />
        </td>
      </tr>
    );
  };
  
  export default UserRow;