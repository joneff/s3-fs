import esbuild from 'rollup-plugin-esbuild';
import * as glob from 'glob';

const typescriptOptions = {
    tsconfig: './tsconfig.json'
};

const plugins = [
    esbuild(typescriptOptions)
];

const srcFiles = glob.globSync('./src/**/*.ts');

/** @type {import('rollup').RollupOptions[]} */
export default [

    // #region es / cjs bundles
    {
        input: srcFiles,
        output: [
            {
                dir: 'dist/esm',
                format: 'esm',
                preserveModules: true,
                preserveModulesRoot: 'src'
            },
            {
                dir: 'dist/cjs',
                format: 'cjs',
                preserveModules: true,
                preserveModulesRoot: 'src'
            }
        ],
        external: [
            'aws-sdk'
        ],
        plugins: plugins
    }
    // #endregion

];
