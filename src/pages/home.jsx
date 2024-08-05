import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLocalStorage } from "@uidotdev/usehooks";
import { HStack } from '../components/hstack';
// import { VStack } from '../components/vstack';

export default function HomePage() {
    const navigate = useNavigate();
    const [loginInfo] = useLocalStorage('loginInfo', null);

    useEffect(() => {
        if (loginInfo !== null) {
            navigate('/browse');
        }
    }, []);

    return (
        <>
            <HStack>
                <div style={{'margin': 'auto'}}>
                    <p>To view bucket data, please <Link to="/login">login</Link>.</p>
                </div>
            </HStack>
        </>
    );
}
