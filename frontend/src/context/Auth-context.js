import React, { createContext, useState } from "react";
import { useNavigate } from "react-router";
import { getLocalStorage, setLocalStorage } from "../helpers/localStorage";
import popAlert from "../helpers/popAlert";

export const AuthContext = createContext({
  isAdmin: "",
  userName: "",
  userEmail: "",
  jwt: "",
  userPhone: "",
  userCnp: "",
  signIn: (auth) => {},
  signOut: () => {},
});

export function AuthProvider({ children }) {
  const navigate = useNavigate();

  const [auth, setAuth] = useState(getLocalStorage("auth", {}));
  // console.log(auth);

  const { token } = auth;
  const { role, fullName, email, phone, cnp } = auth.user ? auth.user : "";

  function signIn(auth) {
    setAuth(auth);
    setLocalStorage("auth", auth);
  }

  function signOut() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("auth");
    setAuth({});
    popAlert(`See you soon`);
    navigate("/");
    setTimeout(() => window.location.reload(), 1200);
  }

  // function startLogOutTimer() {
  //   function tik() {
  //     let min = String(Math.floor(time / 60)).padStart(2, 0);
  //     let sec = String(time % 60).padStart(2, 0);
  //     console.log(min, sec);
  //     if (time === 0) {
  //       clearInterval(timer);
  //       signOut();
  //     }
  //     time--;
  //   }
  //   let time = 300;
  //   tik();
  //   const timer = setInterval(tik, 1000);
  //   return timer;
  // }

  return (
    <AuthContext.Provider
      value={{
        isAdmin: role,
        userName: fullName,
        userEmail: email,
        jwt: token,
        userPhone: phone,
        userCnp: cnp,
        signIn: signIn,
        signOut: signOut,
      }}
    >
      <>{children}</>
    </AuthContext.Provider>
  );
}
