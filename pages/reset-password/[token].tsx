import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import Form from "../../src/components/forms/Form";
import NotificationBox from "../../src/components/NotificationBox";
import { RESET_PASSWORD } from "../../src/api/auth/mutations";
import TextInput from "../../src/components/forms/TextInput";
import { useRouter } from "next/router";
import SubmitButton from "../../src/components/forms/SubmitButton";
import AuthLayout from "../../src/components/layouts/AuthLayout";
import useFormStatus from "../../src/hooks/useFormStatus";

const ResetPassword: React.FC = () => {
  const router = useRouter();
  const token = router.query.token;

  const [newPassword1, setNewPassword1] = useState("");
  const [newPassword2, setNewPassword2] = useState("");

  const [mutateRequestPasswordReset, { loading }] = useMutation(RESET_PASSWORD);

  const { setError, setSuccess, status } = useFormStatus();

  const sendResetPasswordRequest = () => {
    if (typeof token !== "string") {
      setError("Broken reset password link.");
      return;
    }

    if (newPassword1 !== newPassword2) {
      setError("Passwords don't match.");
      return;
    }

    mutateRequestPasswordReset({
      variables: {
        password: newPassword1,
        reset_token: token,
      },
    })
      .then((res) => {
        if (res.data?.passwordReset?.success) {
          setSuccess(
            "Reset password successfully! Log in with your new credentials."
          );
          return;
        }
        const errorMessage = res.data?.passwordReset?.errors?.[0];
        if (errorMessage) {
          setError(errorMessage);
          return;
        }
      })
      .catch(() => setError("Couldn't process your request. Please try again."));
  };

  return (
    <AuthLayout headerText="Reset your password">
      <Form onSubmit={sendResetPasswordRequest}>
        <TextInput
          required
          label="New Password"
          id="new-password-1"
          value={newPassword1}
          onInput={setNewPassword1}
          className="form-input w-full"
          type="password"
        />
        <TextInput
          required
          label="Repeat New Password"
          id="new-password-2"
          value={newPassword2}
          onInput={setNewPassword2}
          className="form-input w-full"
          type="password"
        />
        <div className="flex justify-end mt-6">
          <SubmitButton loading={loading} buttonText="Reset Password" />
        </div>
      </Form>
      <div className="pt-5 mt-6 border-t border-slate-200">
        <NotificationBox notification={status} />
      </div>
    </AuthLayout>
  );
};

export default ResetPassword;
