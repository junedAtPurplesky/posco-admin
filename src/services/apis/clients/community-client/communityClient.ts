import { IApiError } from "@/utils";
import { ApiClient } from "../../api-client";
import {
  createFormUrl,
  createStaffUrl,
  deleteFormUrl,
  deleteStaffUrl,
  fetchAdminDashboardStatsUrl,
  fetchAllDepartmentUrl,
  fetchAllFormUrl,
  fetchAllRoleUrl,
  fetchAllStaffUrl,
  fetchAllSubmissionUrl,
  fetchComplianceOverviewUrl,
  fetchIssueDistributionUrl,
  fetchRecentSubmissionsUrl,
  getFormDetailsUrl,
  getStaffDetailsUrl,
  loginUrl,
  updateFormUrl,
  updateStaffStatusUrl,
  updateStaffUrl,
} from "./urls";
import {
  IAllDepartmentResponse,
  IAllFormResponse,
  IAllRoleResponse,
  IAllStaffResponse,
  IAllSubmissionsResponse,
  IChartResponse,
  ICreateFormPayload,
  ICreateFormResponse,
  ICreateStaffPayload,
  ICreateStaffResponse,
  IDeleteFormResponse,
  IDeleteStaffResponse,
  IFormDetailsResponse,
  ILoginPayload,
  ILoginUserResponse,
  ISafetyComplianceChartResponse,
  IStaffDetailsResponse,
  IStatsResponse,
  IUpdateFormPayload,
  IUpdateFormResponse,
  IUpdateStaffPayload,
  IUpdateStaffResponse,
  IUpdateStaffStatusPayload,
  IUpdateStaffStatusResponse,
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


    // Update
  public updateStaffStatus = async ({ id, payload }: IUpdateStaffStatusPayload) => {
    const response = await this.put<IUpdateStaffStatusResponse>(
      updateStaffStatusUrl(id),
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

  // Form

  // GET
  public fetchAllForm = async (searchText?: string, page?: number) => {
    const params = new URLSearchParams();
    if (searchText) params.append("searchText", searchText);
    if (page) params.append("page", page.toString());
    const url = params.toString()
      ? `${fetchAllFormUrl()}?${params.toString()}`
      : fetchAllFormUrl();

    const response = await this.get<IAllFormResponse>(url, {
      requiresAuth: false,
    });

    if (!response?.success) {
      throw response?.response?.data;
    }

    return response?.data;
  };

  // create Form
  public createForm = async (payload: ICreateFormPayload) => {
    const response = await this.post<ICreateFormResponse>(
      createFormUrl(),
      payload
    );

    if (!response?.success) {
      throw response?.response?.data;
    }

    return response?.data;
  };

  // delete Form
  public deleteForm = async (id: string) => {
    const response = await this.del<IDeleteFormResponse>(deleteFormUrl(id));

    if (!response?.success) {
      throw response?.response?.data;
    }
    return response?.data;
  };
  // GET BY ID
  public getFormDetails = async () => {
    const response = await this.get<IFormDetailsResponse[]>(
      getFormDetailsUrl(),
      { requiresAuth: false }
    );
    if (!response?.success) {
      throw response?.errorData;
    }
    return response?.data;
  };
  // Update
  public updateForm = async ({ id, payload }: IUpdateFormPayload) => {
    const response = await this.put<IUpdateFormResponse>(
      updateFormUrl(id),
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

  // issue chart
  public fetchIssueDistribution = async () => {
    const url = fetchIssueDistributionUrl();

    const response = await this.get<IChartResponse>(url, {
      requiresAuth: false,
    });

    if (!response?.success) {
      throw response?.errorData;
    }

    return response?.data;
  };

  // safety compliance chart
  public fetchSafetyCompliance = async () => {
    const url = fetchComplianceOverviewUrl();

    const response = await this.get<ISafetyComplianceChartResponse>(url, {
      requiresAuth: false,
    });

    if (!response?.success) {
      throw response?.errorData;
    }

    return response?.data;
  };
  public fetchDashboardStats = async () => {
    const url = fetchAdminDashboardStatsUrl();

    const response = await this.get<IStatsResponse>(url, {
      requiresAuth: true,
    });

    if (!response?.success) {
      throw response?.errorData;
    }

    return response?.data;
  };

  public fetchAllRecentSubmission = async () => {
    const url = fetchRecentSubmissionsUrl();

    const response = await this.get<IAllSubmissionsResponse>(url, {
      requiresAuth: true,
    });

    if (!response?.success) {
      throw response?.errorData;
    }

    return response?.data;
  };

  // get all
  public fetchAllDepartment = async () => {
    const url = fetchAllDepartmentUrl();

    const response = await this.get<IAllDepartmentResponse>(url, {
      requiresAuth: true,
    });

    if (!response?.success) {
      throw response?.errorData;
    }

    return response?.data;
  };
  public fetchAllRole = async () => {
    const url = fetchAllRoleUrl();

    const response = await this.get<IAllRoleResponse>(url, {
      requiresAuth: true,
    });

    if (!response?.success) {
      throw response?.errorData;
    }

    return response?.data;
  };
    // GET
  public fetchAllSubmission = async (searchText?: string, page?: number) => {
    const params = new URLSearchParams();
    if (searchText) params.append("searchText", searchText);
    if (page) params.append("page", page.toString());
    const url = params.toString()
      ? `${fetchAllSubmissionUrl()}?${params.toString()}`
      : fetchAllSubmissionUrl();

    const response = await this.get<IAllSubmissionsResponse>(url, {
      requiresAuth: false,
    });

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
