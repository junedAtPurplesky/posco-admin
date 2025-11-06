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
  employee_id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number?: string;
  password: string;
  department_id?: string;
  user_role: "admin";
  status: "active";
}
export interface ICreatedStaffData {
  id: string;
  employee_id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  status: string;
  role: IRoleItem;
  department: IDepartmentItem;
  deleted: boolean;
  deleted_at: string | null;
  profile_picture: string | null;
  dob: string | null;
  otp: string | null;
  otpExpiresAt: string | null;
  created_at: string;
  updated_at: string;
  isOtpVerified: boolean;
}

export interface ICreateStaffResponse {
  status: string;
  message: string;
  data: ICreatedStaffData;
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

export interface IUpdateStaffStatusPayload {
  id: string;
  payload: {
    status: "active" | "inactive";
  };
}

export interface IStaffStatusData {
  id: string;
  created_at: string;
  updated_at: string;
  deleted: boolean;
  deleted_at: string | null;
  employee_id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  profile_picture: string | null;
  status: string;
  dob: string | null;
  otp: string | null;
  otpExpiresAt: string | null;
  isOtpVerified: boolean;
  role: IRoleItem;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  department: any;
}

export interface IUpdateStaffStatusResponse {
  status: string;
  message: string;
  data: IStaffStatusData;
}
// Delete Staff
export interface IDeleteStaffResponse {
  status: boolean;
  message: string;
  success: true;
  data: ICreateStaffPayload;
}

// GET
export interface IRoleItem {
  id: string;
  created_at: string;
  updated_at: string;
  deleted: boolean;
  deleted_at: string | null;
  role: string;
  permissions: string[];
}

export interface IStaffItem {
  id: string;
  created_at: string;
  updated_at: string;
  deleted: boolean;
  deleted_at: string | null;
  employee_id: string | null;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string | null;
  profile_picture: string | null;
  status: string;
  dob: string | null;
  otp: string | null;
  otpExpiresAt: string | null;
  isOtpVerified: boolean;
  password: string;
  role: IRoleItem;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  department: any;
}

export interface IPagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface IAllStaffResponse {
  status: string;
  data: IStaffItem[];
  pagination: IPagination;
}
// GET BY ID
export interface IStaffDetails {
  id: string;
  payload: ICreateStaffPayload;
}

export interface IStaffDetailsResponse {
  status: boolean;
  message: string;
  success: true;
  data: IStaffDetails;
}

// form.types.ts

export enum FieldType {
  CHECKBOX = "checkbox",
  RADIO = "radio",
  TEXT = "text",
  TEXTAREA = "textarea",
  DROPDOWN = "dropdown",
  RATING = "rating",
  PHOTO = "photo",
  SIGNATURE = "signature",
}

export enum SafetyCategory {
  GENERAL_SAFETY = "general_safety",
  EMERGENCY_EXITS = "emergency_exits",
  FIRE_SAFETY = "fire_safety",
  EQUIPMENT_SAFETY = "equipment_safety",
}

// Single Form Field
export interface IFormField {
  field_label: string;
  field_type: FieldType;
  category: SafetyCategory;
  field_description?: string;
  is_required: boolean;
  order: number;
  options?: string[];
}

// Create Form Payload (POST)
export interface ICreateFormPayload {
  form_name: string;
  description?: string;
  department_id?: string; // Added department_id
  due_date: string | Date;
  fields: IFormField[];
}

// Form Field Interface
export interface IFormField {
  field_type: FieldType;
  field_label: string;
  field_description?: string; // Added field_description
  is_required: boolean;
  options?: string[]; // Added options array
  category: SafetyCategory;
  order: number;
  validation_rules?: { // Added validation_rules
    minLength?: number;
    maxLength?: number;
    minValue?: number;
    maxValue?: number;
    pattern?: string;
  };
}

// Create Form Response
export interface ICreateFormResponse {
  status: boolean;
  message: string;
  success: boolean;
  data: {
    id: string;
    form_id: string;
    form_name: string;
    description: string;
    due_date: string;
  };
}

// Fetch All Forms
export interface IAllFormList {
  id: string;
  form_id: string;
  form_name: string;
  description?: string;
  status: string;
  due_date?: string;
  created_at?: string;
}

export interface IAllFormResponse {
  status: boolean;
  message: string;
  success: boolean;
  data: IAllFormList[];
}

// Delete Form
export interface IDeleteFormResponse {
  status: boolean;
  message: string;
  success: boolean;
}

// Form Details
export interface IFormDetails {
  id: string;
  form_name: string;
  description?: string;
  due_date: string;
  fields: IFormField[];
}

export interface IFormDetailsResponse {
  status: boolean;
  message: string;
  success: boolean;
  data: IFormDetails;
}

// Update Form
export interface IUpdateFormPayload {
  id: string;
  payload: Partial<ICreateFormPayload>;
}

export interface IUpdateFormResponse {
  status: boolean;
  message: string;
  success: boolean;
  data: IFormDetails;
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
  data: {
    dailySafetyFormsReceived: number;
    nonCompliantReports: number;
    staffParticipationRate: number;
    userAssignments: IStatsResponseRaw;
  };
}

export interface IStatsResponseRaw {
    total_Assignments: number;
}

// get all department
export interface IAllDepartmentResponse {
  status: boolean;
  data: IDepartmentItem[];
}

export interface IDepartmentItem {
  id: string;
  created_at: string;
  updated_at: string;
  deleted: boolean;
  deleted_at: string | null;
  name: string;
  description: string;
  status: string;
}

// All role
export interface IAllRoleResponse {
  status: boolean;
  data: {
    list: IRoleItem[];
    pagination: {
      data: IRoleItem[];
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
}

export interface IRoleItem {
  id: string;
  created_at: string;
  updated_at: string;
  deleted: boolean;
  deleted_at: string | null;
  role: string;
  permissions: string[];
}

export interface IStaffItem {
  department_id: string;
  staff_ids: string[];
  due_date: string;
}

export interface ISubmissionPagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface IAllSubmissionsResponse {
  status: string;
  data: ISubmission[];
  pagination: Pagination;
}

export interface ISubmission {
  id: string;
  submission_id: string;
  form_id: string;
  form_name: string;
  staff_name: string;
  staff_id: string;
  employee_id: string;
  submission_date: string; 
  department: string;
  compliance_score: string;
  status: string;
  notes: string;
}

interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface IUpdateFormStatusPayload {
  id: string;
  payload: {
    status: "active" | "inactive";
  };
}
export interface IUpdateFormStatusResponse {
  status: string;
  message: string;
  data: IFormData;
}

export interface IFormData {
  id: string;
  created_at: string;
  updated_at: string;
  deleted: boolean;
  deleted_at: string | null;
  form_id: string;
  form_name: string;
  description: string;
  due_date: string;
  status: string;
  is_recurring: boolean;
  recurrence_pattern: string | null;
  fields: IFormField[];
  department: IDepartment;
  created_by: IUser;
}

export interface IFormField {
  field_label: string;
  field_type: FieldType;
  category: SafetyCategory;
  is_required: boolean;
  order: number;
  options?: string[];
  field_description?: string;
}

export interface IDepartment {
  id: string;
  created_at: string;
  updated_at: string;
  deleted: boolean;
  deleted_at: string | null;
  name: string;
  description: string;
  status: string;
}

export interface IUser {
  id: string;
  created_at: string;
  updated_at: string;
  deleted: boolean;
  deleted_at: string | null;
  employee_id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  profile_picture: string | null;
  status: string;
  dob: string ;
  otp: string | null;
  otpExpiresAt: string | null;
  isOtpVerified: boolean;
  password: string;
}

//
// Add these to your interfaces file
export interface ICreateAssignFormPayload {
  // department_id: string;
  staff_ids: string[];
  due_date: string;
}

export interface ICreateAssignFormResponse {
  status: string;
  message: string;
  assignments_created: number;
}

export interface IAssignFormData {
  department_id: string;
  staff_ids: string[];
  due_date: string;
}