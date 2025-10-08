import { useMutation } from "@/services";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";
import { COMMUNITY_CLIENT } from "../communityClient";
import { ICreateFormResponse } from "../types";

/**
 * This is to track the create staff mutation.
 */
const CREATE_FORM_MUTATION_KEY = "create-form-mutation-key";

interface ICreateFormOptions {
  onSuccessCallback: (data: ICreateFormResponse) => void;
  onErrorCallback?: (err: IApiError) => void;
}

/**
 * Hook to create staff
 */
export const useCreateFormMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: ICreateFormOptions) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: [CREATE_FORM_MUTATION_KEY],
    networkMode: "always", // Ensures the call happens even in offline mode
    retry: false, // Do not retry failed requests
    mutationFn: COMMUNITY_CLIENT.createForm,
    onSuccess: (response) => {
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error: err,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useCreateFormMutation",
        message: err?.message,
      });

      onErrorCallback?.(err);
    },
  });

  return {
    error,
    isPending,
    onCreateFormMutate: mutate,
  };
};
