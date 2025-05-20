const StatusButton = ({ status, onClick }) => {
    const buttonConfig = {
      Approved: {
        text: "Suspend",
        className: "bg-red-500 hover:bg-red-600"
      },
      Pending: {
        text: "Approve",
        className: "bg-blue-500 hover:bg-blue-600"
      },
      Suspended: {
        text: "Approve",
        className: "bg-blue-500 hover:bg-blue-600"
      }
    };
  
    const config = buttonConfig[status] || {
      text: "Update",
      className: "bg-gray-500 hover:bg-gray-600"
    };
  
    return (
      <button
        onClick={onClick}
        className={`px-3 py-1 rounded-md text-white text-xs sm:text-sm ${config.className}`}
      >
        {config.text}
      </button>
    );
  };
  
  export default StatusButton;