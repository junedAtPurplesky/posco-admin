
import { useQuery } from '@/services';
import { COMMUNITY_CLIENT } from '../communityClient';

/**
 * This is to track the list of staff list from the backend.
 */
const ALL_STAFF_QUERY_KEY = 'all-staff-query-key';

/**
 * This hook fetches a list of all the client list in the bloom portal.
 */
export interface StaffFilters {
  searchText?: string;
  page?: number;
}

export const useAllStaffQuery = (filters: StaffFilters = {}) => {
  const { data, isError, error, isLoading, isPending, refetch } = useQuery({
    queryKey: [ALL_STAFF_QUERY_KEY, filters],
    queryFn: () => COMMUNITY_CLIENT.fetchAllStaff(filters.searchText, filters.page),
    networkMode: 'always',
  });

  return {
    error,
    isError,
    allStaffData: data,
    isLoading,
    isPending,
    refetchStaff: refetch,
  };
};
