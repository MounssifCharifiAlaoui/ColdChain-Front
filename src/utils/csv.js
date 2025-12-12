export function downloadCSV(data) {
  const header = "dt,temp,hum\n";
  const rows = data
    .map((d) => `${d.dt},${d.temp},${d.hum}`)
    .join("\n");

  const csvContent = header + rows;

  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "monitoring_data.csv");
  link.click();
}
