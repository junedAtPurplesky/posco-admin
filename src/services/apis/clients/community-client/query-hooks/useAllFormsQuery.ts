import { useQuery } from "@/services";
import { COMMUNITY_CLIENT } from "../communityClient";

/**
 * This is to track the list of form list from the backend.
 */
const ALL_FORM_QUERY_KEY = "all-form-query-key";

/**
 * This hook fetches a list of all the form list in the bloom portal.
 */
export interface FormsFilters {
  searchText?: string;
  page?: number;
}

export const useAllFormsQuery = (filters: FormsFilters = {}) => {
  const { data, isError, error, isLoading, isPending, refetch } = useQuery({
    queryKey: [ALL_FORM_QUERY_KEY, filters],
    queryFn: () =>
      COMMUNITY_CLIENT.fetchAllForm(filters.searchText, filters.page),
    networkMode: "always",
  });

  return {
    error,
    isError,
    allFormsData: data,
    isLoading,
    isPending,
    refetchForms: refetch,
  };
};
