import {model, Schema} from 'mongoose';

/**
* @typedef RepositoryDefinition
* @property {Schema} schema
* @property {import('mongoose').Mongoose.Model} query
*/

/**
* @param {String} name
* @param {import('mongoose').SchemaDefinition} definition
* @returns {RepositoryDefinition}
*/
export function useRepository(name, definition) {
    const schema = new Schema(definition);

    schema.virtual('id').get(function () {
        return this._id.toHexString();
    });

    schema.set('toJSON', {
        virtuals: true,

        transform: (_, converted) => {
            for (const key of Object.keys(converted)) {
                if (key.startsWith('_')) delete converted[key];
            }
        }
    });

    const query = model(name, schema);

    return {schema, query};
}
