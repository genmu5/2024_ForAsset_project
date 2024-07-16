import { apiClient } from "./ApiClient";

export const executeCheckEmailService = (emailCheckRequestDto) =>
    apiClient.post(`/api/v1/auth/check-email`, emailCheckRequestDto);

export const executeSendCertificationNumber = (emailCertificationRequestDto) =>
    apiClient.post(`/api/v1/auth/send-certification-email`, emailCertificationRequestDto);

export const executeCheckCertificationNumber = (certificationCheckRequestDto) =>
    apiClient.post(`/api/v1/auth/check-certification-number`, certificationCheckRequestDto);

export const executeSignUpMember = (signUpRequestDto) =>
    apiClient.post(`/api/v1/auth/sign-up`, signUpRequestDto);

export const executeSignIn = (signInRequestDto) =>
    apiClient.post(`/api/v1/auth/sign-in`, signInRequestDto);


