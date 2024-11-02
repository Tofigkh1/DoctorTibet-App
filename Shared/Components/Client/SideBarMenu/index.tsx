import React, { useState, useContext, ReactNode } from "react";
import { ChevronFirst, ChevronLast } from "lucide-react";

// Define SidebarContext type
type SidebarContextType = {
  expanded: boolean;
};

// Create a context for managing the sidebar state
const SidebarContext = React.createContext<SidebarContextType | undefined>(undefined);

// Sidebar component
export default function Sidebar({ children }: { children: ReactNode }) {
  const [expanded, setExpanded] = useState(true); // State to track whether sidebar is expanded or not

  return (
    <aside className="h-screen " >
      <nav
        className={`h-full flex flex-col bg-white border-r border-whiteLight3 transition-all ml-3 ${
          expanded ? "w-[140%] h-[130%]" : "w-[95px]" // Sidebar expands to 32% width or collapses to 60px
        }`}
      >
        <div className="p-4 pb-2 flex justify-between items-center">
          {/* Logo with dynamic width */}
          <h1
            
            className={`overflow-hidden transition-all  ${
              expanded ? "w-32 text-2xl font-semibold"  : "w-0" // Logo is hidden when sidebar is collapsed
            }`}
         
         >Menu</h1>

          {/* Toggle button for sidebar */}
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="pl-3.5 rounded-lg bg-textColorGreen hover:bg-clientButtonGreen mr-2 w-14 h-11 mt-14" 
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />} {/* Chevron icon changes based on expansion state */}
          </button>
        </div>

        {/* Sidebar context provider to manage state across sidebar items */}
        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul> {/* Sidebar items will be rendered here */}
        </SidebarContext.Provider>
      </nav>
    </aside>
  );
}

// SidebarItem component for individual items inside the sidebar
type SidebarItemProps = {
  icon: ReactNode;          // Icon to display in the sidebar item
  text: string;             // Text to display in the sidebar item
  active: boolean;          // Boolean to determine if the item is active (highlighted)
  onClick: () => void;      // Add onClick function to handle clicks
  style?: React.CSSProperties; // Optional style prop for custom styles
};

export function SidebarItem({ icon, text, active, onClick, style }: SidebarItemProps) {
  const context = useContext(SidebarContext); // Sidebar context to manage expanded/collapsed state
  const { expanded } = context!;

  return (
    <li
      onClick={onClick} // Attach the click handler here
      style={style}      // Apply custom style
      className={`group relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors mt-8
          ${
        active
          ? " bg-textColorGreen text-mainRedLight " // Active item style
          : "hover:bg-textColorGreen text-gray-600 " // Hover style for non-active items
      }`}
    >
      {/* Icon büyütüldü */}
      <span className="text-xl">
        {icon}
      </span>

      {/* Text büyütüldü ve boşluk artırıldı */}
      {expanded && (
        <span className="ml-4 text-xl text-black transition-all duration-200">
          {text}
        </span>
      )}

      {/* Navbar kapalıyken hover ile çıkan isimler için arka plan yeşil yapıldı */}
      {!expanded && (
        <span
          className={`absolute left-full whitespace-nowrap bg-textColorGreen text-black rounded-md py-1 px-2 transition-all duration-200 ml-2 opacity-0 group-hover:opacity-100`}
        >
          {text}
        </span>
      )}
    </li>
  );
}