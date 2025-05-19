import { useContext, useState } from "react";
import { motion } from "framer-motion";

import { 
  FaUserShield, FaUsers, FaUserCheck, FaUserTimes, 
  FaClipboardList, FaChartLine, FaComment, FaCheck, 
  FaTimes, FaCalendarAlt, FaChartBar, FaDatabase, 
  FaUserCog, FaCog
} from "react-icons/fa";

const SuperAdminDashboard = () => {

  const user = null;
  const [comments, setComments] = useState([
    { 
      id: 1, 
      user: "John Doe", 
      comment: "Great article on mathematics integration in science classes!", 
      date: "2025-04-18",
      post: "Cross-Disciplinary STEM Approaches" 
    },
    { 
      id: 2, 
      user: "Jane Smith", 
      comment: "The new laboratory guidance has been very helpful for our school.", 
      date: "2025-04-19",
      post: "Science Laboratory Best Practices" 
    },
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
    { label: "Total Admins", value: 25, icon: <FaUsers />, color: "bg-[#0066CC]" },
    { label: "Active Admins", value: 20, icon: <FaUserCheck />, color: "bg-[#FFAD03]" },
    { label: "Suspended Admins", value: 5, icon: <FaUserTimes />, color: "bg-[#FD9148]" },
    { label: "System Logs", value: 150, icon: <FaClipboardList />, color: "bg-[#0066CC]" },
  ];

  const recentActivity = [
    { id: 1, user: "Admin Jane", action: "Created new blog post", date: "2025-04-25", type: "content" },
    { id: 2, user: "Admin Michael", action: "Updated site settings", date: "2025-04-24", type: "system" },
    { id: 3, user: "Admin Sarah", action: "Published research paper", date: "2025-04-23", type: "content" },
    { id: 4, user: "Admin David", action: "Added new user account", date: "2025-04-22", type: "user" },
    { id: 5, user: "Admin James", action: "Modified permissions", date: "2025-04-21", type: "system" },
  ];

  // Animation variants
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div 
          className="bg-white shadow-md rounded-xl p-6 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#0066CC]">Super Admin Dashboard</h1>
              <p className="text-gray-600 mt-1">Welcome back, {user?.name || "Administrator"}</p>
            </div>
            
            <div className="mt-4 md:mt-0 flex items-center gap-3">
              <span className="text-gray-600">Last login: Today, 08:45 AM</span>
              <motion.button
                className="bg-[#0066CC]/10 text-[#0066CC] p-2 rounded-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaCog />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Metrics Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          variants={staggerChildren}
          initial="initial"
          animate="animate"
        >
          {metrics.map((metric, index) => (
            <motion.div 
              key={metric.label} 
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              variants={fadeIn}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center mb-3">
                <div className={`p-3 ${metric.color} rounded-lg text-white`}>
                  {metric.icon}
                </div>
                <h3 className="ml-3 text-lg font-semibold text-gray-700">{metric.label}</h3>
              </div>
              <p className="text-3xl font-bold text-[#0066CC]">{metric.value}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Recent Activity */}
          <motion.div 
            className="lg:col-span-2 bg-white rounded-xl shadow-md overflow-hidden"
            variants={fadeIn}
            initial="initial"
            animate="animate"
          >
            <div className="bg-[#0066CC] px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white flex items-center">
                <FaChartLine className="mr-2" /> Recent Activity
              </h2>
              <span className="bg-white text-[#0066CC] text-xs px-2 py-1 rounded-full font-bold">
                Last 5 actions
              </span>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Admin</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recentActivity.map((activity) => (
                    <tr key={activity.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#0066CC]">
                        {activity.user}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {activity.action}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {activity.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${activity.type === 'content' ? 'bg-blue-100 text-blue-800' : 
                            activity.type === 'system' ? 'bg-purple-100 text-purple-800' : 
                            'bg-green-100 text-green-800'
                          }`}>
                          {activity.type}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 text-right">
              <button className="text-sm text-[#0066CC] hover:underline">
                View All Activity
              </button>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div 
            className="lg:col-span-1 bg-white rounded-xl shadow-md overflow-hidden"
            variants={fadeIn}
            initial="initial"
            animate="animate"
          >
            <div className="bg-[#FFAD03] px-6 py-4">
              <h2 className="text-xl font-bold text-white flex items-center">
                <FaChartBar className="mr-2" /> System Overview
              </h2>
            </div>
            
            <div className="p-6 space-y-5">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <FaDatabase className="text-[#0066CC] mr-2" />
                  <span className="text-gray-700">Database Status</span>
                </div>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                  Operational
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <FaUserCog className="text-[#0066CC] mr-2" />
                  <span className="text-gray-700">User Accounts</span>
                </div>
                <span className="text-[#0066CC] font-semibold">254</span>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <FaCalendarAlt className="text-[#0066CC] mr-2" />
                  <span className="text-gray-700">Published Content</span>
                </div>
                <span className="text-[#0066CC] font-semibold">87 items</span>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <FaComment className="text-[#0066CC] mr-2" />
                  <span className="text-gray-700">Pending Comments</span>
                </div>
                <span className="text-[#0066CC] font-semibold">
                  {comments.length} comments
                </span>
              </div>
              
              <div className="pt-3 mt-3 border-t border-gray-100">
                <a href="#" className="text-[#0066CC] hover:underline text-sm flex justify-between items-center">
                  <span>View Detailed Reports</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Pending Comments */}
        <motion.div 
          className="bg-white rounded-xl shadow-md overflow-hidden mb-8"
          variants={fadeIn}
          initial="initial"
          animate="animate"
        >
          <div className="bg-[#FD9148] px-6 py-4 flex justify-between items-center">
            <h2 className="text-xl font-bold text-white flex items-center">
              <FaComment className="mr-2" /> Pending Comments
            </h2>
            <span className="bg-white text-[#FD9148] text-xs px-2 py-1 rounded-full font-bold">
              Requires Approval
            </span>
          </div>
          
          {comments.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {comments.map((comment) => (
                <div key={comment.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between flex-wrap gap-2 mb-3">
                    <div>
                      <span className="font-medium text-[#0066CC]">{comment.user}</span>
                      <span className="text-gray-500 text-sm ml-2">on {comment.post}</span>
                    </div>
                    <span className="text-sm text-gray-500">{comment.date}</span>
                  </div>
                  
                  <p className="text-gray-700 mb-4 pb-2 border-b border-gray-100">
                    "{comment.comment}"
                  </p>
                  
                  <div className="flex justify-end space-x-3">
                    <motion.button
                      onClick={() => handleReject(comment.id)}
                      className="bg-red-100 text-red-700 hover:bg-red-200 px-4 py-2 rounded-lg transition-colors flex items-center"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <FaTimes className="mr-2" /> Reject
                    </motion.button>
                    
                    <motion.button
                      onClick={() => handleApprove(comment.id)}
                      className="bg-green-100 text-green-700 hover:bg-green-200 px-4 py-2 rounded-lg transition-colors flex items-center"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <FaCheck className="mr-2" /> Approve
                    </motion.button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <FaComment className="mx-auto text-gray-300 text-5xl mb-3" />
              <p className="text-gray-600">No pending comments to review.</p>
            </div>
          )}
          
          <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 text-right">
            <button className="text-sm text-[#0066CC] hover:underline">
              View All Comments
            </button>
          </div>
        </motion.div>
        
        {/* Quick Actions */}
        <motion.div 
          className="bg-white rounded-xl shadow-md overflow-hidden"
          variants={fadeIn}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.3 }}
        >
          <div className="bg-[#0066CC] px-6 py-4">
            <h2 className="text-xl font-bold text-white flex items-center">
              <FaUserShield className="mr-2" /> Admin Management
            </h2>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a href="#" className="bg-gray-50 hover:bg-gray-100 p-4 rounded-lg transition-colors flex items-center">
                <div className="p-3 bg-[#0066CC] rounded-full text-white mr-3">
                  <FaUserCheck />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Add New Admin</p>
                  <p className="text-xs text-gray-500">Create admin accounts</p>
                </div>
              </a>
              
              <a href="#" className="bg-gray-50 hover:bg-gray-100 p-4 rounded-lg transition-colors flex items-center">
                <div className="p-3 bg-[#FFAD03] rounded-full text-white mr-3">
                  <FaUsers />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Manage Permissions</p>
                  <p className="text-xs text-gray-500">Update admin access</p>
                </div>
              </a>
              
              <a href="#" className="bg-gray-50 hover:bg-gray-100 p-4 rounded-lg transition-colors flex items-center">
                <div className="p-3 bg-[#FD9148] rounded-full text-white mr-3">
                  <FaClipboardList />
                </div>
                <div>
                  <p className="font-medium text-gray-800">View Logs</p>
                  <p className="text-xs text-gray-500">System activity logs</p>
                </div>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
