export async function fetchMonitoringData() {
  try {
    const response = await fetch("http://10.40.14.18:8000/api");

    if (!response.ok) {
      throw new Error("Erreur HTTP : " + response.status);
    }

    const json = await response.json();
    return json.data || [];
  } catch (error) {
    console.error("Erreur API :", error);
    return [];
  }
}
