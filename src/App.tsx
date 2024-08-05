import { useEffect } from 'react';
import {
    createBrowserRouter,
    Link,
    Outlet,
    RouterProvider,
} from 'react-router-dom';
import { useLocalStorage } from "@uidotdev/usehooks";
import Home from './pages/home';
import ErrorPage from './pages/error';
import BrowserPage from './pages/browse';
import LoginPage from './pages/login';
import './App.css';
import LogoutPage from './pages/logout';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: 'browse',
                element: <BrowserPage />,
                children: [
                    {
                        path: '*',
                        element: <BrowserPage />
                    }
                ]
            },
            {
                path: 'login',
                element: <LoginPage />
            },
            {
                path: 'logout',
                element: <LogoutPage />
            }
        ]
    }
]);

function Layout() {
    const [loginInfo] = useLocalStorage('loginInfo', null);

    return (
        <>
            <div className="navbar" role="navigation" aria-label="Main">
                <span className="spacer"></span>
                {loginInfo === null && <Link to="/login">Login</Link>}
                {loginInfo !== null && <>
                    <span>Bucket: {(loginInfo as {bucket: string}).bucket}</span>
                    <span>Region: {(loginInfo as {region: string}).region}</span>
                    <Link to="/logout">Logout</Link>
                </>}
            </div>
            <main className="main">
                <Outlet />
            </main>
        </>
    );
}

function App() {
    const [loginInfo, setLoginInfo] = useLocalStorage('loginInfo', null);

    useEffect(() => {

    }, [loginInfo, setLoginInfo]);

    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}

export default App
