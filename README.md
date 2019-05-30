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
    createIgnoreKeys: ['_id', '_rev'],
    updateIgnoreKeys: ['_id'],
    xor: ['hello', 'goodbye']
});
```
