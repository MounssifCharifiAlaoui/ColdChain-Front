export function formatRole(role) {
  if (!role) return "—";
  return role.replace(/_/g, " ").toUpperCase();
}

export function roleColor(role) {
  switch (role) {
    case "admin":
      return "dark";
    case "technical_fridge_manager":
      return "info";
    case "site_pharma_manager":
      return "warning";
    case "site_manager":
      return "primary";
    default:
      return "secondary";
  }
}
