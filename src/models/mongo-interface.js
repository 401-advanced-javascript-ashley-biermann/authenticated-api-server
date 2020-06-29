'use strict';

/** Mongo Interface for Categories & Users
 * @module MongoInterface
 */
class MongoInterface {
  constructor(schema) {
    this.schema = schema;
  }

  get(_id) {
    let searchParam = _id ? { _id } : {};
    return this.schema.find(searchParam);
  }

  create(data) {
    let newEntry = new this.schema(data);
    return newEntry.save();
  }

  update(_id, data) {
    let updatedEntry = this.schema.findByIdAndUpdate(_id, data);
    return updatedEntry;
  }

  delete(_id) {
    let searchParam = _id ? { _id } : {};
    return this.schema.deleteOne(searchParam);
  }
}

module.exports = MongoInterface;