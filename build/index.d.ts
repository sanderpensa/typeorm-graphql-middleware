/// <reference types="cors" />
/// <reference types="express" />
import { GraphqlServerOptions, GraphqlServerContext } from './middlewares/graphql-middleware';
import { FieldResolver, SubscriptionResolver, RootResolver } from './typings';
import createTypings from './services/create-typings';
import createSchema from './services/create-schema';
import * as express from 'express';
import * as cors from 'cors';
import createTypeormLoader, { TypeormLoader } from './services/typeorm-loader';
export interface TypeormGraphqlMiddlewareConfig {
    graphql: GraphqlServerOptions;
    paths: {
        resolvers: string[];
        typeDefs: string[];
    };
    debug?: {
        simulatedLatency?: number;
        logging?: boolean;
    };
    applyMiddleware?: Array<(args?: any) => any>;
    corsOptions?: cors.CorsOptions;
}
declare const typeormGraphqlMiddleware: ({debug, paths, applyMiddleware, corsOptions, graphql}: TypeormGraphqlMiddlewareConfig) => Promise<express.Router>;
export default typeormGraphqlMiddleware;
declare const resolve: <T extends (...args: any[]) => any>(fn: T) => (...args: any[]) => any;
export { FieldResolver, SubscriptionResolver, RootResolver, resolve, GraphqlServerOptions, createTypings, createSchema, GraphqlServerContext, TypeormLoader, createTypeormLoader };
