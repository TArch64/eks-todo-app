import {Router} from "express";

/**
* @typedef RouterDefinition
* @property {String} basePath
* @property {Router} middleware
*/

/**
* @callback RouteHandler
* @param {import('express').Request} request
* @param {import('express').Response} response
*/

/**
* @callback RouteBuilder
* @param {String} path
* @param {RouteHandler} handler
*/

/**
* @callback RouterBuilder
* @param {{
*   _get: RouteBuilder,
*   _post: RouteBuilder,
*   _patch: RouteBuilder,
*   _delete: RouteBuilder
* }} router
*/

/**
* @param {String} basePath
* @param {RouterBuilder} build
* @returns {RouterDefinition}
*/
export function useRouter(basePath, build) {
    const router = new Router();

    const handleRequest = (handler) => {
        return async (request, response) => {
            try {
                const body = (await handler(request, response)) || { success: true };
                response.json(body);
            } catch (error) {
                response.status(400).json({ message: error.message })
            }
        }
    };

    const builders = ['get', 'post', 'patch', 'delete'].map((name) => [
        '_' + name,
        (path, handler) => router[name](path, handleRequest(handler))
    ]);

    build(Object.fromEntries(builders));

    return { basePath, middleware: router };
}
