// const helment = require('helment');
const morgan = require('morgan');
require('module-alias/register');
const cors = require("cors");
const bodyParser = require('body-parser');
const routes = require('@routes/v1');
const { PAGE_NOT_FOUND_ERROR, INTERNAL_SERVER_ERROR } = require('@common/error');
const AppError = require('@common/libs/Error');
const { url } = require('@config');
const AuthMiddlware = require('@middleware/AuthMiddleware');
const expressConfig = (app) => {
    // app.use(helment());

    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({
        limit: '50mb',
        extended: true,
        parameterLimit: 50000
    }));

    const corsOptions = {
        origin: '*', // Allow all origins
        credentials: true,
        optionSuccessStatus: 200,
    }

    app.use(cors(corsOptions))
    app.use((req, res, next) => {
        res.setHeader(
            'Access-Control-Allow-Methods',
            'GET, POST, OPTIONS, PUT, PATCH, DELETE'
        );

        res.setHeader(
            'Access-Control-Allow-Headers',
            'X-Requested-With, Content-Type, Authorization, Authorization, Cache-control, Pragma'
        );

        next();
    });

    process.on('unhandledRejection', (reason) => {
        console.log(reason);
    }).on('uncaughtException', (error) => {
        console.log(error);
        process.exit(1);
    });

    app.use(morgan('combined'));
    app.use(url, AuthMiddlware.Auth, routes);

    app.use((req, res, next) => next(new PAGE_NOT_FOUND_ERROR()));
    app.use(async (err, req, res) => {
        try {
            if (!(error instanceof AppError)) {
                throw new INTERNAL_SERVER_ERROR();
            } else throw error;
        } catch (err) {
            await err.handleError(req, res);
        }
    });
}

module.exports = expressConfig;