import React, { useCallback, useState } from "react";
import Link from "next/link";
import TextInput from "../src/components/forms/TextInput";
import NotificationBox from "../src/components/NotificationBox";
import { useMutation } from "@apollo/client";
import { TOKEN_AUTH_REQUEST } from "../src/api/auth/mutations";
import Form from "../src/components/forms/Form";
import useCookie from "react-use-cookie";
import { useRouter } from "next/router";
import SubmitButton from "../src/components/forms/SubmitButton";
import AuthLayout from "../src/components/layouts/AuthLayout";
import useFormStatus from "../src/hooks/useFormStatus";

const SignInPage: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { setError, status } = useFormStatus();
  const [requestToken, { loading }] = useMutation(TOKEN_AUTH_REQUEST);

  const [_authToken, setAuthToken] = useCookie("authToken");
  const [_refreshToken, setRefreshToken] = useCookie("refreshToken");

  const signIn = useCallback(() => {
    requestToken({ variables: { username, password } })
      .then((res) => {
        const response = res.data?.tokenAuth;
        if (response) {
          setAuthToken(response.token);
          setRefreshToken(response.refreshToken);
          router.push("/");
        }
        if (res.errors) {
          setError(res.errors[0].message);
        }
      })
      .catch((err) => setError(err.message));
  }, [
    password,
    username,
    requestToken,
    router,
    setAuthToken,
    setError,
    setRefreshToken,
  ]);

  return (
    <AuthLayout headerText="Welcome Back!">
      <Form onSubmit={signIn}>
        <TextInput
          required
          id="username"
          label="Username"
          value={username}
          onInput={setUsername}
          className="form-input w-full"
          type="username"
        />
        <TextInput
          required
          label="Password"
          id="password"
          value={password}
          onInput={setPassword}
          className="form-input w-full"
          type="password"
          autoComplete="on"
        />
        <div className="flex items-center justify-between mt-6">
          <div className="mr-1">
            <Link
              className="text-sm underline hover:no-underline"
              href="/reset-password"
            >
              Forgot Password?
            </Link>
          </div>
          <div className="flex justify-end mt-6">
            <SubmitButton loading={loading} buttonText="Sign in" />
          </div>
        </div>
      </Form>
      <div className="pt-5 mt-6 border-t border-slate-200">
        <div className="text-sm">
          Don’t have an account?{" "}
          <Link
            className="font-medium text-indigo-500 hover:text-indigo-600"
            href="/signup"
          >
            Sign Up
          </Link>
        </div>
        <NotificationBox notification={status} />
      </div>
    </AuthLayout>
  );
};

export default SignInPage;
