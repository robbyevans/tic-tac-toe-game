// src/hooks/useUser.ts

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState, AppDispatch } from "../store/store";
import { userLogout, fetchUser } from "../slices/userSlice";
import { useDispatch } from "react-redux";

export const useUser = () => {
  // If you created a custom hook `useAppDispatch`, use that:
  // const dispatch = useAppDispatch();
  // Otherwise, cast the default useDispatch:
  const dispatch = useDispatch<AppDispatch>();

  const { user, token } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  const logout = () => {
    dispatch(userLogout());
    navigate("/login");
  };

  const loadUser = () => {
    dispatch(fetchUser());
  };

  return { user, token, isAuthenticated: !!user, logout, fetchUser: loadUser };
};
