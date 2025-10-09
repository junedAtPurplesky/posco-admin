// Auth Type
// ------------------------------------
export interface IRoleData {
  id: string;
  role: string;
  permissions: string[];
  deleted: boolean;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface IUser {
  id: string;
  created_at: string;
  updated_at: string;
  role: IRoleData;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  role_id: string;
  dob: string;
}
export interface ILoginUserResponseData {
  access_token: string;
  refresh_token: string;
  user: IUser;
}

export interface ILoginUserResponse {
  message?: string;
  status: string;
  data: ILoginUserResponseData;
}

export interface ILoginPayload {
  identifier: string;
  password: string;
}

// Staff
// POST
export interface ICreateStaffPayload {
  name: string;
}

export interface ICreateStaffResponse {
  status: boolean;
  message: string;
  success: true;
  data: ICreateStaffPayload;
}

// PUT
export interface IUpdateStaffPayload {
  id: string;
  payload: ICreateStaffPayload;
}

export interface IUpdateStaffResponse {
  status: boolean;
  message: string;
  success: true;
  data: IUpdateStaffPayload;
}

// Delete Staff
export interface IDeleteStaffResponse {
  status: boolean;
  message: string;
  success: true;
  data: ICreateStaffPayload;
}

// GET
export interface IAllStaffList {
  status: boolean;
}
export interface IAllStaffResponse {
  status: boolean;
  message: string;
  success: true;
  data: IAllStaffList[];
}

// GET BY ID
export interface IStaffDetails {
  id: string;
}

export interface IStaffDetailsResponse {
  status: boolean;
  message: string;
  success: true;
  data: IStaffDetails;
}

// Form
// GET
export interface IAllFormList {
  status: boolean;
}

export interface IAllFormResponse {
  status: boolean;
  message: string;
  success: true;
  data: IAllFormList[];
}
// POST
export interface ICreateFormPayload {
  name: string;
}

export interface ICreateFormResponse {
  status: boolean;
  message: string;
  success: true;
  data: ICreateFormPayload;
}
// Delete Form
export interface IDeleteFormResponse {
  status: boolean;
  message: string;
  success: true;
  data: ICreateFormPayload;
}

export interface IFormDetails {
  id: string;
}

export interface IFormDetailsResponse {
  status: boolean;
  message: string;
  success: true;
  data: IFormDetails;
}

// PUT
export interface IUpdateFormPayload {
  id: string;
  payload: ICreateFormPayload;
}

export interface IUpdateFormResponse {
  status: boolean;
  message: string;
  success: true;
  data: IUpdateFormPayload;
}

export interface IChartResponse {
  status: boolean;
  message: string;
  success: true;
  data: {
    emergency_exits: number;
    equipment_safety: number;
    fire_safety: number;
    general_safety: number;
  };
}


 export interface ISafetyComplianceChartResponse {
  status: boolean;
  message: string;
  success: true;
  data: {
    compliant: number;
    non_compliant: number;
  };
}

  // dashboard stats

  export interface IStatsResponse {
  status: boolean;
  message: string;
  success: true;
  data:{
    dailySafetyFormsReceived: number,
    nonCompliantReports: number,
    staffParticipationRate: number
  }
}
  