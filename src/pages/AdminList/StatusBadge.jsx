const StatusBadge = ({ status }) => {
  const getStatusConfig = (status) => {
    const configs = {
      Approved: {
        className: "status-approved",
        icon: "check-circle"
      },
      Pending: {
        className: "status-pending",
        icon: "clock"
      },
      Suspended: {
        className: "status-suspended",
        icon: "ban"
      }
    };

    return configs[status] || { className: "bg-gray-100 text-gray-700", icon: "question-circle" };
  };

  const config = getStatusConfig(status);

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${config.className}`}
    >
      <i className={`fas fa-${config.icon} mr-1`}></i>
      {status}
    </span>
  );
};

  export default StatusBadge;
