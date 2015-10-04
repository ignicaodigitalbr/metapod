module.exports = function(karma) {
  karma.set({
    plugins: [
      'karma-browserify',
      'karma-jasmine',
      'karma-phantomjs-launcher'
    ],

    frameworks: ['browserify', 'jasmine'],

    reporters: ['progress'],

    files: [
      'src/**/*.js',
      'test/**/*.js',
      './node_modules/phantomjs-polyfill/bind-polyfill.js'
    ],

    preprocessors: {
      'src/**/*.js' : ['browserify'],
      'test/**/*.test.js': ['browserify']
    },

    browserify: {
      debug: true,
      transform: ['babelify']
    },

    browsers: ['PhantomJS']
  });
};
