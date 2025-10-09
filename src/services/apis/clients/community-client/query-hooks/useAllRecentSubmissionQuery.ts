import { useQuery } from "@/services";
import { COMMUNITY_CLIENT } from "../communityClient";

const ALL_RECENT_SUBMISSION_QUERY_KEY = "all-submission-stats-query-key";

export const useAllRecentSubmissionQuery = () => {
  const { data, isError, error, isLoading, isPending, refetch } = useQuery({
    queryKey: [ALL_RECENT_SUBMISSION_QUERY_KEY],
    queryFn: () => COMMUNITY_CLIENT.fetchAllRecentSubmission(),
    networkMode: "always",
  });

  return {
    error,
    isError,
    allRecentSubmission: data,
    isLoading,
    isPending,
    refetchAllRecentSubmission: refetch,
  };
};
