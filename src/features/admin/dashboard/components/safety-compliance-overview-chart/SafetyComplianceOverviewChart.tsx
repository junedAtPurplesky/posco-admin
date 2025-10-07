import { PieChart } from "../pi-chart/PiChart";

export function SafetyComplianceOverviewChart() {
  const data = [
    { label: 'Compliant (Safe)', value: 30, color: '#10B981' },
    { label: 'Non-Compliant (Unsafe)', value: 20, color: '#EF4444' }
  ];

  return (
    <PieChart
      data={data}
      title="Safety Compliance Overview"
      size={220}
      className="w-full"
    />
  );
}