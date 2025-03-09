const dotenv = require('dotenv');

// const { server, io } = require("./websocket/socket");
const showBanner = require('node-banner');

const port = process.env.PORT || 5005;

// Determine the current environment
// const env = 'production'; // for production
const env = 'development'; // for development


// Load the corresponding .env file
dotenv.config({ path: `.env.${env}` });

console.log(`Environment: ${env}`);
const server = require('./server');

server.listen(port, '0.0.0.0', async () => {
    await showBanner('start', '--------------------------------------', 'red');
    console.log(`Environment: ${env}`);
    console.log(`SERVER START RUNNING ON PORT ${port}`);
});

