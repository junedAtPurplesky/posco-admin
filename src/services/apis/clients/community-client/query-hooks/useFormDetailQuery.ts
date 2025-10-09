import { useQueryWithUserId } from "@/services";
import { COMMUNITY_CLIENT } from "../communityClient";

const ALL_FORM_DETAIL_QUERY_KEY = "all-form-detail-query-key";

export const useFormDetailQuery = () => {
  const { data, isError, error, isLoading, isPending, refetch } =
    useQueryWithUserId({
      queryKey: [ALL_FORM_DETAIL_QUERY_KEY],
      queryFn: COMMUNITY_CLIENT.getFormDetails,
      networkMode: "always",
    });

  return {
    error,
    isError,
    isLoading,
    isPending,
    allFormDetails: data,
    refetchFormDetails: refetch,
  };
}; 