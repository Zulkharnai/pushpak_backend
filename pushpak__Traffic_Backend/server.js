require('module-alias/register');
const express = require('express');
const expressConfig = require('@server');
const DBConnections = require('@database');
const { port } = require('@config');

const app = express();

// DB configuration and connection create
DBConnections();

// express.js configuration (middleware)
expressConfig(app);


app.listen(port, () => {
    console.log(`App is running on ${port}`);
})