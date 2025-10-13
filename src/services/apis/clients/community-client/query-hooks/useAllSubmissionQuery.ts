
import { useQuery } from '@/services';
import { COMMUNITY_CLIENT } from '../communityClient';

/**
 * This is to track the list of Submission list from the backend.
 */
const ALL_SUBMISSION_QUERY_KEY = 'all-submission-query-key';

/**
 * This hook fetches a list of all the client list in the bloom portal.
 */
export interface SubmissionFilters {
  searchText?: string;
  page?: number;
}

export const useAllSubmissionQuery = (filters: SubmissionFilters = {}) => {
  const { data, isError, error, isLoading, isPending, refetch } = useQuery({
    queryKey: [ALL_SUBMISSION_QUERY_KEY, filters],
    queryFn: () => COMMUNITY_CLIENT.fetchAllSubmission(filters.searchText, filters.page),
    networkMode: 'always',
  });

  return {
    error,
    isError,
    allSubmissionData: data,
    isLoading,
    isPending,
    refetchSubmission: refetch,
  };
};
