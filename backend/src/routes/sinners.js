const express = require('express');
const router = express.Router();
const { Sinner } = require('../models');

// Get all sinners
router.get('/', async (req, res) => {
  console.log('GET /api/sinners - Fetching all sinners');
  try {
    const sinners = await Sinner.findAll();
    console.log(`Found ${sinners.length} sinners`);
    res.json(sinners);
  } catch (error) {
    console.error('Error fetching sinners:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

// Get sinner by ID
router.get('/:id', async (req, res) => {
  try {
    const sinner = await Sinner.findByPk(req.params.id);
    if (!sinner) {
      return res.status(404).json({ error: 'Sinner not found' });
    }
    res.json(sinner);
  } catch (error) {
    console.error('Error fetching sinner:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new sinner
router.post('/', async (req, res) => {
  try {
    const sinner = await Sinner.create(req.body);
    res.status(201).json(sinner);
  } catch (error) {
    console.error('Error creating sinner:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update sinner
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Sinner.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedSinner = await Sinner.findByPk(req.params.id);
      res.json(updatedSinner);
    } else {
      res.status(404).json({ error: 'Sinner not found' });
    }
  } catch (error) {
    console.error('Error updating sinner:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete sinner
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Sinner.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Sinner not found' });
    }
  } catch (error) {
    console.error('Error deleting sinner:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router; 