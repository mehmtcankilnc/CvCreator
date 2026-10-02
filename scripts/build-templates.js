const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');

const templatesDir = path.join(__dirname, '..', 'src', 'pdf', 'templates');
const outputFile = path.join(__dirname, '..', 'src', 'pdf', 'compiledTemplates.js');

const names = fs
  .readdirSync(templatesDir)
  .filter(file => file.endsWith('.html'))
  .map(file => path.basename(file, '.html'))
  .sort();

const entries = names.map(name => {
  const source = fs
    .readFileSync(path.join(templatesDir, `${name}.html`), 'utf8')
    .replace(/^\uFEFF+/, '');
  fs.writeFileSync(path.join(templatesDir, `${name}.html`), source);
  const spec = Handlebars.precompile(source);
  return `  ${JSON.stringify(name)}: Handlebars.template(${spec}),`;
});

const output = `const Handlebars = require('handlebars/runtime');

module.exports = {
${entries.join('\n')}
};
`;

fs.writeFileSync(outputFile, output);
console.log(`Compiled ${names.length} templates: ${names.join(', ')}`);
