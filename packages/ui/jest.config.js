// eslint-disable-next-line @typescript-eslint/no-var-requires
// const pkgName = require('./package.json').name;

/** @type {import('jest').Config} */
const config = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    testMatch: [
        '<rootDir>/test/**/*.test.ts'
    ],
    testEnvironmentOptions: {
        url: 'http://localhost:59657/',
        resources: 'usable'
    },
    reporters: [
        'default'
        // ['@telerik/dx-metrics/jest-reporter', {
        //     'teamName': 'reporting',
        //     'productCode': 'jquery-report-viewer',
        //     'testsType': 'unit',
        //     'testSuite': pkgName,
        //     'outputFilePath': `./${pkgName}.dx-metrics.json`
        // }]
    ],
    globalSetup: '<rootDir>/test/_global.setup.js',
    globalTeardown: '<rootDir>/test/_global.teardown.js',
    setupFiles: ['<rootDir>/test/_jest.setup.js']
};

module.exports = config;
