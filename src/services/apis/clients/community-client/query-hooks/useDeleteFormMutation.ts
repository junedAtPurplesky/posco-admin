import { useMutation } from "@/services";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";

import { COMMUNITY_CLIENT } from "../communityClient";
import { IDeleteFormResponse } from "../types";

/**
 * This is to track the client mutation keys in react query cache.
 */
const DELETE_FORM_MUTATION_KEY = "delete-form-mutation-key";

interface IDeleteFormOptions {
  onSuccessCallback: (data: IDeleteFormResponse) => void;
  onErrorCallback?: (error: IApiError) => void;
}
  
/**
 * This register the user or vender to carpet market.
 */
export const useDeleteFormMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: IDeleteFormOptions) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: [DELETE_FORM_MUTATION_KEY],
    networkMode: "always", // Even make calls when offline
    retry: false, // For login Request, do not retry failed requests.
    mutationFn: COMMUNITY_CLIENT.deleteForm,
    onSuccess: (response) => {
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useDeleteFormMutation",
        message: error?.message,
      });

      onErrorCallback?.(err);

      return err;
    },
  });

  return {
    error,
    isPending,
    onDeleteFormMutate: mutate,
  };
};