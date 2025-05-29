const StatusButton = ({ status, onClick }) => {
  const buttonConfig = {
    Approved: {
      text: "Suspend",
      className: "btn-danger",
      icon: "ban"
    },
    Pending: {
      text: "Approve",
      className: "btn-primary",
      icon: "check"
    },
    Suspended: {
      text: "Approve",
      className: "btn-primary",
      icon: "check"
    }
  };

  const config = buttonConfig[status] || {
    text: "Update",
    className: "bg-gray-500 hover:bg-gray-600",
    icon: "sync"
  };

  return (
    <button
      onClick={onClick}
      className={`${config.className} text-white px-3 py-1 rounded-md text-xs font-medium hover:shadow-lg transition-all duration-300`}
      title={`${config.text} User`}
    >
      <i className={`fas fa-${config.icon} mr-1`}></i>
      {config.text}
    </button>
  );
};

  export default StatusButton;
