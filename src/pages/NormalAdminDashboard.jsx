import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { FaCheckCircle, FaTimesCircle, FaComment, FaHistory, FaChartLine, FaFileAlt, FaUserGraduate, FaBook } from "react-icons/fa";
import { motion } from "framer-motion";

const NormalAdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [comments, setComments] = useState([
    { id: 1, user: "dawilly", comment: "Great article on STEM education!", date: "2025-04-18" },
    { id: 2, user: "elly", comment: "Very informative content on science teaching methods.", date: "2025-04-19" },
  ]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const handleApprove = (id) => {
    setComments(comments.filter((comment) => comment.id !== id));
    console.log(`Approved comment ${id}`);
  };

  const handleReject = (id) => {
    setComments(comments.filter((comment) => comment.id !== id));
    console.log(`Rejected comment ${id}`);
  };

  const metrics = [
    { label: "Approved Comments", value: 50, icon: <FaCheckCircle />, color: "bg-[#0066CC]" },
    { label: "Pending Comments", value: 10, icon: <FaTimesCircle />, color: "bg-[#FFAD03]" },
    { label: "Total Blogs", value: 30, icon: <FaFileAlt />, color: "bg-[#FD9148]" },
    { label: "Total Publications", value: 15, icon: <FaChartLine />, color: "bg-[#0066CC]" },
  ];

  const recentActivity = [
    { id: 1, user: "elly", action: "Approved comment on STEM blog", date: "2025-04-18" },
    { id: 2, user: "antony", action: "Uploaded Mathematics teaching blog", date: "2025-04-19" },
    { id: 3, user: "dawilly", action: "Added new Science laboratory gallery", date: "2025-04-20" },
  ];

  return (
    <motion.div 
      className="py-8 px-4 sm:px-6 lg:px-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#0066CC]">Admin Dashboard</h1>
          <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow">
            <FaUserGraduate className="text-[#0066CC] mr-2" />
            <span className="font-medium">Welcome, {user?.name || "Admin"}</span>
          </div>
        </div>

        {/* Metrics Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          variants={containerVariants}
        >
          {metrics.map((metric) => (
            <motion.div 
              key={metric.label} 
              className={`p-6 rounded-lg shadow-lg ${metric.color} transform transition-all duration-300 hover:scale-105`}
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
            >
              <div className="flex items-center mb-4">
                <div className="text-4xl text-white mr-3">{metric.icon}</div>
                <h3 className="text-xl font-semibold text-white">{metric.label}</h3>
              </div>
              <p className="text-4xl font-bold text-white">{metric.value}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <motion.div 
            className="lg:col-span-2"
            variants={containerVariants}
          >
            <motion.div 
              className="bg-white rounded-xl shadow-lg overflow-hidden mb-8"
              variants={itemVariants}
            >
              <div className="bg-[#0066CC] px-6 py-4">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <FaHistory className="mr-2" /> Recent Activity
                </h2>
              </div>
              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left border-b border-gray-200">
                        <th className="pb-3 font-semibold text-gray-600">User</th>
                        <th className="pb-3 font-semibold text-gray-600">Action</th>
                        <th className="pb-3 font-semibold text-gray-600">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentActivity.map((activity, index) => (
                        <motion.tr 
                          key={activity.id}
                          className={index % 2 === 0 ? "bg-gray-50" : ""}
                          variants={itemVariants}
                        >
                          <td className="py-3 pr-2">
                            <span className="font-medium text-[#0066CC]">{activity.user}</span>
                          </td>
                          <td className="py-3 pr-2">{activity.action}</td>
                          <td className="py-3 text-gray-500">{activity.date}</td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            className="lg:col-span-1"
            variants={containerVariants}
          >
            <motion.div 
              className="bg-white rounded-xl shadow-lg overflow-hidden mb-8"
              variants={itemVariants}
            >
              <div className="bg-[#FFAD03] px-6 py-4">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <FaBook className="mr-2" /> Quick Actions
                </h2>
              </div>
              <div className="p-6 space-y-4">
                <a href="/blogs" className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-[#0066CC] flex items-center justify-center text-white">
                    <FaFileAlt />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium">New Blog Post</h3>
                    <p className="text-sm text-gray-500">Create a new STEM blog post</p>
                  </div>
                </a>
                <a href="/normal-admin" className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-[#FD9148] flex items-center justify-center text-white">
                    <FaComment />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium">Review Comments</h3>
                    <p className="text-sm text-gray-500">Moderate recent comments</p>
                  </div>
                </a>
                <a href="/profile" className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-[#0066CC] flex items-center justify-center text-white">
                    <FaUserGraduate />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium">My Profile</h3>
                    <p className="text-sm text-gray-500">Update your account details</p>
                  </div>
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Pending Comments */}
        <motion.div 
          className="bg-white rounded-xl shadow-lg overflow-hidden mb-8"
          variants={containerVariants}
        >
          <div className="bg-[#FD9148] px-6 py-4">
            <h2 className="text-xl font-bold text-white flex items-center">
              <FaComment className="mr-2" /> Pending Comments
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <motion.div 
                    key={comment.id} 
                    className="bg-gray-50 p-4 rounded-lg border border-gray-200"
                    variants={itemVariants}
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="bg-[#0066CC] text-white p-2 rounded-full mr-3">
                          <FaComment />
                        </div>
                        <div>
                          <p className="font-bold text-[#0066CC]">{comment.user}</p>
                          <p className="text-sm text-gray-500">{comment.date}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleApprove(comment.id)}
                          className="bg-[#0066CC] text-white px-3 py-1 rounded-md hover:bg-opacity-90 transition-colors flex items-center"
                        >
                          <FaCheckCircle className="mr-1" /> Approve
                        </button>
                        <button
                          onClick={() => handleReject(comment.id)}
                          className="bg-[#FD9148] text-white px-3 py-1 rounded-md hover:bg-opacity-90 transition-colors flex items-center"
                        >
                          <FaTimesCircle className="mr-1" /> Reject
                        </button>
                      </div>
                    </div>
                    <p className="mt-3 bg-white p-3 rounded-md border border-gray-200">{comment.comment}</p>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <FaComment className="mx-auto text-3xl text-gray-300 mb-2" />
                  <p>No pending comments to review</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default NormalAdminDashboard;
