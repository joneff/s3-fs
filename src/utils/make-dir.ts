import { useCallback } from 'react';
import { S3Client } from '@joneff/s3-client';

type LoginInfo = {
    bucket: string,
    key: string,
    secret: string,
    region: string
}

export function useMkDir(loginInfo: LoginInfo) {

    const mkDir = useCallback(async (dir: string) => {
        // @ts-ignore
        const bucket = (loginInfo as {bucket: string}).bucket;
        // @ts-ignore
        const client = new S3Client(loginInfo);

        return client.mkdir(bucket, dir);
    }, []);

    return mkDir;
}
