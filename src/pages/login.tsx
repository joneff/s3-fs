import { useNavigate } from 'react-router';
import { useLocalStorage } from "@uidotdev/usehooks";

export default function LoginPage() {
    const navigate = useNavigate();
    const [loginInfo, setLoginInfo] = useLocalStorage('loginInfo', null);

    if (loginInfo !== null) {
        navigate('/browse');
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        let formData = new FormData(event.currentTarget);
        let bucket = formData.get('bucket') as string;
        let key = formData.get('key') as string;
        let secret = formData.get('secret') as string;
        let region = formData.get('region') as string;
        let username = formData.get("username") as string;

        setLoginInfo({
            bucket,
            key,
            secret,
            region,
            username
        } as any);

        navigate('/browse');
    }

    return (
        <form onSubmit={handleSubmit} className="form" style={{maxWidth: 400}}>
            <label className="form-row">
                Bucket: <input type="text" name="bucket" className="input" />
            </label>
            <label className="form-row">
                Key: <input type="text" name="key" className="input" />
            </label>
            <label className="form-row">
                Secret: <input type="text" name="secret" className="input" />
            </label>
            <input type="hidden" name="region" value="eu-central-1" />
            <div className="form-actions">
                <button type="submit" className="button">Login</button>
            </div>
        </form>
    );
}
