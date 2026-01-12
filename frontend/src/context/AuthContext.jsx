import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";
import { socket } from "../socket/socket";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session on refresh
  const loadUser = async () => {
    try {
      const res = await api.get("/auth/me");
      setUserId(res.data.userId);

      socket.connect();
      socket.emit("register", res.data.userId);
    } catch {
      setUserId(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();

    socket.on("hired", (data) => {
      toast.success(data.message);
    });

    return () => socket.off("hired");
  }, []);

  const login = async (data) => {
    await api.post("/auth/login", data);
    toast.success("Login successful");
    await loadUser();
  };

  const register = async (data) => {
    await api.post("/auth/register", data);
    toast.success("Registration successful. Please login.");
  };

  const logout = () => {
    setUserId(null);
    socket.disconnect();
    toast("Logged out");
  };

  return (
    <AuthContext.Provider
      value={{
        userId,
        isAuthenticated: !!userId,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
