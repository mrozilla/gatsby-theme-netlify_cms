// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

const fs = require('fs');
const path = require('path');

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

module.exports = ({ reporter }) => {
  const cmsFolders = ['menus', 'pages', 'posts'];

  cmsFolders.forEach((folder) => {
    if (!fs.existsSync(`src/cms/${folder}`)) {
      reporter.info(`creating "src/cms/${folder}" directory`);
      fs.mkdirSync(`src/cms/${folder}`);
      fs.copyFileSync(
        path.join(__dirname, `../src/defaults/${folder}/default.mdx`),
        `src/cms/${folder}/default.mdx`,
      );
    }

    if (!fs.existsSync('static/assets')) {
      reporter.info('creating "static/assets" folder');
      fs.mkdirSync('static/assets');
      fs.readdirSync(path.join(__dirname, '../src/defaults/assets')).forEach((item) => {
        fs.copyFileSync(
          path.join(__dirname, `../src/defaults/assets/${item}`),
          `static/assets/${item}`,
        );
      });
    }
  });
};
