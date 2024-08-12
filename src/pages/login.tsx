import { useNavigate } from 'react-router';
import { useLocalStorage } from "@uidotdev/usehooks";
// import { S3Client } from '@joneff/s3-client';
import { Button } from '@joneff/react-ui';
import { useCallback } from 'react';

export default function LoginPage() {
    const navigate = useNavigate();
    const [loginInfo, setLoginInfo] = useLocalStorage('loginInfo', null);

    if (loginInfo !== null) {
        navigate('/browse');
    }

    const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        let formData = new FormData(event.currentTarget);
        let bucket = formData.get('bucket') as string;
        let key = formData.get('key') as string;
        let secret = formData.get('secret') as string;
        let region = formData.get('region') as string;

        // const client = new S3Client({
        //     key,
        //     secret,
        //     region
        // });

        // return client._client.listBuckets().promise()
        //     .then((result: AWS.S3.ListBucketsOutput)=> {
        //         const buckets = result.Buckets || [];

        //         if (bucket.includes(bucket)) {
        //             return Promise.resolve();
        //         }

        //         return Promise.reject('Cannot find bucket');
        //     })
        //     .then(() => {
        //         setLoginInfo({
        //             bucket,
        //             key,
        //             secret,
        //             region
        //         } as any);

        //         navigate('/browse');
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });

        setLoginInfo({
            bucket,
            key,
            secret,
            region
        } as any);

        navigate('/browse');
    }, []);

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
                <Button >Login</Button>
            </div>
        </form>
    );
}
