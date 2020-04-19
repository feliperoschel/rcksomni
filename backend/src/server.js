const app = require('./app');
require('dotenv').config({ path: '.env.local' });

app.listen(process.env.PORT || 3333);

console.log(
  `\nExpress running => PORT: ${process.env.PORT} | Environment: ${process.env.NODE_ENV}\n`,
);
