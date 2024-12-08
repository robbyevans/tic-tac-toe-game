import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { userLogout } from "../slices/userSlice";
import { useNavigate } from "react-router-dom";

export const useUser = () => {
  const { user, token } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(userLogout());
    navigate("/login"); // Redirect to the login page after logout
  };

  return { user, token, isAuthenticated: !!user, logout };
};
