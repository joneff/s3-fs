import { useCallback } from 'react';
import { S3Client } from '@joneff/s3-client';

type LoginInfo = {
    bucket: string,
    key: string,
    secret: string,
    region: string
}

export function useUpload(loginInfo: LoginInfo) {

    const uploadFile = useCallback(async (file: string, fileContent: Blob) => {
        // @ts-ignore
        const bucket = (loginInfo as {bucket: string}).bucket;
        // @ts-ignore
        const client = new S3Client(loginInfo);
        return client.upload(bucket, file, fileContent);
    }, []);

    return uploadFile;
}
