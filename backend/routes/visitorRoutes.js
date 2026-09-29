const express = require('express');
const router = express.Router();
const Visitor = require('../models/Visitor');

// @route   GET /api/visitors
// @desc    Get all visitors (with optional search filter)
router.get('/', async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};

    if (search) {
      query = {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { mobile: { $regex: search, $options: 'i' } },
        ],
      };
    }

    const visitors = await Visitor.find(query).sort({ createdAt: -1 });
    res.json(visitors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/visitors
// @desc    Create a new visitor
router.post('/', async (req, res) => {
  try {
    const newVisitor = new Visitor(req.body);
    const savedVisitor = await newVisitor.save();
    res.status(201).json(savedVisitor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   PUT /api/visitors/:id
// @desc    Update visitor record
router.put('/:id', async (req, res) => {
  try {
    const updatedVisitor = await Visitor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedVisitor) {
      return res.status(404).json({ message: 'Visitor not found' });
    }
    res.json(updatedVisitor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   DELETE /api/visitors/:id
// @desc    Delete visitor record
router.delete('/:id', async (req, res) => {
  try {
    const deletedVisitor = await Visitor.findByIdAndDelete(req.params.id);
    if (!deletedVisitor) {
      return res.status(404).json({ message: 'Visitor not found' });
    }
    res.json({ message: 'Visitor record deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;