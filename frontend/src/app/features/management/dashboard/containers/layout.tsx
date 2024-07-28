import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/header";
import { SidebarContext } from "../context/sidebar";

function Layout() {
  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);
  let location = useLocation();

  useEffect(() => {
    closeSidebar();
  }, [location]);

  return (
    <div
      className={`flex h-screen bg-gray-50 dark:bg-gray-900 ${isSidebarOpen && "overflow-hidden"}`}
    >
      <div className="flex flex-col flex-1 w-full">
        <Header />

        <main className="h-full overflow-y-auto">
          <div className="container grid px-6 mx-auto">
            Test de layout
          </div>
        </main>
      </div>
    </div>
  );
}

export default Layout;
