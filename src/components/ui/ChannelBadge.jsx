export default function ChannelBadge({ active, icon, onClick }) {
  return (
    <span
      className={`badge ${
        active ? "bg-primary" : "bg-light text-muted"
      }`}
      style={{ cursor: "pointer" }}
      onClick={onClick}
      title="Cliquer pour activer / désactiver"
    >
      <i className={`bi ${icon}`}></i>
    </span>
  );
}
