/// <reference types="express" />
import { GraphqlServerOptions, GraphqlServerContext } from './middlewares/graphql-middleware';
import { FieldResolver, SubscriptionResolver, RootResolver } from './typings';
import resolve from './services/resolve-helper';
import createTypings from './services/create-typings';
import * as express from 'express';
export interface TypeormGraphqlMiddlewareConfig {
    graphql: GraphqlServerOptions;
    paths: {
        resolvers: string[];
        typeDefs: string[];
        typings?: string;
        schema?: string;
    };
    debug?: {
        simulatedLatency?: number;
        logging?: boolean;
    };
}
declare const typeormGraphqlMiddleware: ({debug, paths, graphql}: TypeormGraphqlMiddlewareConfig) => Promise<express.Router>;
export default typeormGraphqlMiddleware;
export { FieldResolver, SubscriptionResolver, RootResolver, resolve, GraphqlServerOptions, createTypings, GraphqlServerContext };
