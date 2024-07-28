export interface ForgotPasswordViewModel {
    tenant: string;
    email: string;
}

export interface ForgotPasswordProps {
    initialTenant?: string;
    initialEmail?: string;
}


export interface ResetPasswordViewModel {
    password: string;
    confirmPassword: string;
}

export interface ResetPasswordProps {
    initialPassword?: string;
    initialConfirmPassword?: string;
}

export interface ChangePasswordViewModel {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirmation: string;
}

export interface ChangePasswordProps {
  initialCurrentPassword?: string;
  initialNewPassword?: string;
  initialNewPasswordConfirmation?: string;
}

