
import { ReactNode } from "react";
import Navbar from "./Navbar";

interface PageContainerProps {
  children: ReactNode;
  title: string;
  showNav?: boolean;
}

const PageContainer = ({ children, title, showNav = true }: PageContainerProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {showNav && <Navbar />}
      <div className="container px-4 py-8 mx-auto max-w-7xl">
        <h1 className="mb-6 text-3xl font-bold text-gray-900">{title}</h1>
        <div className="fade-in">{children}</div>
      </div>
    </div>
  );
};

export default PageContainer;
