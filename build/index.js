"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_middleware_1 = require("./middlewares/graphql-middleware");
const create_ts_schemas_from_gql_1 = require("./services/create-ts-schemas-from-gql");
const create_schema_1 = require("./services/create-schema");
const resolve_helper_1 = require("./services/resolve-helper");
exports.resolve = resolve_helper_1.default;
const create_typings_1 = require("./services/create-typings");
exports.createTypings = create_typings_1.default;
const typeormGraphqlMiddleware = ({ debug = {}, paths, graphql }) => __awaiter(this, void 0, void 0, function* () {
    // create schema file
    if (paths.schema) {
        create_schema_1.default(paths.typeDefs, paths.schema);
    }
    // generate server typings for typescript
    if (paths.typings) {
        create_ts_schemas_from_gql_1.default(paths.typeDefs, paths.typings);
    }
    return graphql_middleware_1.default(Object.assign({ simulatedLatency: debug.simulatedLatency || 0, resolversGlobPattern: paths.resolvers, typeDefsGlobPattern: paths.typeDefs, debug: debug.logging }, graphql));
});
exports.default = typeormGraphqlMiddleware;
//# sourceMappingURL=index.js.map