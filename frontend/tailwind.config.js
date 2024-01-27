/* eslint-disable unicorn/prefer-module */
const { createGlobPatternsForDependencies } = require('@nx/react/tailwind')
// eslint-disable-next-line unicorn/import-style
const { join } = require('path')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname)
  ],
  theme: {
    extend: {}
  },
  plugins: [require('@tailwindcss/forms')]
}
