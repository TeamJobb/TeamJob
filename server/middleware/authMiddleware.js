const cors = require('cors');
const bodyParser = require('body-parser');

// Logger Middleware
const loggerMiddleware = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
};

// Authentication Middleware
const authenticate = (req, res, next) => {
    const token = req.headers['authorization'];
    if (token) {
        // Verify token logic here (e.g., JWT verification)
        next(); // If token is valid
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

// Error Handling Middleware
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
};

// CORS Middleware
const setupCors = (app) => {
    app.use(cors()); // This will enable CORS for all routes and origins
};

// Body-Parser Middleware
const setupBodyParser = (app) => {
    app.use(bodyParser.json()); // For parsing application/json
    app.use(bodyParser.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
};

// Custom Middleware Example
const addTimestamp = (req, res, next) => {
    req.timestamp = new Date().toISOString();
    next();
};

// Exporting the middleware functions
module.exports = {
    loggerMiddleware,
    authenticate,
    errorHandler,
    setupCors,
    setupBodyParser,
    addTimestamp
};
