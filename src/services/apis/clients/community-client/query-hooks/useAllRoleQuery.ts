import { useQuery } from "@/services";
import { COMMUNITY_CLIENT } from "../communityClient";

const ALL_ROLES_STATS_QUERY_KEY = "all-roles-query-key";

export const useAllRoleQuery = () => {
  const { data, isError, error, isLoading, isPending, refetch } = useQuery({
    queryKey: [ALL_ROLES_STATS_QUERY_KEY],
    queryFn: () => COMMUNITY_CLIENT.fetchAllRole(),
    networkMode: "always",
  });

  return {
    error,
    isError,
    allRole: data,
    isLoading,
    isPending,
    refetchAllRole: refetch,
  };
};
