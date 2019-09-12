"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_solr_route_1 = __importDefault(require("./node-solr.route"));
var Routes = /** @class */ (function () {
    function Routes() {
    }
    Routes.prototype.routes = function (app) {
        app.use('/', node_solr_route_1.default);
    };
    return Routes;
}());
exports.Routes = Routes;
