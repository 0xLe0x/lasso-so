/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * The `BigInt` scalar type represents non-fractional whole numeric values.
   * `BigInt` is not constrained to 32-bit like the `Int` type and thus is a less
   * compatible type.
   */
  BigInt: any;
  /**
   * The `DateTime` scalar type represents a DateTime
   * value as specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  DateTime: any;
  /**
   * The `GenericScalar` scalar type represents a generic
   * GraphQL scalar value that could be:
   * String, Boolean, Int, Float, List or Object.
   */
  GenericScalar: any;
  /**
   * Leverages the internal Python implementation of UUID (uuid.UUID) to provide native UUID objects
   * in fields, resolvers and input.
   */
  UUID: any;
};

export type CreateCreatorFinderTasks = {
  __typename?: 'CreateCreatorFinderTasks';
  errors?: Maybe<Array<Maybe<Scalars['String']>>>;
  success?: Maybe<Scalars['Boolean']>;
  taskIds?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type CreateEmailConnection = {
  __typename?: 'CreateEmailConnection';
  errors?: Maybe<Array<Maybe<Scalars['String']>>>;
  success?: Maybe<Scalars['Boolean']>;
};

export type CreateUser = {
  __typename?: 'CreateUser';
  errors?: Maybe<Array<Maybe<Scalars['String']>>>;
  success?: Maybe<Scalars['Boolean']>;
  user?: Maybe<UserType>;
};

/** An enumeration. */
export enum CreatorsQualifySettingsPlatformChoices {
  /** INSTAGRAM */
  Instagram = 'INSTAGRAM',
  /** TIKTOK */
  Tiktok = 'TIKTOK',
  /** TWITTER */
  Twitter = 'TWITTER',
  /** YOUTUBE */
  Youtube = 'YOUTUBE'
}

export type LoginUser = {
  __typename?: 'LoginUser';
  errors?: Maybe<Array<Maybe<Scalars['String']>>>;
  success?: Maybe<Scalars['Boolean']>;
  user?: Maybe<UserType>;
};

export type LogoutUser = {
  __typename?: 'LogoutUser';
  errors?: Maybe<Array<Maybe<Scalars['String']>>>;
  success?: Maybe<Scalars['Boolean']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createCreatorFinderTasks?: Maybe<CreateCreatorFinderTasks>;
  createEmailConnection?: Maybe<CreateEmailConnection>;
  createUser?: Maybe<CreateUser>;
  loginUser?: Maybe<LoginUser>;
  logoutUser?: Maybe<LogoutUser>;
  passwordReset?: Maybe<PasswordReset>;
  refreshToken?: Maybe<Refresh>;
  sendPasswordResetEmail?: Maybe<SendPasswordResetEmail>;
  /** Obtain JSON Web Token mutation */
  tokenAuth?: Maybe<ObtainJsonWebToken>;
  updateEmailCopy?: Maybe<UpdateEmailCopy>;
  updateQualifySettings?: Maybe<UpdateQualifySettings>;
  verifyToken?: Maybe<Verify>;
  verifyUser?: Maybe<VerifyUser>;
};


export type MutationCreateCreatorFinderTasksArgs = {
  locations?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  platforms?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  urls?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type MutationCreateEmailConnectionArgs = {
  authCode?: InputMaybe<Scalars['String']>;
};


export type MutationCreateUserArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationLoginUserArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationPasswordResetArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationRefreshTokenArgs = {
  refreshToken?: InputMaybe<Scalars['String']>;
};


export type MutationSendPasswordResetEmailArgs = {
  email: Scalars['String'];
};


export type MutationTokenAuthArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationUpdateEmailCopyArgs = {
  message?: InputMaybe<Scalars['String']>;
  subject?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateQualifySettingsArgs = {
  categories?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  followers?: InputMaybe<Scalars['Int']>;
  locations?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  medianNumLikes?: InputMaybe<Scalars['Int']>;
  medianNumViews?: InputMaybe<Scalars['Int']>;
  numPastPostsToAnalyze?: InputMaybe<Scalars['Int']>;
  platform?: InputMaybe<Scalars['String']>;
};


export type MutationVerifyTokenArgs = {
  token?: InputMaybe<Scalars['String']>;
};


export type MutationVerifyUserArgs = {
  token: Scalars['String'];
};

/** Obtain JSON Web Token mutation */
export type ObtainJsonWebToken = {
  __typename?: 'ObtainJSONWebToken';
  payload: Scalars['GenericScalar'];
  refreshExpiresIn: Scalars['Int'];
  refreshToken: Scalars['String'];
  token: Scalars['String'];
};

export type PasswordReset = {
  __typename?: 'PasswordReset';
  errors?: Maybe<Array<Maybe<Scalars['String']>>>;
  success?: Maybe<Scalars['Boolean']>;
};

export type QualifySettingsType = {
  __typename?: 'QualifySettingsType';
  categories?: Maybe<Array<Scalars['String']>>;
  createdAt: Scalars['DateTime'];
  followers?: Maybe<Scalars['BigInt']>;
  locations?: Maybe<Array<Scalars['String']>>;
  medianNumLikes?: Maybe<Scalars['BigInt']>;
  medianNumViews?: Maybe<Scalars['BigInt']>;
  numPastPostsToAnalyze?: Maybe<Scalars['Int']>;
  platform?: Maybe<CreatorsQualifySettingsPlatformChoices>;
  updatedAt: Scalars['DateTime'];
  user: UserType;
};

export type Query = {
  __typename?: 'Query';
  getQualifySettings?: Maybe<QualifySettingsType>;
  isEmailConnected?: Maybe<Scalars['Boolean']>;
  me?: Maybe<UserType>;
  users?: Maybe<Array<Maybe<UserType>>>;
};


export type QueryGetQualifySettingsArgs = {
  platform?: InputMaybe<Scalars['String']>;
};

export type Refresh = {
  __typename?: 'Refresh';
  payload: Scalars['GenericScalar'];
  refreshExpiresIn: Scalars['Int'];
  refreshToken: Scalars['String'];
  token: Scalars['String'];
};

export type SendPasswordResetEmail = {
  __typename?: 'SendPasswordResetEmail';
  errors?: Maybe<Array<Maybe<Scalars['String']>>>;
  success?: Maybe<Scalars['Boolean']>;
};

export type UpdateEmailCopy = {
  __typename?: 'UpdateEmailCopy';
  errors?: Maybe<Array<Maybe<Scalars['String']>>>;
  success?: Maybe<Scalars['Boolean']>;
};

export type UpdateQualifySettings = {
  __typename?: 'UpdateQualifySettings';
  errors?: Maybe<Array<Maybe<Scalars['String']>>>;
  qualifySettings?: Maybe<QualifySettingsType>;
  success?: Maybe<Scalars['Boolean']>;
};

export type UserType = {
  __typename?: 'UserType';
  dateJoined: Scalars['DateTime'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['ID'];
  /** Designates whether this user should be treated as active. Unselect this instead of deleting accounts. */
  isActive: Scalars['Boolean'];
  /** Designates whether the user can log into this admin site. */
  isStaff: Scalars['Boolean'];
  /** Designates that this user has all permissions without explicitly assigning them. */
  isSuperuser: Scalars['Boolean'];
  isVerified: Scalars['Boolean'];
  lastLogin?: Maybe<Scalars['DateTime']>;
  lastName: Scalars['String'];
  password: Scalars['String'];
  qualifyResultsSpreadsheetId?: Maybe<Scalars['String']>;
  qualifysettingsSet: Array<QualifySettingsType>;
  /** Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only. */
  username: Scalars['String'];
  uuid: Scalars['UUID'];
};

export type Verify = {
  __typename?: 'Verify';
  payload: Scalars['GenericScalar'];
};

export type VerifyUser = {
  __typename?: 'VerifyUser';
  errors?: Maybe<Array<Maybe<Scalars['String']>>>;
  success?: Maybe<Scalars['Boolean']>;
};

export type RefreshTokenMutationVariables = Exact<{
  refreshToken: Scalars['String'];
}>;


export type RefreshTokenMutation = { __typename?: 'Mutation', refreshToken?: { __typename?: 'Refresh', token: string, payload: any, refreshToken: string, refreshExpiresIn: number } | null };

export type TokenAuthMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type TokenAuthMutation = { __typename?: 'Mutation', tokenAuth?: { __typename?: 'ObtainJSONWebToken', token: string, refreshToken: string, payload: any } | null };

export type LoginUserMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginUserMutation = { __typename?: 'Mutation', loginUser?: { __typename?: 'LoginUser', success?: boolean | null, errors?: Array<string | null> | null, user?: { __typename?: 'UserType', username: string, email: string, isVerified: boolean } | null } | null };

export type LogoutUserMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutUserMutation = { __typename?: 'Mutation', logoutUser?: { __typename?: 'LogoutUser', success?: boolean | null, errors?: Array<string | null> | null } | null };

export type CreateUserMutationVariables = Exact<{
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser?: { __typename?: 'CreateUser', success?: boolean | null, errors?: Array<string | null> | null, user?: { __typename?: 'UserType', username: string, email: string, isVerified: boolean } | null } | null };

export type VerifyUserMutationVariables = Exact<{
  verification_token: Scalars['String'];
}>;


export type VerifyUserMutation = { __typename?: 'Mutation', verifyUser?: { __typename?: 'VerifyUser', success?: boolean | null, errors?: Array<string | null> | null } | null };

export type SendResetPasswordEmailMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type SendResetPasswordEmailMutation = { __typename?: 'Mutation', sendPasswordResetEmail?: { __typename?: 'SendPasswordResetEmail', success?: boolean | null, errors?: Array<string | null> | null } | null };

export type ResetPasswordMutationVariables = Exact<{
  reset_token: Scalars['String'];
  password: Scalars['String'];
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', passwordReset?: { __typename?: 'PasswordReset', success?: boolean | null, errors?: Array<string | null> | null } | null };

export type EmailAuthMutationVariables = Exact<{
  auth_code: Scalars['String'];
}>;


export type EmailAuthMutation = { __typename?: 'Mutation', createEmailConnection?: { __typename?: 'CreateEmailConnection', success?: boolean | null, errors?: Array<string | null> | null } | null };

export type UpdateEmailCopyMutationVariables = Exact<{
  subject: Scalars['String'];
  message: Scalars['String'];
}>;


export type UpdateEmailCopyMutation = { __typename?: 'Mutation', updateEmailCopy?: { __typename?: 'UpdateEmailCopy', success?: boolean | null, errors?: Array<string | null> | null } | null };

export type IsEmailConnectedQueryVariables = Exact<{ [key: string]: never; }>;


export type IsEmailConnectedQuery = { __typename?: 'Query', isEmailConnected?: boolean | null };


export const RefreshTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RefreshToken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"refreshToken"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"refreshToken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"refreshToken"},"value":{"kind":"Variable","name":{"kind":"Name","value":"refreshToken"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"payload"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshExpiresIn"}}]}}]}}]} as unknown as DocumentNode<RefreshTokenMutation, RefreshTokenMutationVariables>;
export const TokenAuthDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"TokenAuth"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tokenAuth"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}},{"kind":"Field","name":{"kind":"Name","value":"payload"}}]}}]}}]} as unknown as DocumentNode<TokenAuthMutation, TokenAuthMutationVariables>;
export const LoginUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LoginUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loginUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"isVerified"}}]}},{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"errors"}}]}}]}}]} as unknown as DocumentNode<LoginUserMutation, LoginUserMutationVariables>;
export const LogoutUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LogoutUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logoutUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"errors"}}]}}]}}]} as unknown as DocumentNode<LogoutUserMutation, LogoutUserMutationVariables>;
export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"isVerified"}}]}},{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"errors"}}]}}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const VerifyUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VerifyUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"verification_token"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"token"},"value":{"kind":"Variable","name":{"kind":"Name","value":"verification_token"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"errors"}}]}}]}}]} as unknown as DocumentNode<VerifyUserMutation, VerifyUserMutationVariables>;
export const SendResetPasswordEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SendResetPasswordEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendPasswordResetEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"errors"}}]}}]}}]} as unknown as DocumentNode<SendResetPasswordEmailMutation, SendResetPasswordEmailMutationVariables>;
export const ResetPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ResetPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"reset_token"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"passwordReset"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"token"},"value":{"kind":"Variable","name":{"kind":"Name","value":"reset_token"}}},{"kind":"Argument","name":{"kind":"Name","value":"newPassword"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"errors"}}]}}]}}]} as unknown as DocumentNode<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const EmailAuthDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EmailAuth"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"auth_code"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createEmailConnection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"authCode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"auth_code"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"errors"}}]}}]}}]} as unknown as DocumentNode<EmailAuthMutation, EmailAuthMutationVariables>;
export const UpdateEmailCopyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateEmailCopy"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"subject"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"message"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateEmailCopy"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subject"},"value":{"kind":"Variable","name":{"kind":"Name","value":"subject"}}},{"kind":"Argument","name":{"kind":"Name","value":"message"},"value":{"kind":"Variable","name":{"kind":"Name","value":"message"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"errors"}}]}}]}}]} as unknown as DocumentNode<UpdateEmailCopyMutation, UpdateEmailCopyMutationVariables>;
export const IsEmailConnectedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"IsEmailConnected"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isEmailConnected"}}]}}]} as unknown as DocumentNode<IsEmailConnectedQuery, IsEmailConnectedQueryVariables>;