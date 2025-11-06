import {
  DailyFormSubmissionList,
  // IssueDistributionByCategoryChart,
  SafetyComplianceOverviewChart,
} from "./components";
import { AnalysisCardList } from "./components/analysis-card-list";

export function Dashboard() {
  return (
    <div className="p-4 space-y-6">
      {/* <div>
        <AnalysisCardList
          columns={3}
          className="mb-4"
        />
      </div> */}

      <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
        {/* <div className="w-full lg:w-[34rem]">
          <IssueDistributionByCategoryChart />
        </div> */}
              <div>
        <AnalysisCardList
          columns={3}
          className="mb-4"
        />
      </div>
        <div className="w-full lg:w-[40rem]">
          <SafetyComplianceOverviewChart />
        </div>
      </div>

      <DailyFormSubmissionList />
    </div>
  );
}
