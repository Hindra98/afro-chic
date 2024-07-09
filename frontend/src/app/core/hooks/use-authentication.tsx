import { createContext, useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setStorage, getStorage } from "../storage/storage";
import { AuthenticationConstants } from "../constants/authentication-contants";

export type GlobalContent = {
  languages: Language[];
  accessToken: string;
}

const AuthContext = createContext<GlobalContent>({
  languages: [],
  accessToken: "",
});

export const AuthenticationProvider = ({ children, languages }) => {

  const [accessToken, setAccessToken] = useState(getStorage<string>(AuthenticationConstants.ACCESS_TOKEN));
  //const accessToken = getStorage<string>(AuthenticationConstants.ACCESS_TOKEN);
  const navigate = useNavigate();

  // const login = async (data) => {

  //   setAccessToken(data);
  //   navigate("/profile");
  // };

  // const logout = () => {

  //   setAccessToken(null);
  //   setStorage(AuthenticationConstants.ACCESS_TOKEN, null);
  //   navigate("/", { replace: true });
  // };

  const value = useMemo(
      () => ({
        languages: languages,
        accessToken: accessToken,
      }),
      [languages, accessToken]
    );

  // const value = {
  //   access_token: accessToken,
  //   login,
  //   logout,
  // }
  
  return <AuthContext.Provider value = {value}>{children}</AuthContext.Provider>;
};

export const useFxContext = () => {
  return useContext(AuthContext);
};