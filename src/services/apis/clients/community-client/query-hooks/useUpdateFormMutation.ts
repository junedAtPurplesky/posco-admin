import {  useMutation } from "@/services";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";
import { COMMUNITY_CLIENT } from "../communityClient";
import { IUpdateFormResponse } from "../types";

/**
 * This is to track the update client mutation.
 */
const UPDATE_FORM_MUTATION_KEY = "update-form-mutation-key";

interface IUpdateFormOptions {
  onSuccessCallback: (data: IUpdateFormResponse) => void;
  onErrorCallback?: (err: IApiError) => void;
}

/**
 * Hook to update client
 */
export const useUpdateFormMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: IUpdateFormOptions) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: [UPDATE_FORM_MUTATION_KEY],
    networkMode: "always", // Ensures the call happens even in offline mode
    retry: false, // Do not retry failed requests
    mutationFn: COMMUNITY_CLIENT.updateForm,
    onSuccess: (response) => {
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error: err,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useUpdateFormMutation",
        message: err?.message,
      });

      onErrorCallback?.(err);
    },
  });

  return {
    error,
    isPending,
    updateFormMutate: mutate,
  };
};