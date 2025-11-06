import { useMutation } from "@/services";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";
import { COMMUNITY_CLIENT } from "../communityClient";
import { IUpdateStaffStatusResponse } from "../types";

/**
 * This is to track the update client mutation.
 */
const UPDATE_STAFF_STATUS_MUTATION_KEY = "update-staff-status-mutation-key";

interface IUpdateStaffStatusOptions {
  onSuccessCallback: (data: IUpdateStaffStatusResponse) => void;
  onErrorCallback?: (err: IApiError) => void;
}

/**
 * Hook to update client
 */
export const useUpdateStaffStatusMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: IUpdateStaffStatusOptions) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: [UPDATE_STAFF_STATUS_MUTATION_KEY],
    networkMode: "always", // Ensures the call happens even in offline mode
    retry: false, // Do not retry failed requests
    mutationFn: COMMUNITY_CLIENT.updateStaffStatus,
    onSuccess: (response) => {
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error: err,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useUpdateStaffStatusMutation",
        message: err?.message,
      });

      onErrorCallback?.(err);
    },
  });

  return {
    error,
    isPending,
    updateStaffStatusMutate: mutate,
  };
};