import Sidebar from "./Sidebar/Sidebar";
import { ToastProvider } from "../components/Toast";

const MainLayout = ({ children }) => (
  <ToastProvider>
    <div>
      <Sidebar />
      <div className="md:ml-64 pt-16 min-h-screen bg-gray-50">
        {children}
      </div>
    </div>
  </ToastProvider>
);

export default MainLayout;