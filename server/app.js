require('dotenv').config({ path: './config/.env' });
const express = require('express');
const cors = require('cors');
const path = require('path');

// Connection to the DB
const connection = require('./db/mongoose');

// Routers
const auth = require('./routes/auth');
const employees = require('./routes/employees');

// Middlewares
const errorMiddleware = require('./middlewares/error-middleware');
const cookieParser = require('cookie-parser');
const crossDomain = require('./middlewares/cross-domain');

// Port from .env
const PORT = process.env.PORT || 5000;
const app = express();
 
// Path to main html file
const root = path.join(__dirname, '../client', 'build');

// Middleware usage
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));

// Routing
app.use('/api', auth);
app.use('/api', employees);

// Middleware usage
app.use(errorMiddleware);
app.use(crossDomain);

// Static folder
app.use(express.static(root));

// Main page route
app.get("/", (req, res) => {
  res.sendFile('index.html', { root });
});

// Server starting
const start = async () => {
    try{
        await connection();
        app.listen(PORT, () => console.log(`Server is listening on PORT = ${PORT}`));
    }catch(e){
        console.log(e);
    }
};

start();