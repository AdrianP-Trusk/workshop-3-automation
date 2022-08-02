// cucumber.js
const common = [
  'features/**/*.feature', // Specify our feature files
  '--require-module ts-node/register', // Load TypeScript module
  '--require features/step-definitions/**/*.ts', // Load step definitions
  '--require features/support/**/*.ts', // Load custom world and hook
].join(' ')

module.exports = {
  default: common,
}
