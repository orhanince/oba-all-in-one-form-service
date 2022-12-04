require('dotenv').config(); // import ENV file
const sonarqubeScanner = require('sonarqube-scanner');
console.log(
  `sonar info: ${process.env.SONARQUBE_HOST}:${process.env.SONARQUBE_PORT}`
);
sonarqubeScanner(
  {
    serverUrl: `${process.env.SONARQUBE_HOST}:${process.env.SONARQUBE_PORT}`,
    options: {
      'sonar.sources': 'src',
      'sonar.tests': 'test',
      'sonar.inclusions': 'src/**', // Entry point of your code
      'sonar.test.inclusions':
        'test/**/*.spec.js,test/**/*.spec.jsx,test/**/*.test.js,test/**/*.test.jsx',
      'sonar.javascript.lcov.reportPaths': 'coverage/lcov.info',
      'sonar.testExecutionReportPaths': 'coverage/test-reporter.xml',
    },
  },
  () => {}
);
