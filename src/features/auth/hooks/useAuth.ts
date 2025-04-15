// features/auth/hooks/useAuth.ts

import { useAppSelector } from "@/redux/hooks/useAppSelector";

export const useAuth = () => {
  const { user, isVerified, token } = useAppSelector((state) => state.auth);

  return {
    isAuthenticated: !!user,
    user,
    isVerified,
    token,
  };
};
