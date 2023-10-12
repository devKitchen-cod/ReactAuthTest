//  const initialState = {
//   user: null,
//   isAuth: false,
//   firstName: "",
//   lastName: "",
//   email: "",
//   password: "",
//   error: null,
// };

//  const authReducer = (state, action) => {
//   switch (action.type) {
//     case "LOGIN":
//       return {
//         ...state,
//         user: action.payload.user,
//         isAuthenticated: true,
//         error: null,
//       };
//     case "LOGOUT":
//       return {
//         ...state,
//         user: null,
//         isAuthenticated: false,
//         email: "",
//         password: "",
//         error: null,
//       };
//     case "UPDATE_FIRST_NAME":
//       return {
//         ...state,
//         email: action.payload.email,
//       };
//     case "UPDATE_LAST_NAME":
//       return {
//         ...state,
//         email: action.payload.email,
//       };
//     case "UPDATE_EMAIL":
//       return {
//         ...state,
//         email: action.payload.email,
//       };
//     case "UPDATE_PASSWORD":
//       return {
//         ...state,
//         password: action.payload.password,
//       };
//     case "SET_ERROR":
//       return {
//         ...state,
//         error: action.payload.error,
//       };
//     default:
//       return state;
//   }
// };
// export  {initialState, authReducer}

import React, { createContext, useReducer, useContext, useEffect } from "react";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  error: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        error: null,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        email: "",
        password: "",
        error: null,
      };
    case "UPDATE_FIRST_NAME":
      return {
        ...state,
        email: action.payload.email,
      };
    case "UPDATE_LAST_NAME":
      return {
        ...state,
        email: action.payload.email,
      };
    case "UPDATE_EMAIL":
      return {
        ...state,
        email: action.payload.email,
      };
    case "UPDATE_PASSWORD":
      return {
        ...state,
        password: action.payload.password,
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "LOGIN", payload: { user } });
    }
  }, []);

  const value = { state, dispatch };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
