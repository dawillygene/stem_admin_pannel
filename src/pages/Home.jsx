import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Welcome, {user?.role === "superadmin" ? "Super Admin" : "Admin"}!
      </h1>
      <div className="card bg-white shadow-md p-6 rounded-lg">
        <p className="text-gray-600 text-center">
          This is your home page. Use the sidebar on the left to navigate to different sections of the stem aducation admin panel.
        </p>
      </div>
      
    </div>
  );
};

export default Home;
