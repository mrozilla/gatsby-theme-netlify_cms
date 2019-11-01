// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import CMS, { init } from 'netlify-cms-app';
import FileSystemBackend from 'netlify-cms-backend-fs';

import config from './config';

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

if (process.env.NODE_ENV === 'development') {
  CMS.registerBackend('file-system', FileSystemBackend);
  config.backend = { name: 'file-system', api_root: 'http://localhost:8000/api' };
  config.site_url = 'http://localhost:8000';
}

init({ config });
