import { useQueryWithUserId } from "@/services";
import { COMMUNITY_CLIENT } from "../communityClient";

const ALL_STAFF_DETAIL_QUERY_KEY = "all-staff-detail-query-key";

export const useStaffDetailQuery = () => {
  const { data, isError, error, isLoading, isPending, refetch } =
    useQueryWithUserId({
      queryKey: [ALL_STAFF_DETAIL_QUERY_KEY],
      queryFn: COMMUNITY_CLIENT.getStaffDetails,
      networkMode: "always",
    });

  return {
    error,
    isError,
    isLoading,
    isPending,
    allStaffDetails: data,
    refetchStaffDetails: refetch,
  };
}; 