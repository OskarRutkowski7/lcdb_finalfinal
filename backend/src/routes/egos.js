const express = require('express');
const router = express.Router();
const { EGO, Sinner } = require('../models');

// Get all EGOs
router.get('/', async (req, res) => {
  try {
    const egos = await EGO.findAll({
      include: {
        model: Sinner,
        as: 'Sinner'
      }
    });
    res.json(egos);
  } catch (error) {
    console.error('Error fetching EGOs:', error);
    console.error('Detailed error:', error.message);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

// Get EGO by ID
router.get('/:id', async (req, res) => {
  try {
    const ego = await EGO.findByPk(req.params.id, {
      include: [{
        model: Sinner
      }]
    });
    if (!ego) {
      return res.status(404).json({ error: 'EGO not found' });
    }
    res.json(ego);
  } catch (error) {
    console.error('Error fetching EGO:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new EGO
router.post('/', async (req, res) => {
  try {
    const ego = await EGO.create(req.body);
    const createdEgo = await EGO.findByPk(ego.id, {
      include: [{
        model: Sinner
      }]
    });
    res.status(201).json(createdEgo);
  } catch (error) {
    console.error('Error creating EGO:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update EGO
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await EGO.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedEgo = await EGO.findByPk(req.params.id, {
        include: [{
          model: Sinner
        }]
      });
      res.json(updatedEgo);
    } else {
      res.status(404).json({ error: 'EGO not found' });
    }
  } catch (error) {
    console.error('Error updating EGO:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete EGO
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await EGO.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'EGO not found' });
    }
  } catch (error) {
    console.error('Error deleting EGO:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router; 