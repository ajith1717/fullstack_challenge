// declare express
const express = require("express")

const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const swaggerSetup = require('./swagger'); // Adjust the path if necessary

// Determine the current environment
const env = process.env.NODE_ENV || 'development';
const dotenv = require('dotenv');
// Load the corresponding .env file
dotenv.config({ path: `.env.${env}` });

const swaggerUi = require('swagger-ui-dist');

const cors = require('cors');
//  use route 

const Auth = require('./routes/auth');

app.use(bodyParser.json({ limit: "20MB" }));
// Serve Swagger UI static files
app.use('/swagger-ui-dist', express.static(path.join(__dirname, 'node_modules/swagger-ui-dist')));
// app.get('/', (req, res) => {
//     res.sendFile(join(__dirname, 'index.html'));
// });

// Serve static files from the 'public' directory
// app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

// Swagger setup
swaggerSetup(app);


// 👇️ Configure CORS
app.use(cors({
    origin: '*', // or specify your domain
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
    allowedHeaders: ['Origin', 'Content-Type', 'X-Amz-Date', 'Authorization', 'X-Api-Key', 'X-Amz-Security-Token', 'locale']
}));
// app.all('*', (req, res) => {
//     return handle(req, res);
// });




app.use("/auth", Auth);


module.exports = app;



// ssh -i /Users/subramaniam/Documents/adk_er.pem ec2-user@65.2.125.86
