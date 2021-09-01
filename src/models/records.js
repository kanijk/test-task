const mongoose = require('mongoose');
const { Schema } = mongoose;


const RecordSchema = new Schema({
    key: String,
    value: String,
    createdAt: Date,
    counts: Array,
})
const Record = mongoose.model("Record",RecordSchema);
module.exports = Record;

