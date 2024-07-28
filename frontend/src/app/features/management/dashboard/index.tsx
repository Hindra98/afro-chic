import { useLocation, useOutlet } from "react-router-dom";
import Header from "./components/header";
import { useContext, useEffect } from "react";
import { SidebarContext } from "./context/sidebar";


export const Dashboard = () => {
  const outlet = useOutlet();
  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);
  const location = useLocation();

  useEffect(() => {
    closeSidebar();
  }, [location]);

  return (
    <>
        <div
      className={`flex bg-gray-50 dark:bg-gray-900 dark:text-white ${isSidebarOpen && "overflow-hidden"}`}
    >
      <div className="flex flex-col flex-1 w-full">
        <Header />

        <main className="h-full overflow-y-auto">
          <div className="container grid px-6 mx-auto">
            {outlet}
          </div>
        </main>
      </div>
    </div>
   
    </>
  );
};
