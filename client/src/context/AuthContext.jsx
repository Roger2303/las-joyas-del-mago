import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext({
  isAuthenticated: false,
  role: null,
  login: async () => false,
  logout: () => {},
  token: null,
});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const [token, setToken] = useState(null);

  const login = async (username, password) => {
    console.log("Intento de login:", { username, password });

    if (username === "roger" && password === "ro1234") {
      setIsAuthenticated(true);
      setRole("admin");
      return true;
    }
    if (username === "yeison" && password === "yeison1234") {
      setIsAuthenticated(true);
      setRole("user");
      return true;
    }

    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setRole(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);