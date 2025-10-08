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
  email: string;
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
export interface IAllStaffResponse {
  status: boolean;
  message: string;
  success: true;

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

