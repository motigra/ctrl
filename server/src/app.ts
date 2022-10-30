import * as express from 'express';
import routes from './routes';
import * as cors from 'cors';

class App {
    public express;

    constructor() {
        this.express = express();
        this.setMiddleware();
        this.mountRoutes();
    }

    private setMiddleware(): void {
        const allowedOrigins = ['http://localhost:3000'];

        const options: cors.CorsOptions = {
            origin: allowedOrigins
        };

        this.express.use(cors(options));
    }

    private mountRoutes(): void {
        const router = express.Router();
        router.get('/', (req, res) => {
            res.json({
                message: 'Hello World!'
            })
        });
        this.express.use('/', router);
        this.express.use(routes);
    }
}

export default new App().express;
