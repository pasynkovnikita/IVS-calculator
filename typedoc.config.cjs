/** @type {import('typedoc').TypeDocOptions} */
module.exports = {
  entryPoints: ['./src/calculator/index.ts'],
  out: 'docs',
  categorizeByGroup: true,
  name: 'Calculator',
  navigation: {
    includeGroups: true,
    includeCategories: true,
  },
};
