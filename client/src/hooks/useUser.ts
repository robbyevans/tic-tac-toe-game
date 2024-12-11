// src/hooks/useUser.ts
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@src/store/store";
import { userLogout, fetchUser } from "@src/slices/userSlice";

export const useUser = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, token } = useSelector((state: RootState) => state.user);

  const logoutUser = () => {
    dispatch(userLogout());
  };

  const loadUser = () => {
    dispatch(fetchUser());
  };

  return {
    user,
    token,
    isAuthenticated: !!user,
    logout: logoutUser,
    fetchUser: loadUser,
  };
};
