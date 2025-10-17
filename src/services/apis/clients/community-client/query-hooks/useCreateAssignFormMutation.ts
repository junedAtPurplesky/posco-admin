import { useMutation } from "@/services";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";
import { COMMUNITY_CLIENT } from "../communityClient";
import { ICreateAssignFormResponse, ICreateAssignFormPayload } from "../types";

const CREATE_ASSIGN_FORM_MUTATION_KEY = "create-assign-form-mutation-key";

interface ICreateAssignFormOptions {
  onSuccessCallback: (data: ICreateAssignFormResponse) => void;
  onErrorCallback?: (err: IApiError) => void;
}

/**
 * Hook to create assign form
 */
export const useCreateAssignFormMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: ICreateAssignFormOptions) => {
  const { mutate, isPending, error } = useMutation<
    ICreateAssignFormResponse,
    IApiError,
    { id: string; payload: ICreateAssignFormPayload }
  >({
    mutationKey: [CREATE_ASSIGN_FORM_MUTATION_KEY],
    networkMode: "always", 
    retry: false,
    mutationFn: async ({ id, payload }) => {
      return await COMMUNITY_CLIENT.createAssignForm(id, payload);
    },
    onSuccess: (response) => {
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error: err,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useCreateAssignFormMutation",
        message: err?.message,
      });
      onErrorCallback?.(err);
    },
  });

  return {
    error,
    isPending,
    onCreateAssignFormMutate: mutate,
  };
};
