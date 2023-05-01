import { useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import { Home, LoginPage, } from './../page';
import { AuthContext } from './../state';

export const AppRouter = () => {

    const { logged, verifyToken } = useContext(AuthContext);

    useEffect(() => { verifyToken(); }, [logged]);

    return (
        <BrowserRouter basename={'user_feedback'}>
            <Routes>
                <Route
                    path="/"
                    element={(!logged) ? <LoginPage /> : <Home />}
                />
            </Routes>
        </BrowserRouter>
    );
};
