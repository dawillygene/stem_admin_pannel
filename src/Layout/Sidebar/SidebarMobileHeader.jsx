import { FaUniversity, FaBars, FaTimes } from "react-icons/fa";

const SidebarMobileHeader = ({ isMobile, isOpen, setIsOpen }) =>
  isMobile ? (
    <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-[#0066CC] text-white shadow-md">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center">
          <FaUniversity className="text-xl mr-2" />
          <h2 className="text-lg font-bold">STEM EDUCATION</h2>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
        </button>
      </div>
    </div>
  ) : null;

export default SidebarMobileHeader;