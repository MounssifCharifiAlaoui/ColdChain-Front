export function formatRole(role) {
  if (!role) return "—";
  return role.replace(/_/g, " ").toUpperCase();
}

export function roleColor(role) {
  switch (role) {
    case "admin":
      return "dark";
    case "operator":
      return "info";
    case "supervisor":
      return "warning";
    case "manager":
      return "primary";
    default:
      return "secondary";
  }
}
