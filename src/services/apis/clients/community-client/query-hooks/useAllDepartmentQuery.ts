import { useQuery } from "@/services";
import { COMMUNITY_CLIENT } from "../communityClient";

const ALL_DEPARTMENT_STATS_QUERY_KEY = "all-department-query-key";

export const useAllDepartmentQuery = () => {
  const { data, isError, error, isLoading, isPending, refetch } = useQuery({
    queryKey: [ALL_DEPARTMENT_STATS_QUERY_KEY],
    queryFn: () => COMMUNITY_CLIENT.fetchAllDepartment(),
    networkMode: "always",
  });

  return {
    error,
    isError,
    allDepartment: data,
    isLoading,
    isPending,
    refetchAllDepartment: refetch,
  };
};
