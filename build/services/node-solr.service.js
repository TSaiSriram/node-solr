"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var solr = __importStar(require("solr-client"));
var config = __importStar(require("../config"));
var client = solr.createClient({
    host: config.SOLR_HOST,
    port: config.SOLR_PORT,
    core: config.SOLR_CORE
});
var createSolrData = function (createdData) {
    try {
        // var createdData: any = {
        //     "id": "MA147LL/A",
        //     "name": "Apple 60 GB iPod with Video Playback Black",
        //     "manu": "Apple Computer Inc.",
        //     "manu_id_s": "apple",
        //     "cat": ["electronics",
        //         "music"],
        //     "price_c____l_ns": 39900
        // }
        var response = { status: true };
        client.add(createdData, undefined, function (err, obj) {
            var data = [];
            if (err) {
                console.log(err);
                return;
            }
            else
                return;
        });
        return response;
    }
    catch (error) {
        return { status: false, message: error };
    }
};
var getSolrData = function () { return __awaiter(_this, void 0, void 0, function () {
    var query, data_1;
    return __generator(this, function (_a) {
        try {
            query = client.query()
                .q('electronics').start(0)
                .rows(2);
            client.search(query, function (err, obj) {
                if (err) {
                    console.log(err);
                }
                else
                    data_1 = JSON.stringify(obj);
            });
            return [2 /*return*/, { status: true, data: data_1 }];
        }
        catch (error) {
            return [2 /*return*/, { status: false, message: error }];
        }
        return [2 /*return*/];
    });
}); };
var updateSolrData = function (updateData) { return __awaiter(_this, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        // Update document to Solr server
        try {
            data = void 0;
            client.add(updateData, undefined, function (err, result) {
                if (err) {
                    console.log(err);
                    return;
                }
                else
                    result.responseHeader;
            });
            return [2 /*return*/, { status: true, message: "sucessfully Updated", response: data }];
        }
        catch (error) {
            return [2 /*return*/, { status: false, message: error }];
        }
        return [2 /*return*/];
    });
}); };
var deleteSolrData = function (req) { return __awaiter(_this, void 0, void 0, function () {
    var data_2;
    return __generator(this, function (_a) {
        try {
            client.delete('id', req.query.id, undefined, function (err, result) {
                if (err) {
                    console.log("delete error", err);
                    return;
                }
                else
                    data_2 = result.responseHeader;
            });
            return [2 /*return*/, { status: true, message: "sucessfully deleted", response: data_2 }];
        }
        catch (error) {
            return [2 /*return*/, { status: false, message: error }];
        }
        return [2 /*return*/];
    });
}); };
exports.default = { getSolrData: getSolrData, createSolrData: createSolrData, updateSolrData: updateSolrData, deleteSolrData: deleteSolrData };
