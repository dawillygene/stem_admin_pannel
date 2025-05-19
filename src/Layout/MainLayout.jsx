import Sidebar from "./Sidebar";

const MainLayout = ({ children }) => {

  return (
<>
    <Sidebar />
      <main className="flex-grow">
        {children}
      </main>
</>
  );
};

export default MainLayout;