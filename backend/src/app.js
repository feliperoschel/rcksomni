const express = require('express');
const { errors } = require('celebrate');
const cors = require('cors');
const routes = require('./routes');
require('dotenv').config({ path: '.env.local' });

const errorHandlers = require('./handlers/errorHandlers');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());

app.use(errorHandlers.notFound);

if (app.get('env') === 'development') {
  app.use(errorHandlers.developmentErrors);
}

app.use(errorHandlers.productionErrors);

module.exports = app;
