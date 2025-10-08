interface ILoginWithEmailAndPasswordUrlOptions {
  tenantName: string;
  policyName: string;
}
// TODO: replace with our own urls.
/**
 * Endpoint to be consumed by the user to login with their email and password
 * using the Azure B2C service.
 */
export const getLoginWithEmailAndPasswordToAzureB2CUrl = ({
  tenantName,
  policyName,
}: ILoginWithEmailAndPasswordUrlOptions) =>
  `https://${tenantName}.b2clogin.com/${tenantName}.onmicrosoft.com/oauth2/v2.0/token?p=${policyName}`;

// Auth URL  
// ---------------------------------------------------------------
export const loginUrl = () => "/auth/login";


// Staff URL
export const createStaffUrl = () => "/staff"; //post
export const updateStaffUrl = (id: string) => `/staff/${id}`; //put
export const deleteStaffUrl = (id: string) => `/staff/${id}`; //delete
export const fetchAllStaffUrl = () => "/staff"; //Get
export const getStaffDetailsUrl = () => `/staff`;

// Form URL
export const fetchAllFormUrl = () => "/staff"; //Get
export const createFormUrl = () => "/staff"; //post
export const deleteFormUrl = (id: string) => `/staff/${id}`; //delete
export const getFormDetailsUrl = () => `/staff`;
export const updateFormUrl = (id: string) => `/staff/${id}`; //put










