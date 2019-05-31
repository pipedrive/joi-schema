const assert = require('assert');
const Schema = require('../schema.js');
const Joi = require('@hapi/joi');

describe('getCreateData', () => {
	const validatePostHelloCouchDb = new Schema({
		dataSchema: {
			_id: Joi.string().required(),
			_rev: Joi.string().required(),
			hello: Joi.string().allow('').optional(),
			goodbye: Joi.string().allow('').optional(),
		},
		createIgnoreKeys: ['_id', '_rev'], // keys to be stripped on getCreateData() call
		updateIgnoreKeys: ['_id'], // keys to be stripped on getUpdateData() call
		bulkUpdateIgnoreKeys: [], // keys to be stripped on getBulkUpdateData() call
		xor: ['hello', 'goodbye'] // validation checks that one and only one of the xor keys is present
	});


	it('clears out unnecessary values as shown in readme', async () => {
		const validatedData = await validatePostHelloCouchDb.getCreateData({
			_id: '123',
			_rev: '321',
			hello: 'Hello World',
			nonsense: 'Foo',
		});
		assert.deepStrictEqual(validatedData, {hello: 'Hello World'});
	});

	it('only allows one of xor values', async () => {
		const validatePostHelloCouchDb = new Schema({
			dataSchema: {
				_id: Joi.string().required(),
				_rev: Joi.string().required(),
				hello: Joi.string().allow('').optional(),
				goodbye: Joi.string().allow('').optional(),
			},
			createIgnoreKeys: ['_id', '_rev'], // keys to be stripped on getCreateData() call
			updateIgnoreKeys: ['_id'], // keys to be stripped on getUpdateData() call
			bulkUpdateIgnoreKeys: [], // keys to be stripped on getBulkUpdateData() call
			xor: ['hello', 'goodbye'] // validation checks that one and only one of the xor keys is present
		});


		await assert.rejects(async () => {
			await validatePostHelloCouchDb.getCreateData({
				_id: '123',
				_rev: '321',
				hello: 'Hello World',
				goodbye: 'Foo',
			});
		}, {
			message: '"value" contains a conflict between exclusive peers [hello, goodbye]',
			name: "ValidationError"
		});
	});
});
