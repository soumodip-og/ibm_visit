const express = require('express');
const router = express.Router();
const Asset = require('../models/Asset');

// @route   GET /api/assets
// @desc    Get all assets (with search and status filter)
router.get('/', async (req, res) => {
  try {
    const { search, status } = req.query;
    let query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { assetId: { $regex: search, $options: 'i' } },
      ];
    }

    if (status && status !== 'All') {
      query.status = status;
    }

    const assets = await Asset.find(query).sort({ createdAt: -1 });
    res.json(assets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/assets
// @desc    Create a new asset
router.post('/', async (req, res) => {
  try {
    const newAsset = new Asset(req.body);
    const savedAsset = await newAsset.save();
    res.status(201).json(savedAsset);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   PUT /api/assets/:id
// @desc    Update asset details
router.put('/:id', async (req, res) => {
  try {
    const updatedAsset = await Asset.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedAsset) {
      return res.status(404).json({ message: 'Asset not found' });
    }
    res.json(updatedAsset);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   DELETE /api/assets/:id
// @desc    Delete asset record
router.delete('/:id', async (req, res) => {
  try {
    const deletedAsset = await Asset.findByIdAndDelete(req.params.id);
    if (!deletedAsset) {
      return res.status(404).json({ message: 'Asset not found' });
    }
    res.json({ message: 'Asset deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;