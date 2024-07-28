import { useState, useMemo, PropsWithChildren, createContext } from "react";

export const SidebarContext = createContext<{
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
}>({
  isSidebarOpen: false,
  closeSidebar: () => {},
  toggleSidebar: () => {},
});

export const SidebarProvider = ({ children }: PropsWithChildren) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  function toggleSidebar() {
    setIsSidebarOpen(!isSidebarOpen);
  }

  function closeSidebar() {
    setIsSidebarOpen(false);
  }

  const value = useMemo(
    () => ({
      isSidebarOpen,
      toggleSidebar,
      closeSidebar,
    }),
    [isSidebarOpen]
  );

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
};
