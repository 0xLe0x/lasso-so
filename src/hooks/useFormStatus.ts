import { useState } from "react";
import { NotificationStatus } from "../components/NotificationBox";

// This hook can probably handle multiple errors and more complex form logic,
// although it's pretty simplistic right now
const useFormStatus = () => {
  const [status, setStatus] = useState<NotificationStatus>();
  const setError = (text: string) => setStatus({ text, error: true });
  const setSuccess = (text: string) => setStatus({ text, error: false });

  return { setSuccess, setError, status };
};

export default useFormStatus;
