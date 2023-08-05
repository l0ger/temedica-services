import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import { loadEnvConfig } from '@next/env';

import { setLogger } from 'react-query';

/** disabling react query logs**/
setLogger({
  log: console.log,
  warn: console.warn,
  error: () => {},
});

// If you are using jsdom, axios will default to using the XHR adapter which
// can't be intercepted by nock. So, configure axios to use the node adapter.
axios.defaults.adapter = require('axios/lib/adapters/http');

/** loading nextjs environment variablies **/
const projectDir = process.cwd();
loadEnvConfig(projectDir);

import 'jest-styled-components';
