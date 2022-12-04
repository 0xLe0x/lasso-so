import React from "react";
import Spinner from "../Spinner";

interface SubmitButtonProps {
  loading: boolean;
  buttonText: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ loading, buttonText }) => {
  return (
    <>
      {loading ? (
        <button
          type="button"
          className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3"
          disabled
        >
          <Spinner />
        </button>
      ) : (
        <button
          type="submit"
          className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3"
        >
          {buttonText}
        </button>
      )}
    </>
  );
};

export default SubmitButton;
