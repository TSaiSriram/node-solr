import { Application } from 'express';
import nodeSolr from "./node-solr.route";
export class Routes {
    public routes(app: Application): void {
        app.use('/', nodeSolr)
    }
}
