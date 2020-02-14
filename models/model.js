
/**
 * modele for CRUD and add to database
 */
class DataModel {
  constructor(schema) {
    this.schema = schema;
  }
  /**
   *find a record
   *
   * @param {number} _id
   * @returns {object}
   * @memberof DataModel
   */
  get(_id) {
    if (_id) {
      return this.schema.findById(_id);
    } else {
      return this.schema.find({});
    }
  }
  /**
   *create record
   *
   * @param {object} record
   * @returns
   * @memberof DataModel
   */
  create(record) {
    let item = new this.schema(record);
    return item.save();
  }
  /**
   *update record
   *
   * @param {number} _id
   * @param {object} record
   * @returns
   * @memberof DataModel
   */
  update(_id, record) {
    return this.schema.findByIdAndUpdate(_id, record, { new: true });
  }
  /**
   *delete record
   *
   * @param {number} _id
   * @returns
   * @memberof DataModel
   */
  delete(_id) {
    return this.schema.findByIdAndDelete(_id);
  }
}

module.exports = DataModel;