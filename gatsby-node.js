// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

exports.onPreBootstrap = require('./gatsby/onPreBootstrap'); // assuring defaults
exports.onCreateNode = require('./gatsby/onCreateNode'); // node transformations
exports.onCreateDevServer = require('./gatsby/onCreateDevServer'); // netlify CMS setup
