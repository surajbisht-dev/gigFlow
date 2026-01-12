export default function Button({
  children,
  onClick,
  type = "button",
  disabled = false,
  variant = "primary",
}) {
  const styles = {
    primary: "bg-primary text-white",
    danger: "bg-red-500 text-white",
    success: "bg-green-600 text-white",
    outline: "border border-gray-400 text-gray-700",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`px-4 py-2 rounded transition 
        ${styles[variant]} 
        ${disabled ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"}
      `}
    >
      {children}
    </button>
  );
}
