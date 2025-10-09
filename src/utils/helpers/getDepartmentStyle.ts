
export function getDepartmentStyle(department: string): string {
  switch (department.toLowerCase()) {
    case "maintenance":
    case "worker":
      return "text-green-600 border-green-600";
    case "electrical":
      return "text-blue-600 border-blue-600";
    case "supervisor":
      return "text-yellow-600 border-yellow-600";
    case "quality control":
      return "text-orange-600 border-orange-600";
    default:
      return "text-gray-600 border-gray-400";
  }
}