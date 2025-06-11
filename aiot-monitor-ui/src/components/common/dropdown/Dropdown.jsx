import React from "react";
import { useState, useRef, useEffect } from "react";

const Dropdown = ({ trigger, children, align = "left" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const alignmentClasses = {
    left: "left-0",
    right: "right-0",
    top: "bottom-full right-0 mb-2",
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>

      {isOpen && (
        <div
          className={`absolute z-50 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 ${alignmentClasses[align]}`}
          style={{ zIndex: 9999 }}
        >
          <div className="py-1">
            {React.Children.map(children, (child) => {
              return React.cloneElement(child, {
                onClick: () => {
                  closeDropdown();
                  if (child.props.onClick) {
                    child.props.onClick();
                  }
                },
              });
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export const DropdownItem = ({ children, onClick, className = "" }) => {
  return (
    <button
      className={`block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Dropdown;
