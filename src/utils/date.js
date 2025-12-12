// Retourne "il y a X minutes"
export function timeSince(timestamp) {
  const now = new Date();
  const last = new Date(timestamp);
  const diffMs = now - last;
  const diffMin = Math.floor(diffMs / 60000);

  if (diffMin <= 0) return "à l'instant";
  if (diffMin === 1) return "il y a 1 minute";
  return `il y a ${diffMin} minutes`;
}

// HH:MM format
export function formatHour(timestamp) {
  return new Date(timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });
}
