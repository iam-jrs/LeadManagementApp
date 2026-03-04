export interface LoginFormValues {
  email: string;
  otp: string;
  rememberMe?: boolean;
}

export interface AuthResponse {
  token: string;
}
