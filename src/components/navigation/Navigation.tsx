import React, { useState } from "react";
import Sidebar, { SidebarProps } from "./Sidebar";
import Header from "./Header";

type NavigationProps = Pick<SidebarProps, "activeTab">;

const Navigation: React.FC<NavigationProps> = ({ activeTab }) => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  return (
    <>
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeTab={activeTab}
      />
      <Header sidebarOpen={sidebarOpen} onSidebarOpen={() => setSidebarOpen(true)} />
    </>
  );
};

export default Navigation;
