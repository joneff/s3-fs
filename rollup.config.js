import { env } from 'node:process';
import fs from 'fs';
import path from 'path';

import * as glob from 'glob';
import esbuild from 'rollup-plugin-esbuild';

const typescriptOptions = {
    tsconfig: './tsconfig.json'
};

const plugins = [
    esbuild(typescriptOptions)
];

/** @type {import('rollup').RollupOptions[]} */
export default [

    // #region client
    {
        input: 'src/client/s3-client.ts',
        output: [
            {
                file: 'dist/cjs/client.cjs',
                format: 'cjs'
            }
        ],
        external: [
            'aws-sdk'
        ],
        plugins: plugins
    }
    // #endregion
];
