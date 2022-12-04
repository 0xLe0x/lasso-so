import React from "react";

type InputProps<T> = Omit<
  React.HTMLProps<HTMLInputElement>,
  "onInput" | "value" | "type"
> & {
  value: T;
  onInput: (value: T) => void;
  type: "text" | "password" | "email" | "username";
};

const TextInput = (props: InputProps<string>) => {
  const { label, onInput, ...passProps } = props;
  return (
    <>
      {label && (
        <label className="block text-sm font-medium mb-1" htmlFor={props.id}>
          {label}
          {props.required && <span className="text-rose-500"> *</span>}
        </label>
      )}
      <input
        {...passProps}
        value={props.value}
        onInput={(e) => onInput((e.target as HTMLInputElement).value)}
      />
    </>
  );
};

export default TextInput;
