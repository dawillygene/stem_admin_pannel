import { FaUniversity } from "react-icons/fa";

const SidebarHeader = () => (
  <div className="px-6 py-5 border-b border-blue-700 flex items-center">
    <FaUniversity className="text-2xl mr-3 text-[#FFAD03]" />
    <div>
      <h2 className="text-xl font-bold">STEM</h2>
      <p className="text-xs text-blue-200">Dashboard</p>
    </div>
  </div>
);

export default SidebarHeader;