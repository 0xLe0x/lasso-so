import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../src/api/auth/mutations";
import TextInput from "../src/components/forms/TextInput";
import Form from "../src/components/forms/Form";
import NotificationBox from "../src/components/NotificationBox";
import ReCaptcha from "../src/components/ReCaptcha";
import SubmitButton from "../src/components/forms/SubmitButton";
import AuthLayout from "../src/components/layouts/AuthLayout";

const SignUpPage: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [status, setStatus] = useState<
    { error: boolean; text: string } | undefined
  >();
  const [recaptchaComplete, setRecaptchaComplete] = useState<boolean | undefined>();

  const setError = (text: string) => setStatus({ text, error: true });
  const setSuccess = (text: string) => setStatus({ text, error: false });

  const [createUserMutate, { loading, error: mutationError }] =
    useMutation(CREATE_USER);

  useEffect(() => {
    if (status?.text !== mutationError?.message && mutationError?.message) {
      setError(mutationError.message);
    }
  }, [mutationError, status?.text]);

  const createUser = () => {
    if (recaptchaComplete === undefined) {
      setError("Please verify that you're not a robot.");
    }
    createUserMutate({
      variables: {
        email,
        username,
        password,
      },
    }).then((res) => {
      if (!res.data) {
        setError("Unknown error");
        console.error(res);
        return;
      }

      const errors = res.data.createUser?.errors;
      if (errors) {
        setError(errors.join("\n"));
      }

      if (res.data.createUser?.user && res.data.createUser.success) {
        setSuccess("Account verification email sent! Please check your inbox.");
      }
    });
  };

  const onCaptchaChange = (token: string | null) => {
    if (!token && status?.error !== true) {
      setError("Captcha expired. Please try again.");
    }
    setRecaptchaComplete(true);
  };
  const onCaptchaError = () => setError("");

  return (
    <AuthLayout headerText="Create your Account">
      <Form onSubmit={createUser}>
        <TextInput
          required
          id="email"
          label="Email Address"
          value={email}
          onInput={setEmail}
          className="form-input w-full"
          type="email"
        />
        <TextInput
          required
          id="username"
          label="Username"
          value={username}
          onInput={setUsername}
          className="form-input w-full"
          type="text"
        />

        <TextInput
          required
          id="password"
          type="password"
          label="Password"
          value={password}
          onInput={setPassword}
          className="form-input w-full"
          autoComplete="on"
        />
        <ReCaptcha onChange={onCaptchaChange} onError={onCaptchaError} />
        <SubmitButton loading={loading} buttonText="Sign up" />
      </Form>
      <div className="pt-5 mt-6 border-t border-slate-200">
        <div className="text-sm">
          Already have an account?{" "}
          <Link
            className="font-medium text-indigo-500 hover:text-indigo-600"
            href="/signin"
          >
            Sign In
          </Link>
        </div>
        <NotificationBox notification={status} />
      </div>
    </AuthLayout>
  );
};

export default SignUpPage;
