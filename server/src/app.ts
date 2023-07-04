import * as express from 'express';
import routes from './routes';
import * as cors from 'cors';
import path = require('path');

class App {
    public express;

    constructor() {
        this.express = express();
        this.setMiddleware();
        this.mountRoutes();
    }

    private setMiddleware(): void {

        // Json parsing
        this.express.use(express.json());

        // CORS
        const allowedOrigins = ['http://localhost:3000', 'http://192.168.1.224:3000'];
        const options: cors.CorsOptions = {
            origin: allowedOrigins
        };
        this.express.use(cors(options));
    }

    private mountRoutes(): void {
        const clientPath = path.resolve(__dirname, '../../client');
        this.express.use('/', express.static(clientPath));
        this.express.use(routes);
    }
}

export default new App().express;
