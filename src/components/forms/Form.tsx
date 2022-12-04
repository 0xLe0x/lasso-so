import React, { FormEvent, PropsWithChildren, useCallback } from "react";

const Form: React.FC<PropsWithChildren<{ onSubmit: () => void }>> = ({
  onSubmit,
  children,
}) => {
  const submit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onSubmit();
    },
    [onSubmit]
  );

  return (
    <form onSubmit={submit}>
      <div className="space-y-4">{children}</div>
    </form>
  );
};

export default Form;
