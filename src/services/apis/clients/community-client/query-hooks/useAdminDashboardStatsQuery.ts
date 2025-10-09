import { useQuery } from "@/services";
import { COMMUNITY_CLIENT } from "../communityClient";

const ADMIN_DASHBOARD_STATS_QUERY_KEY = "admin-dashboard-stats-query-key";

export const useAdminDashboardStatsQuery = () => {
  const { data, isError, error, isLoading, isPending, refetch } = useQuery({
    queryKey: [ADMIN_DASHBOARD_STATS_QUERY_KEY],
    queryFn: () => COMMUNITY_CLIENT.fetchDashboardStats(),
    networkMode: "always",
  });

  return {
    error,
    isError,
    allStatsData: data,
    isLoading,
    isPending,
    refetchStats: refetch,
  };
};
