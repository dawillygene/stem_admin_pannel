const SidebarUser = ({ user }) => (
  <div className="px-4 py-4 border-b border-blue-700">
    <div className="flex items-center">
      <div className="w-10 h-10 rounded-full bg-[#FFAD03] flex items-center justify-center text-white font-bold">
        {user.name ? user.name.charAt(0) : ""}
      </div>
      <div className="ml-3">
        <p className="font-medium">{user.name}</p>
      </div>
    </div>
  </div>
);

export default SidebarUser;