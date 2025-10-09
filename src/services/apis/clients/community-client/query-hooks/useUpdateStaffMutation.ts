import {  useMutation } from "@/services";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";
import { COMMUNITY_CLIENT } from "../communityClient";
import { IUpdateStaffResponse } from "../types";

/**
 * This is to track the update client mutation.
 */
const UPDATE_STAFF_MUTATION_KEY = "update-staff-mutation-key";

interface IUpdateStaffOptions {
  onSuccessCallback: (data: IUpdateStaffResponse) => void;
  onErrorCallback?: (err: IApiError) => void;
}

/**
 * Hook to update client
 */
export const useUpdateStaffMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: IUpdateStaffOptions) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: [UPDATE_STAFF_MUTATION_KEY],
    networkMode: "always", // Ensures the call happens even in offline mode
    retry: false, // Do not retry failed requests
    mutationFn: COMMUNITY_CLIENT.updateStaff,
    onSuccess: (response) => {
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error: err,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useUpdateStaffMutation",
        message: err?.message,
      });

      onErrorCallback?.(err);
    },
  });

  return {
    error,
    isPending,
    updateStaffMutate: mutate,
  };
};