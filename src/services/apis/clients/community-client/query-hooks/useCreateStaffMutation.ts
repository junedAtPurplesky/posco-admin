import { useMutation } from "@/services";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";
import { COMMUNITY_CLIENT } from "../communityClient";
import { ICreateStaffResponse } from "../types";

/**
 * This is to track the create staff mutation.
 */
const CREATE_STAFF_MUTATION_KEY = "create-staff-mutation-key";

interface ICreateStaffOptions {
  onSuccessCallback: (data: ICreateStaffResponse) => void;
  onErrorCallback?: (err: IApiError) => void;
}

/**
 * Hook to create staff
 */
export const useCreateStaffMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: ICreateStaffOptions) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: [CREATE_STAFF_MUTATION_KEY],
    networkMode: "always", // Ensures the call happens even in offline mode
    retry: false, // Do not retry failed requests
    mutationFn: COMMUNITY_CLIENT.createStaff,
    onSuccess: (response) => {
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error: err,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useCreateStaffMutation",
        message: err?.message,
      });

      onErrorCallback?.(err);
    },
  });

  return {
    error,
    isPending,
    onCreateStaffMutate: mutate,
  };
};
