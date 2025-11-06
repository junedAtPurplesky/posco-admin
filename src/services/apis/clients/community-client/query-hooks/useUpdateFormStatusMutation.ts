import { useMutation } from "@/services";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";
import { COMMUNITY_CLIENT } from "../communityClient";
import { IUpdateFormStatusResponse } from "../types";

/**
 * This is to track the update client mutation.
 */
const UPDATE_FORM_STATUS_MUTATION_KEY = "update-form-status-mutation-key";

interface IUpdateFormStatusOptions {
  onSuccessCallback: (data: IUpdateFormStatusResponse) => void;
  onErrorCallback?: (err: IApiError) => void;
}

/**
 * Hook to update client
 */
export const useUpdateFormStatusMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: IUpdateFormStatusOptions) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: [UPDATE_FORM_STATUS_MUTATION_KEY],
    networkMode: "always", // Ensures the call happens even in offline mode
    retry: false, // Do not retry failed requests
    mutationFn: COMMUNITY_CLIENT.updateFormStatus,
    onSuccess: (response) => {
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error: err,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useUpdateFormStatusMutation",
        message: err?.message,
      });

      onErrorCallback?.(err);
    },
  });

  return {
    error,
    isPending,
    updateFormStatusMutate: mutate,
  };
};