# joi-schema
Schema class to use with Joi validation - provides use cases for database records with different create/update strategies

## Example usage

```js
const Schema = require('@pipedrive/joi-schema');
const Joi = require('@hapi/joi');

const validatePostHelloCouchDb = new Schema({
    dataSchema:{
        _id: Joi.string().required(),
        _rev: Joi.string().required(),
        hello: Joi.string().allow('').required(),
        goodbye: Joi.string().allow('').required(),
    },
    createIgnoreKeys: ['_id', '_rev'], // keys to be stripped on getCreateData() call
    updateIgnoreKeys: ['_id'], // keys to be stripped on getUpdateData() call
    bulkUpdateIgnoreKeys: [], // keys to be stripped on getBulkUpdateData() call
    xor: ['hello', 'goodbye'] // validation checks that one and only one of the xor keys is present
});

const validatedData = await validatePostHelloCouchDb.getCreateData({
        _id: '123',
        _rev: '321',
        hello: 'Hello World',
        nonsense: 'Foo',
});
console.log(JSON.stringify(validatedData));
//{hello:  'Hello World'}

```
