import {
  DailyFormSubmissionList,
  IssueDistributionByCategoryChart,
  SafetyComplianceOverviewChart,
} from "./components";
import { AnalysisCardList } from "./components/analysis-card-list";

export function Dashboard() {
  return (
    <div className="p-4 space-y-6">
      <div>
        <AnalysisCardList
          columns={3}
          className="mb-8"
        />
      </div>

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
