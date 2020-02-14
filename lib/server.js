

// 3rd party dependencies
const express = require('express');
const morgan = require('morgan');

// custom middleware
const notFound = require('../middleware/notfound.js');
const errorHandler = require('../middleware/error.js');

// custom routes
const apiRouter = require('../routes/v1.js');
const authRouter = require('../routes/authRoute.js');
// application constants
const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(morgan('dev'));
app.use(apiRouter);
app.use(authRouter);

app.use(errorHandler);
app.use('*',notFound);

module.exports = {
  server: app,
  start: port => {
    let PORT = port || process.env.PORT || 3333;
    app.listen(PORT, () => console.log('server up:', PORT));
  },
};