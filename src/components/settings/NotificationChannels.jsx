import ChannelBadge from "../ui/ChannelBadge";
import { updateOperator } from "../../utils/operatorsApi";

export default function NotificationChannels({ operator, onUpdated }) {

  const toggleChannel = async (field) => {
    try {
      await updateOperator(operator.id, {
        [field]: !operator[field],
      });

      onUpdated && onUpdated();
    } catch (e) {
      console.error("Erreur update channel", e);
      alert("Erreur lors de la mise à jour");
    }
  };

  return (
    <div className="d-flex gap-2">

      <ChannelBadge
        active={operator.notify_whatsapp}
        icon="bi-whatsapp"
        onClick={() => toggleChannel("notify_whatsapp")}
      />

      <ChannelBadge
        active={operator.notify_telegram}
        icon="bi-telegram"
        onClick={() => toggleChannel("notify_telegram")}
      />

      <ChannelBadge
        active={operator.notify_call}
        icon="bi-telephone"
        onClick={() => toggleChannel("notify_call")}
      />

    </div>
  );
}
