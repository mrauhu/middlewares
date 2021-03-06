import nanoexpress from '@nanoexpress/pro-slim'; // Or your choice, you can use PRO version itself
import schemator from '../schemator.es.js';

import swaggerUiDist from 'swagger-ui-dist';

import staticServe from '../../static/static.es.js';
import bodyParser from '../../body-parser/body-parser.es.js';

import mockup from './mockup.js';

const app = nanoexpress({
  jsonSpaces: 2
});

const schematorInstance = schemator({ swaggerPath: './swagger.json' });

app.use(mockup);
app.use(bodyParser());

app.get('/swagger-ui-dist/:file', staticServe(swaggerUiDist.absolutePath()));
app.get('/swagger.json', schematorInstance.expose());
app.get('/swagger', schematorInstance.render({ exposePath: '/swagger.json' }));

app.get(
  '/',
  // Here any body-parser, form-data logic (all preprocess middlewares)
  schematorInstance.load({ method: 'get', attach: '/', path: './docs.yml' }),
  async () => {
    return { status: 'success' };
  }
);
app.post(
  '/',
  // Here any body-parser, form-data logic (all preprocess middlewares)
  schematorInstance.load({ method: 'post', attach: '/', path: './docs.yml' }),
  async () => {
    return { status: 'success' };
  }
);

app.listen(4000);
