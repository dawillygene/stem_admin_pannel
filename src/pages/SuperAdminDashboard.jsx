import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import CommentCard from "../components/CommentCard";

const SuperAdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [comments, setComments] = useState([
    { id: 1, user: "John Doe", comment: "Great article!", date: "2025-04-18" },
    { id: 2, user: "Jane Smith", comment: "Very informative.", date: "2025-04-19" },
  ]);

  const handleApprove = (id) => {
    setComments(comments.filter((comment) => comment.id !== id));
    console.log(`Approved comment ${id}`);
  };

  const handleReject = (id) => {
    setComments(comments.filter((comment) => comment.id !== id));
    console.log(`Rejected comment ${id}`);
  };

  const metrics = [
    { label: "Total Admins", value: 25 },
    { label: "Active Admins", value: 20 },
    { label: "Suspended Admins", value: 5 },
    { label: "Logs", value: 150 },
  ];

  

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Super Admin Dashboard</h1>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric) => (
          <div key={metric.label} className="card p-4 bg-white shadow-md rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 text-center">{metric.label}</h3>
            <p className="text-3xl font-bold text-indigo-600 mt-2 text-center">{metric.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Recent Activity</h2>
        <table className="table w-full border-collapse">
          <thead>
            <tr>
              <th className="text-center text-gray-700">User</th>
              <th className="text-center text-gray-700">Action</th>
              <th className="text-center text-gray-700">Date</th>
            </tr>
          </thead>
          <tbody>
        
          </tbody>
        </table>
      </div>

      {/* Pending Comments */}
      <div>
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Pending Comments</h2>
        <div className="space-y-4 max-w-3xl mx-auto">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <CommentCard
                key={comment.id}
                comment={comment}
                onApprove={() => handleApprove(comment.id)}
                onReject={() => handleReject(comment.id)}
              />
            ))
          ) : (
            <p className="text-gray-600 text-center">No pending comments.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
