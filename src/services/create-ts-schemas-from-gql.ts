import * as fs from 'fs';
import * as path from 'path';
import * as mkdirp from 'mkdirp';
import { schemaToTemplateContext } from 'graphql-codegen-core';
import { makeExecutableSchema } from 'graphql-tools';
import { compileTemplate, getGeneratorConfig } from 'graphql-codegen-compiler';
import getTypeDefs from './get-type-definitions';

let cachedContent = '';

export default (typedefGlobPattern: string[], outputPath: string) => {
	const typeDefs = getTypeDefs(typedefGlobPattern);

	const schema = makeExecutableSchema({ typeDefs });
	const context = schemaToTemplateContext(schema as any);
	const config = getGeneratorConfig('ts-single');

	const compiledTs = compileTemplate(config, context);

	// add Default Query, Mutation and Subscription if not present
	if (compiledTs[0].content.indexOf('export interface Query') === -1) {
		compiledTs[0].content += `\nexport interface Query {}\n`;
	}

	if (compiledTs[0].content.indexOf('export interface Mutation') === -1) {
		compiledTs[0].content += `\nexport interface Mutation {}\n`;
	}

	if (compiledTs[0].content.indexOf('export interface Subscription') === -1) {
		compiledTs[0].content += `\nexport interface Subscription {}\n`;
	}

	if (cachedContent !== compiledTs[0].content) {
		mkdirp.sync(path.dirname(outputPath));

		fs.writeFileSync(outputPath, compiledTs[0].content);
		cachedContent = compiledTs[0].content;
	}

	return cachedContent;
};
