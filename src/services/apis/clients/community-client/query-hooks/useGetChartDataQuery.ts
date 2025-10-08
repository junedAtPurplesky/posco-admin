import { useQuery } from "@/services";
import { COMMUNITY_CLIENT } from "../communityClient";

const ISSUE_DISTRIBUTION_QUERY_KEY = "issue-distribution-query-key";

/**
 * Hook to fetch issue distribution data for pie chart.
 */
export const useGetChartDataQuery = () => {
  const { data, isError, error, isLoading, isPending, refetch } = useQuery({
    queryKey: [ISSUE_DISTRIBUTION_QUERY_KEY],
    queryFn: () => COMMUNITY_CLIENT.fetchIssueDistribution(),
    networkMode: "always",
  });

  return {
    error,
    isError,
    chartData: data,
    isLoading,
    isPending,
    refetchChartData: refetch,
  };
};
