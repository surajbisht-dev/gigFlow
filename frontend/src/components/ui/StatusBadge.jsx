export default function StatusBadge({ status }) {
  const colors = {
    pending: "bg-yellow-100 text-yellow-800",
    hired: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
    open: "bg-blue-100 text-blue-800",
    assigned: "bg-purple-100 text-purple-800",
  };

  return (
    <span
      className={`inline-block px-2 py-1 rounded text-sm font-medium 
        ${colors[status] || "bg-gray-100 text-gray-800"}
      `}
    >
      {status.toUpperCase()}
    </span>
  );
}
