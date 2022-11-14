const SCOPES = [
    "https://www.googleapis.com/auth/gmail.readonly",
    "https://www.googleapis.com/auth/gmail.modify",
];

export const getGoogleUrl = () => {
  const rootUrl = `https://accounts.google.com/o/oauth2/v2/auth`;
  const options = {
    redirect_uri: import.meta.env.VITE_GOOGLE_OAUTH_REDIRECT_URI,
    client_id: "592181021417-jhde57p87eblscr6h8h7e8kdtoumnu6g.apps.googleusercontent.com",
    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
    scope: SCOPES.join(' '),
    state: '/',
  };
  const qs = new URLSearchParams(options);

  return `${rootUrl}?${qs.toString()}`;
};


export default getGoogleUrl;
