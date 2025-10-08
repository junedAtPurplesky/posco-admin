import { IApiError } from "@/utils";
import { ApiClient } from "../../api-client";
import {
  createStaffUrl,
  deleteStaffUrl,
  fetchAllStaffUrl,
  getStaffDetailsUrl,
  loginUrl,
  updateStaffUrl,
} from "./urls";
import {
  IAllStaffResponse,
  ICreateStaffPayload,
  ICreateStaffResponse,
  IDeleteStaffResponse,
  ILoginPayload,
  ILoginUserResponse,
  IStaffDetailsResponse,
  IUpdateStaffPayload,
  IUpdateStaffResponse,
} from "./types";

/**
 * This is provides the API client methods for the application and routes.
 */
export class CommunityClient extends ApiClient {
  private static classInstance?: CommunityClient;

  private constructor() {
    super({
      baseURL: process.env.NEXT_PUBLIC_POSCO_API_BASE_URL,
    });
  }

  /**
   * Applying the dreaded singleton pattern here to reuse the axios instance.
   */
  public static readonly getClientInstance = () => {
    if (!this.classInstance) {
      this.classInstance = new CommunityClient();
    }
    return this.classInstance;
  };

  public userLogin = async (payload: ILoginPayload) => {
    const response = await this.post<
      ILoginUserResponse,
      ILoginPayload,
      IApiError
    >(loginUrl(), payload, {
      requiresAuth: false,
    });

    if (!response?.success) {
      throw response?.response?.data;
    }

    return response?.data;
  };

  // Staff
  public createStaff = async (payload: ICreateStaffPayload) => {
    const response = await this.post<ICreateStaffResponse>(
      createStaffUrl(),
      payload
    );

    if (!response?.success) {
      throw response?.response?.data;
    }

    return response?.data;
  };
  // Update
  public updateStaff = async ({ id, payload }: IUpdateStaffPayload) => {
    const response = await this.put<IUpdateStaffResponse>(
      updateStaffUrl(id),
      payload,
      {
        requiresAuth: true,
      }
    );

    if (!response?.success) {
      throw response?.response?.data;
    }
    return response?.data;
  };
  // delete Staff
  public deleteStaff = async (id: string) => {
    const response = await this.del<IDeleteStaffResponse>(deleteStaffUrl(id));

    if (!response?.success) {
      throw response?.errorData;
    }
    return response?.data;
  };
  // GET
  public fetchAllStaff = async (searchText?: string, page?: number) => {
    const params = new URLSearchParams();
    if (searchText) params.append("searchText", searchText);
    if (page) params.append("page", page.toString());
    const url = params.toString()
      ? `${fetchAllStaffUrl()}?${params.toString()}`
      : fetchAllStaffUrl();

    const response = await this.get<IAllStaffResponse>(url, {
      requiresAuth: false,
    });

    if (!response?.success) {
      throw response?.errorData;
    }

    return response?.data;
  };

  // GET BY ID
  public getStaffDetails = async () => {
    const response = await this.get<IStaffDetailsResponse[]>(
      getStaffDetailsUrl(),
      { requiresAuth: false }
    );
    if (!response?.success) {
      throw response?.errorData;
    }
    return response?.data;
  };
}

/**
 * This creates a new instance of the class. is th base Axios API client Class
 * wrapper for All User Accounts identity related requests like login, logout,
 * password reset, etc.
 */
export const COMMUNITY_CLIENT = CommunityClient.getClientInstance();
