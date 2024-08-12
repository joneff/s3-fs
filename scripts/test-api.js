import { config } from 'dotenv';
import { S3Client } from '@joneff/s3-client';

config({
    path: [
        '.env.local',
        '.env'
    ]
});

const client = new S3Client({
    key: process.env.S3_KEY,
    secret: process.env.S3_SECRET,
    region: 'eu-central-1'
});
const bucket = process.env.S3_BUCKET;

const helloBuffer = Buffer.from('hello world', 'utf8');

// eslint-disable-next-line no-unused-vars
async function populate() {
    await client.mkdir(bucket, 'foo/foo/foo');
    await client.mkdir(bucket, 'foo/foo/bar');
    await client.mkdir(bucket, 'foo/foo/baz');

    await client.mkdir(bucket, 'foo/bar/foo');
    await client.mkdir(bucket, 'foo/bar/bar');
    await client.mkdir(bucket, 'foo/bar/baz');

    await client.mkdir(bucket, 'foo/baz/foo');
    await client.mkdir(bucket, 'foo/baz/bar');
    await client.mkdir(bucket, 'foo/baz/baz');

    await client.mkdir(bucket, 'bar');
    await client.mkdir(bucket, 'baz');

    await client.upload(bucket, 'hello-world.txt', helloBuffer);
    await client.upload(bucket, 'foo/foo/foo/hello-world.txt', helloBuffer);
}

// await populate();

// const loginResult = await client._client.listBuckets().promise()
//     .then(promiseResult => {
//         console.log(promiseResult);
//     })
//     .catch(error => {
//         console.log(error)
//     });

// console.log(loginResult);

// await client.rmdir(bucket, 'gosho');
// await client.mkdir(bucket, 'pesho/gosho/atanas');

// await client.upload(bucket, 'gosho/hello-world.txt', helloBuffer);
const lsResult = await client.lsDir(bucket, 'foo');

// eslint-disable-next-line no-console
console.log(lsResult);

// lsResult.forEach(item => {
//     // eslint-disable-next-line no-console
//     console.log(item);
// });
