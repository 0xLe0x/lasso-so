import { gql } from "../../__generated__";

export const TOKEN_AUTH_REQUEST = gql(`
  mutation TokenAuth($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
      refreshToken
      payload
    }
  }`);

export const LOGOUT_USER = gql(`
  mutation LogoutUser {
    logoutUser {
      success
      errors
    }
  }
`);

export const CREATE_USER = gql(`
  mutation CreateUser($email: String!, $username: String!, $password: String!) {
    createUser(email: $email, username: $username, password: $password) {
      user {
        username
        email
        isVerified
      }
      success
      errors
    }
  }
`);

export const VERIFY_USER = gql(`
  mutation VerifyUser($verification_token: String!) {
    verifyUser(token: $verification_token) {
      success
      errors
    }
  }
`);

export const SEND_RESET_PASSWORD_EMAIL = gql(`
  mutation SendResetPasswordEmail($email: String!) {
    sendPasswordResetEmail(email: $email) {
      success
      errors
    }
  }
`);

export const RESET_PASSWORD = gql(`
  mutation ResetPassword($reset_token: String!, $password: String!) {
    passwordReset(token: $reset_token, newPassword: $password) {
      success
      errors
    }
  }
`);
