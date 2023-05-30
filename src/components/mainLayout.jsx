import Navbar from "./navbar";
import Sidebar from "./sidebar";

const MainLayout = ({ children }) => {
  return (
    <div className=" relative">
      <Navbar />
      <div className="flex gap-1 pt-24 justify-end">
        <Sidebar />
        <div className="sm:w-[calc(100%-256px)] px-2 w-full" >{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
