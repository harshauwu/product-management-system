module.exports = {
    testEnvironment: 'node',
    coveragePathIgnorePatterns: [
        "/node_modules/",
        "/config/",
        "/bin/",
        "/tests/",
        "/app.js",
        "/models/index.js",
        "/routes/api/routes.js"
    ],
    clearMocks: true,
    collectCoverage: true,
    coverageDirectory: 'coverage',
    collectCoverageFrom: [
        'src/controllers/**/*.js',
        'src/services/**/*.js'
    ],
  };
