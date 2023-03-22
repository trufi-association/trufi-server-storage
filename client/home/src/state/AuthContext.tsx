import React, { useCallback, useState } from 'react';
import { AuthProps, Props, TAppContext } from './../model';

export const AuthContext = React.createContext<TAppContext>({
    logged: false,
    login: async (email, password) => false,
    verifyToken: async () => { console.error('verifyToken is undefined'); },
    logout: () => { console.error('logout is undefined'); }
});

const initialState = {
    logged: false
};

export const AuthProvider = ({ children }: Props) => {
    const [auth, setAuth] = useState<AuthProps>(initialState);

    const login = async (email: string, password: string) => {
        const resp = email === 'TrufiAccount' && password === 'TrufiAccount';

        if (resp) {
            localStorage.setItem('token', 'hasToken1234');
            setAuth({ logged: true, email, password });
            return true;
        }

        return false;
    };

    const verifyCallback = async () => {
        const token = localStorage.getItem('token');

        return setAuth({
            ...auth,
            logged: token !== null
        });
    };

    const verifyToken = useCallback(verifyCallback, [auth]);

    const logout = () => {
        localStorage.removeItem('token');
        setAuth(initialState);
    };

    return (
        <AuthContext.Provider value={{
            logged: auth.logged,
            login: login,
            verifyToken: verifyToken,
            logout: logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};
