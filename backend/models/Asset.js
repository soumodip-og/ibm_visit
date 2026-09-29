const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema(
  {
    assetId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    category: {
      type: String,
      enum: ['Laptop', 'Keyboard', 'Mouse', 'Monitor', 'Desktop', 'Other'],
      default: 'Laptop',
    },
    brand: { type: String, default: '' },
    purchaseDate: { type: Date },
    status: {
      type: String,
      enum: ['Available', 'Assigned', 'Under Maintenance'],
      default: 'Available',
    },
    assignedEmployee: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Asset', assetSchema);