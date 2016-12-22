'use strict';

const express = require('express');
const app = express();

const messages = require('./routes/messages');

app.use(express.static('public'));

app.use('/messages',messages);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Listening on port', port);
});

module.exports = app;
