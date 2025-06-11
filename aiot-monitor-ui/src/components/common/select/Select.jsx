const Select = ({ children, className = "", ...props }) => {
  return (
    <select
      className={`block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm ${className}`}
      {...props}
    >
      {children}
    </select>
  );
};

export default Select;
