import React from "react";
import ReCAPTCHA from "react-google-recaptcha";

const siteKey = process.env.NEXT_PUBLIC_GCP_RECAPTCHA_KEY;

const ReCaptcha: React.FC<{
  onChange: (token: string | null) => void;
  onError: () => void;
}> = ({ onChange, onError }) =>
  // FIXME: This captcha logic is flawed, since we might use the API without the captcha
  //        token being verified at all. Token should be sent to the backend and validated with the account creation request.
  siteKey ? (
    <ReCAPTCHA sitekey={siteKey} onChange={onChange} onErrored={onError} />
  ) : null;

export default ReCaptcha;
