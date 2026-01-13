export const getToken = () => {
  if (typeof window === "undefined") return null;

  const token = localStorage.getItem("token");
  return token ? JSON.parse(token) : null;
};

export const setToken = (token) => {
  localStorage.setItem("token", JSON.stringify(token));
};

export const clearAuth = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("admin");
};
