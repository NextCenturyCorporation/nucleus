/**
 * Copyright 2019 Next Century Corporation
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine', 'karma-typescript'],
        plugins: [
            require('karma-typescript'),
            require('karma-chrome-launcher'),
            require('karma-firefox-launcher'),
            require('karma-jasmine')
        ],
        files: [
            // Required by Web Components
            'node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js',
            'node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle.js',

            // NUCLEUS files
            'components/*.ts',
            'models/*.ts',
            'services/*.ts',
            '*.ts'
        ],
        exclude: [
            'index.ts',
            'dist/**'
        ],
        preprocessors: {
            '**/*.ts': 'karma-typescript'
        },
        karmaTypescriptConfig: {
            exclude: [
                'dist',
                'node_modules'
            ],
            compilerOptions: {
                sourceMap: true,
                module: 'commonjs',
                moduleResolution: 'node',
                target: 'es5',
                declaration: true,
                lib: [
                    'es2017',
                    'dom'
                ],
                emitDecoratorMetadata: true,
                experimentalDecorators: true
            }
        },
        reporters: ['progress'],
        browserDisconnectTimeout: 60000,
        browserDisconnectTolerance: 3,
        browserNoActivityTimeout: 100000,
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: ['ChromeHeadless', 'FirefoxHeadless'],
        customLaunchers: {
            FirefoxHeadless: {
                base: 'Firefox',
                flags: ['-headless']
            },
            ChromeJenkins: {
                base: 'ChromeHeadless',
                flags: [
                    '--headless',
                    '--no-sandbox',
                    '--disable-background-timer-throttling',
                    '--disable-renderer-backgrounding',
                    '--disable-setuid-sandbox',
                    '--disable-gpu',
                    '--disable-translate',
                    '--disable-extensions',
                    '--remote-debugging-port=9222',
                    '--proxy-server=\'direct://\'',
                    '--proxy-bypass-list=*'
                ]
            }
        },
        singleRun: true,
        client: {
            captureConsole: true,
            clearContext: false
        }
    });
};
