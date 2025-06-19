import { useAtom } from "jotai";
import { userAtom } from "@/store/atom";

export function useAuth() {
  const [user, setUser] = useAtom(userAtom);

  const isAuthenticated = !!user;

  const login = (userData: any) => {
    setUser(userData);
    secureStorage.setItem("flapabay_user_session", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    secureStorage.removeItem("flapabay_user_session");
  };

  return {
    user,
    isAuthenticated,
    login,
    logout,
  };
}