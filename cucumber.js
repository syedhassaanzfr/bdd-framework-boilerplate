/**
 * Cucumber profiles — select with: cucumber-js --profile <name>
 */
const common = {
  paths: ['features/**/*.feature'],
  require: ['features/step-definitions/**/*.js', 'features/support/**/*.js'],
  format: [
    'progress-bar',
    'html:reports/cucumber-report.html',
    'json:reports/cucumber-report.json'
  ],
  formatOptions: { snippetInterface: 'async-await' }
};

module.exports = {
  default: { ...common, tags: 'not @wip' },
  smoke: { ...common, tags: '@smoke and not @wip' },
  ci: { ...common, tags: 'not @wip', retry: 1, parallel: 2, format: [...common.format, 'progress'] }
};
