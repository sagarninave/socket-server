"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EAppVersion = exports.EMongoDbEnvironment = exports.ENodeEnvironment = void 0;
var ENodeEnvironment;
(function (ENodeEnvironment) {
    ENodeEnvironment["DEVELOPMENT"] = "development";
    ENodeEnvironment["PRODUCTION"] = "production";
    ENodeEnvironment["TEST"] = "test";
})(ENodeEnvironment || (exports.ENodeEnvironment = ENodeEnvironment = {}));
var EMongoDbEnvironment;
(function (EMongoDbEnvironment) {
    EMongoDbEnvironment["DEVELOPMENT"] = "development";
    EMongoDbEnvironment["PRODUCTION"] = "production";
    EMongoDbEnvironment["TEST"] = "test";
})(EMongoDbEnvironment || (exports.EMongoDbEnvironment = EMongoDbEnvironment = {}));
var EAppVersion;
(function (EAppVersion) {
    EAppVersion["APP_TYPE"] = "api";
    EAppVersion["VERSION_1"] = "v1";
    EAppVersion["VERSION_2"] = "v2";
    EAppVersion["VERSION_3"] = "v3";
})(EAppVersion || (exports.EAppVersion = EAppVersion = {}));
//# sourceMappingURL=app.enum.js.map