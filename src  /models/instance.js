const mongoose = require('mongoose');

const instanceSchema = new mongoose.Schema({
  instanceId: { type: String, required: true, unique: true },
  status: { type: String, default: 'disconnected' },
  number: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Instance', instanceSchema);
