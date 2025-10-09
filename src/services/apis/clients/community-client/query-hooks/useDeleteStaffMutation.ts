import { useMutation } from "@/services";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";

import { COMMUNITY_CLIENT } from "../communityClient";
import { IDeleteStaffResponse } from "../types";

/**
 * This is to track the client mutation keys in react query cache.
 */
const DELETE_STAFF_MUTATION_KEY = "delete-staff-mutation-key";

interface IDeleteStaffOptions {
  onSuccessCallback: (data: IDeleteStaffResponse) => void;
  onErrorCallback?: (error: IApiError) => void;
}
  
/**
 * This register the user or vender to carpet market.
 */
export const useDeleteStaffMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: IDeleteStaffOptions) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: [DELETE_STAFF_MUTATION_KEY],
    networkMode: "always", // Even make calls when offline
    retry: false, // For login Request, do not retry failed requests.
    mutationFn: COMMUNITY_CLIENT.deleteStaff,
    onSuccess: (response) => {
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useDeleteStaffMutation",
        message: error?.message,
      });

      onErrorCallback?.(err);

      return err;
    },
  });

  return {
    error,
    isPending,
    onDeleteStaffMutate: mutate,
  };
};