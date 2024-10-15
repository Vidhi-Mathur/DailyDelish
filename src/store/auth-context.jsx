import { createContext, useState } from "react";

export const AuthContext = createContext({
    isAuthenticated: false,
    login: () => {},
    signup: () => {},
    logout: () => {},
    details: () => {}
});

export const AuthCtxProvider = ({ children }) => {
    const [auth, setAuth] = useState(false);
    const [details, setDetails] = useState({ name: '', email: ''})

    const login = (name, email) => {
        setAuth(true);
        setDetails({name, email})
    };

    const signup = (name, email) => {
        setAuth(true);
        setDetails({name, email})
    };

    const logout = async() => {
        setAuth(false);
        setDetails({ name: '', email: ''})
    };

    const ctxValue = {
        isAuthenticated: auth,
        login,
        signup,
        logout,
        details
    };

    return <AuthContext.Provider value={ctxValue}>{children}</AuthContext.Provider>;
};