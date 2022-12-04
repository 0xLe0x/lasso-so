import React, { useCallback, useState } from "react";
import { useMutation } from "@apollo/client";
import Form from "../../src/components/forms/Form";
import NotificationBox from "../../src/components/NotificationBox";
import { SEND_RESET_PASSWORD_EMAIL } from "../../src/api/auth/mutations";
import TextInput from "../../src/components/forms/TextInput";
import SubmitButton from "../../src/components/forms/SubmitButton";
import AuthLayout from "../../src/components/layouts/AuthLayout";
import useFormStatus from "../../src/hooks/useFormStatus";

const ResetPassword: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const { setError, setSuccess, status } = useFormStatus();
  const [mutateRequestPasswordReset, { loading }] = useMutation(
    SEND_RESET_PASSWORD_EMAIL
  );

  // FIXME: Non-existing email does not return correct error message from BE
  // FIXME: When above is implemented, a re-captcha should be dropped here as well,
  //        since we can effecively scan the DB for registered emails
  const sendResetPasswordRequest = useCallback(() => {
    mutateRequestPasswordReset({
      variables: {
        email,
      },
    })
      .then((res) => {
        if (res.data?.sendPasswordResetEmail?.success) {
          setSuccess("Password reset email sent! Please check your inbox.");
          return;
        }
        const errorMessage = res.data?.sendPasswordResetEmail?.errors?.[0];
        if (errorMessage) {
          setError(errorMessage);
          return;
        }
      })
      .catch(() =>
        setError("Couldn't process your request. Did you enter a correct email?")
      );
  }, [email, mutateRequestPasswordReset, setError, setSuccess]);

  return (
    <AuthLayout headerText="Reset your password">
      <Form onSubmit={sendResetPasswordRequest}>
        <TextInput
          required
          label="Email Address"
          id="email"
          value={email}
          onInput={setEmail}
          className="form-input w-full"
          type="email"
        />
        <div className="flex justify-end mt-6">
          <SubmitButton loading={loading} buttonText="Send Reset Link" />
        </div>
      </Form>
      <div className="pt-5 mt-6 border-t border-slate-200">
        <NotificationBox notification={status} />
      </div>
    </AuthLayout>
  );
};

export default ResetPassword;
