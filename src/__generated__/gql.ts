/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "\n  mutation RefreshToken($refreshToken: String!) {\n    refreshToken(refreshToken: $refreshToken) {\n      token\n      payload\n      refreshToken\n      refreshExpiresIn\n    }\n  }": types.RefreshTokenDocument,
    "\n  mutation TokenAuth($username: String!, $password: String!) {\n    tokenAuth(username: $username, password: $password) {\n      token\n      refreshToken\n      payload\n    }\n  }": types.TokenAuthDocument,
    "\n  mutation LoginUser($username: String!, $password: String!) {\n    loginUser(username: $username, password: $password) {\n      user {\n        username\n        email\n        isVerified\n      }\n      success\n      errors\n    }\n  }\n": types.LoginUserDocument,
    "\n  mutation LogoutUser {\n    logoutUser {\n      success\n      errors\n    }\n  }\n": types.LogoutUserDocument,
    "\n  mutation CreateUser($email: String!, $username: String!, $password: String!) {\n    createUser(email: $email, username: $username, password: $password) {\n      user {\n        username\n        email\n        isVerified\n      }\n      success\n      errors\n    }\n  }\n": types.CreateUserDocument,
    "\n  mutation VerifyUser($verification_token: String!) {\n    verifyUser(token: $verification_token) {\n      success\n      errors\n    }\n  }\n": types.VerifyUserDocument,
    "\n  mutation SendResetPasswordEmail($email: String!) {\n    sendPasswordResetEmail(email: $email) {\n      success\n      errors\n    }\n  }\n": types.SendResetPasswordEmailDocument,
    "\n  mutation ResetPassword($reset_token: String!, $password: String!) {\n    passwordReset(token: $reset_token, newPassword: $password) {\n      success\n      errors\n    }\n  }\n": types.ResetPasswordDocument,
    "\n  mutation EmailAuth($auth_code: String!) {\n    createEmailConnection(authCode: $auth_code) {\n      success\n      errors\n    }\n  }\n": types.EmailAuthDocument,
    "\n  mutation UpdateEmailCopy($subject: String!, $message: String!) {\n    updateEmailCopy(subject: $subject, message: $message) {\n      success\n      errors\n    }\n  }\n": types.UpdateEmailCopyDocument,
    "\n  query IsEmailConnected {\n    isEmailConnected\n  }\n": types.IsEmailConnectedDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation RefreshToken($refreshToken: String!) {\n    refreshToken(refreshToken: $refreshToken) {\n      token\n      payload\n      refreshToken\n      refreshExpiresIn\n    }\n  }"): (typeof documents)["\n  mutation RefreshToken($refreshToken: String!) {\n    refreshToken(refreshToken: $refreshToken) {\n      token\n      payload\n      refreshToken\n      refreshExpiresIn\n    }\n  }"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation TokenAuth($username: String!, $password: String!) {\n    tokenAuth(username: $username, password: $password) {\n      token\n      refreshToken\n      payload\n    }\n  }"): (typeof documents)["\n  mutation TokenAuth($username: String!, $password: String!) {\n    tokenAuth(username: $username, password: $password) {\n      token\n      refreshToken\n      payload\n    }\n  }"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation LoginUser($username: String!, $password: String!) {\n    loginUser(username: $username, password: $password) {\n      user {\n        username\n        email\n        isVerified\n      }\n      success\n      errors\n    }\n  }\n"): (typeof documents)["\n  mutation LoginUser($username: String!, $password: String!) {\n    loginUser(username: $username, password: $password) {\n      user {\n        username\n        email\n        isVerified\n      }\n      success\n      errors\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation LogoutUser {\n    logoutUser {\n      success\n      errors\n    }\n  }\n"): (typeof documents)["\n  mutation LogoutUser {\n    logoutUser {\n      success\n      errors\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateUser($email: String!, $username: String!, $password: String!) {\n    createUser(email: $email, username: $username, password: $password) {\n      user {\n        username\n        email\n        isVerified\n      }\n      success\n      errors\n    }\n  }\n"): (typeof documents)["\n  mutation CreateUser($email: String!, $username: String!, $password: String!) {\n    createUser(email: $email, username: $username, password: $password) {\n      user {\n        username\n        email\n        isVerified\n      }\n      success\n      errors\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation VerifyUser($verification_token: String!) {\n    verifyUser(token: $verification_token) {\n      success\n      errors\n    }\n  }\n"): (typeof documents)["\n  mutation VerifyUser($verification_token: String!) {\n    verifyUser(token: $verification_token) {\n      success\n      errors\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation SendResetPasswordEmail($email: String!) {\n    sendPasswordResetEmail(email: $email) {\n      success\n      errors\n    }\n  }\n"): (typeof documents)["\n  mutation SendResetPasswordEmail($email: String!) {\n    sendPasswordResetEmail(email: $email) {\n      success\n      errors\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation ResetPassword($reset_token: String!, $password: String!) {\n    passwordReset(token: $reset_token, newPassword: $password) {\n      success\n      errors\n    }\n  }\n"): (typeof documents)["\n  mutation ResetPassword($reset_token: String!, $password: String!) {\n    passwordReset(token: $reset_token, newPassword: $password) {\n      success\n      errors\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation EmailAuth($auth_code: String!) {\n    createEmailConnection(authCode: $auth_code) {\n      success\n      errors\n    }\n  }\n"): (typeof documents)["\n  mutation EmailAuth($auth_code: String!) {\n    createEmailConnection(authCode: $auth_code) {\n      success\n      errors\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateEmailCopy($subject: String!, $message: String!) {\n    updateEmailCopy(subject: $subject, message: $message) {\n      success\n      errors\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateEmailCopy($subject: String!, $message: String!) {\n    updateEmailCopy(subject: $subject, message: $message) {\n      success\n      errors\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query IsEmailConnected {\n    isEmailConnected\n  }\n"): (typeof documents)["\n  query IsEmailConnected {\n    isEmailConnected\n  }\n"];

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
**/
export function gql(source: string): unknown;

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;