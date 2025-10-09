import { useQuery } from "@/services";
import { COMMUNITY_CLIENT } from "../communityClient";

const SAFETY_COMPLIANCE_QUERY_KEY = "safety-compliance-query-key";

export const useSafetyComplianceChartDataQuery = () => {
  const { data, isError, error, isLoading, isPending, refetch } = useQuery({
    queryKey: [SAFETY_COMPLIANCE_QUERY_KEY],
    queryFn: () => COMMUNITY_CLIENT.fetchSafetyCompliance(),
    networkMode: "always",
  });

  return {
    error,
    isError,
    chartData: data,
    isLoading,
    isPending,
    refetchSafetyComplianceChartData: refetch,
  };
};
