import {
  DailyFormSubmissionList,
  IssueDistributionByCategoryChart,
  SafetyComplianceOverviewChart,
} from "./components";

export function Dashboard() {
  return (
    <div className="p-4 space-y-6">
      <div>Hello</div>

        <div className="flex flex-col lg:flex-row gap-5">
      <div className="w-full lg:w-1/2">
        <IssueDistributionByCategoryChart />
      </div>
      <div className="w-full lg:w-1/2">
        <SafetyComplianceOverviewChart />
      </div>
    </div>

      <DailyFormSubmissionList />
    </div>
  );
}
