import { useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router';
import { useLocalStorage } from "@uidotdev/usehooks";

export default function LogoutPage() {
    const navigate = useNavigate();
    const [loginInfo, setLoginInfo] = useLocalStorage('loginInfo', null);

    useEffect(() => {
        if (loginInfo === null) {
            navigate('/');
            return;
        }

        setLoginInfo(null);
        navigate('/');
    }, []);

    return (
        <>
            <Navigate to="/" />
        </>
    );
}
