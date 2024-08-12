import esbuild from 'rollup-plugin-esbuild';
import css from 'rollup-plugin-import-css';
import postcss from 'rollup-plugin-postcss';

import * as glob from 'glob';

const typescriptOptions = {
    tsconfig: './tsconfig.json'
};

const plugins = [
    esbuild(typescriptOptions),
    // css(),
    postcss({
        extensions: [ '.css' ],
    })
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
            '@progress/kendo-svg-icons',
            'classnames',
            'react',
            'react-dom'
        ],
        plugins: plugins
    },
    // #endregion


    // #region styles
    // #endregion

];
