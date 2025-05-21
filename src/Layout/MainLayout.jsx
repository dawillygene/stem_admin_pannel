import Sidebar from "./Sidebar/Sidebar";

const MainLayout = ({ children }) => (
  <div>
    <Sidebar />
    <div className="md:ml-64 pt-16 min-h-screen bg-gray-50">
      {children}
    </div>
  </div>
);

export default MainLayout;