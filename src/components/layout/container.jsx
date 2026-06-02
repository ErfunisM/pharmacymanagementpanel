import { useState, useEffect } from "react";
import Sidebar from "./sidebar";
import Header from "./header";

const Container = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 1024;
      setIsDesktop(desktop);

      if (!desktop && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
      if (desktop && isMobileSidebarOpen) {
        setIsMobileSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isSidebarOpen, isMobileSidebarOpen]);

  useEffect(() => {
    if (isMobileSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileSidebarOpen]);

  return (
    <div className="w-full h-screen flex overflow-hidden bg-gray-50">
      {isDesktop && (
        <div
          className={`transition-all duration-300 ${isSidebarOpen ? "w-64" : "w-20"}`}
        >
          <Sidebar isCollapsed={!isSidebarOpen} />
        </div>
      )}

      {!isDesktop && (
        <>
          {isMobileSidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40 transition-all duration-300"
              onClick={() => setIsMobileSidebarOpen(false)}
            />
          )}

          <div
            className={`
              fixed inset-0 z-50
              transition-transform duration-300 ease-in-out
              ${isMobileSidebarOpen ? "translate-x-0" : "translate-x-full"}
            `}
          >
            <Sidebar onClose={() => setIsMobileSidebarOpen(false)} />
          </div>
        </>
      )}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header
          onMenuClick={() => setIsMobileSidebarOpen(true)}
          onDesktopMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        <main className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-5 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Container;
