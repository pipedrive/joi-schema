const Joi = require('@hapi/joi');
const _ = require('lodash');

class Schema {
	constructor({
		dataSchema = {},
		createIgnoreKeys = [],
		updateIgnoreKeys = [],
		bulkUpdateIgnoreKeys = [],
		xor = []
	}) {
		this.dataSchema = dataSchema;

		this.createSchema = Joi.object().keys(
			_.omit(dataSchema, createIgnoreKeys)
		);

		this.updateSchema = Joi.object().keys(
			_.omit(dataSchema, updateIgnoreKeys)
		);

		this.bulkUpdateSchema = Joi.object().keys(
			_.omit(dataSchema, bulkUpdateIgnoreKeys)
		);

		if (!_.isEmpty(xor)) {
			this.createSchema = this.createSchema.xor(...xor);
			this.updateSchema = this.updateSchema.xor(...xor);
			this.bulkUpdateSchema = this.bulkUpdateSchema.xor(...xor);
		}
	}

	async getCreateData(inputData) {
		if (_.isEmpty(inputData)) {
			throw new Error('Create data is empty');
		}

		return await Joi.validate(
			inputData,
			this.createSchema,
			{ stripUnknown: true }
		);
	}

	async getUpdateData(inputData) {
		return await Joi.validate(
			inputData,
			this.updateSchema,
			{ stripUnknown: true }
		);
	}

	async getBulkUpdateData(inputData) {
		return await Joi.validate(
			inputData,
			this.bulkUpdateSchema,
			{ stripUnknown: true }
		);
	}
}

module.exports = Schema;
