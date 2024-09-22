// routes/entryRoutes.js
const express = require('express');
const router = express.Router();
const Entry = require('../models/Entry');

// Create a new entry
router.post('/', async (req, res) => {
  try {
    const entry = new Entry(req.body);
    await entry.save();
    res.status(201).send(entry);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get all entries
router.get('/', async (req, res) => {
  try {
    const entries = await Entry.find();
    res.send(entries);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Get a single entry by ID
router.get('/:id', async (req, res) => {
  try {
    const entry = await Entry.findById(req.params.id);
    if (!entry) {
      return res.status(404).send({ message: 'Entry not found' });
    }
    res.send(entry);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Update an entry by ID
router.patch('/:id', async (req, res) => {
  try {
    const entry = await Entry.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!entry) {
      return res.status(404).send({ message: 'Entry not found' });
    }
    res.send(entry);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Delete an entry by ID
router.delete('/:id', async (req, res) => {
  try {
    const entry = await Entry.findByIdAndDelete(req.params.id);
    if (!entry) {
      return res.status(404).send({ message: 'Entry not found' });
    }
    res.send({ message: 'Entry deleted successfully' });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
