// Karma configuration
// Generated on Sat Sep 17 2016 19:46:30 GMT+0200 (CEST)

var path = require('path');

module.exports = function(config) {
    config.set({
        
        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',
        
        
        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['mocha', 'sinon-chai' ],
        // frameworks: ['mocha', 'sinon-chai', 'chai-as-promised'],
        // plugins: [ 'webpack', 'sourcemap', 'karma-chai-as-promised'],

        
        files: [
            // all files ending in "_test"
            {pattern: 'test/**/*test.js', watched: false},
            'node_modules/babel-polyfill/dist/polyfill.js'
            // each file acts as entry point for the webpack configuration
        ],
        
        // chai config
        client: {
            chai: {
                includeStack: true
            }
        },
        
        
        // list of files to exclude
        exclude: [
        ],
        
        
        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        
        preprocessors: {
            // add webpack as preprocessor
            'src/**/*.js': ['webpack', 'sourcemap'],
            'test/**/*test.js': ['webpack', 'sourcemap']
        },
        
        
        
        webpack: {
            // karma watches the test entry points
            // (you don't need to specify the entry option)
            // webpack watches dependencies
            
            // webpack configuration
            devtool: 'inline-source-map',
            resolve: {
                alias: {
                    'isomorphic-fetch': 'fetch-mock-forwarder'
                }
            },
            module : {
                
                loaders : [
                    {
                        test: /\.(js|jsx)$/,
                        loader: 'babel'
                    }
                ]
            }

        },
        
        notifyReporter: {
            reportEachFailure: true, // Default: false, Will notify on every failed sepc
            reportSuccess: false, // Default: true, Will notify when a suite was successful
        },
        
        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: [ 'mocha', 'notify'],
        
        
        // web server port
        port: 9876,
        
        
        // enable / disable colors in the output (reporters and logs)
        colors: true,
        
        
        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,
        
        
        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,
        
        
        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS'],
        // browsers: ['PhantomJS', 'Chrome'],
        
        
        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true,
        
        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    })
}
