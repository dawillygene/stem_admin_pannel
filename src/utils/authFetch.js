import { useAuth } from "../Context/AppProvier";

export const authFetch = async (url, options = {}) => {
  const { jwt } = useAuth();

  const headers = options.headers ? { ...options.headers } : {};
  if (jwt) {
    headers["Authorization"] = `Bearer ${jwt}`;
  }
  const response = await fetch(url, { ...options, headers });
  return response;
};