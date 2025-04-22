const express = require('express');
const router = express.Router();
const { Team, Sinner, EGO, TeamSinners, TeamEgos } = require('../models');
const { verifyToken } = require('../middleware/auth');
const { sequelize } = require('../models');

// Get all teams for the authenticated user
router.get('/', verifyToken, async (req, res) => {
  try {
    console.log('Fetching teams for user:', req.user_id);
    console.log('Authorization header:', req.headers.authorization);
    
    // First, check if the associations are properly set up
    console.log('Team associations:', Object.keys(Team.associations));
    console.log('Sinner associations:', Object.keys(Sinner.associations));
    
    const teams = await Team.findAll({
      where: { user_id: req.user_id },
      include: [
        {
          model: Sinner,
          as: 'sinners',
          through: { attributes: [] }
        },
        {
          model: EGO,
          as: 'egos',
          through: { attributes: [] }
        }
      ],
      logging: console.log // This will log the actual SQL query
    });
    
    console.log('Found teams:', JSON.stringify(teams, null, 2));
    
    // Even if no teams are found, return an empty array (not an error)
    res.json(teams || []);
  } catch (error) {
    console.error('Detailed error:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    res.status(500).json({ 
      error: 'Error fetching teams',
      details: error.message,
      type: error.name
    });
  }
});

// Get a specific team
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const team = await Team.findOne({
      where: {
        id: req.params.id,
        user_id: req.user_id,
      },
      include: [
        {
          model: Sinner,
          as: 'sinners',
          through: { attributes: [] },
        },
      ],
    });

    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }

    res.json(team);
  } catch (error) {
    console.error('Error fetching team:', error);
    res.status(500).json({ error: 'Error fetching team' });
  }
});

// Create a new team
router.post('/', verifyToken, async (req, res) => {
  const t = await sequelize.transaction();
  
  try {
    console.log('Creating team with data:', JSON.stringify(req.body, null, 2));
    console.log('User ID:', req.user_id);
    const { name, description, characters, egos } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Team name is required' });
    }

    // Create the team first
    const team = await Team.create({
      name,
      description,
      user_id: req.user_id,
    }, { transaction: t });

    console.log('Base team created:', team.id);

    // Commit the team creation
    await t.commit();

    // Start a new transaction for associations
    const associationTransaction = await sequelize.transaction();

    try {
      // Create character associations with positions
      if (characters && characters.length > 0) {
        console.log('Setting characters:', characters);
        const characterAssociations = characters.map((sinnerId, index) => ({
          team_id: team.id,
          sinner_id: sinnerId,
          position: index + 1
        }));
        await TeamSinners.bulkCreate(characterAssociations, { 
          transaction: associationTransaction 
        });
        console.log('Characters set successfully');
      }

      // Create ego associations
      if (egos && egos.length > 0) {
        console.log('Received egos data:', JSON.stringify(egos, null, 2));
        const egoAssociations = egos.map(ego => {
          console.log('Processing ego:', ego);
          return {
            team_id: team.id,
            ego_id: parseInt(ego.ego_id),
            sinner_id: parseInt(ego.sinner_id)
          };
        });
        console.log('Created ego associations:', JSON.stringify(egoAssociations, null, 2));
        await TeamEgos.bulkCreate(egoAssociations, { 
          transaction: associationTransaction 
        });
        console.log('Egos set successfully');
      }

      await associationTransaction.commit();

      // Fetch the complete team with associations
      const createdTeam = await Team.findByPk(team.id, {
        include: [
          {
            model: Sinner,
            as: 'sinners',
            through: { attributes: [] },
          },
          {
            model: EGO,
            as: 'egos',
            through: { attributes: [] },
          }
        ]
      });

      if (!createdTeam) {
        throw new Error('Team was created but could not be retrieved');
      }

      console.log('Final team data:', JSON.stringify({
        id: createdTeam.id,
        name: createdTeam.name,
        sinnerCount: createdTeam.sinners?.length || 0,
        egoCount: createdTeam.egos?.length || 0
      }, null, 2));

      res.status(201).json(createdTeam);
    } catch (associationError) {
      await associationTransaction.rollback();
      // If associations fail, delete the team
      await team.destroy();
      throw associationError;
    }
  } catch (error) {
    if (!t.finished) {
      await t.rollback();
    }
    console.error('Error creating team:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    res.status(500).json({ 
      error: 'Error creating team',
      details: error.message
    });
  }
});

// Update a team
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const { name, description, sinnerIds } = req.body;

    const team = await Team.findOne({
      where: {
        id: req.params.id,
        user_id: req.user_id,
      },
    });

    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }

    await team.update({
      name: name || team.name,
      description: description || team.description,
    });

    if (sinnerIds) {
      // Update character positions when updating sinners
      await TeamSinners.destroy({
        where: { team_id: team.id }
      });
      
      if (sinnerIds.length > 0) {
        const newSinnerAssociations = sinnerIds.map((sinnerId, index) => ({
          team_id: team.id,
          sinner_id: sinnerId,
          position: index + 1
        }));
        await TeamSinners.bulkCreate(newSinnerAssociations);
      }
    }

    const updatedTeam = await Team.findByPk(team.id, {
      include: [
        {
          model: Sinner,
          as: 'sinners',
          through: { attributes: [] },
        },
      ],
    });

    res.json(updatedTeam);
  } catch (error) {
    console.error('Error updating team:', error);
    res.status(500).json({ error: 'Error updating team' });
  }
});

// Delete a team
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const team = await Team.findOne({
      where: {
        id: req.params.id,
        user_id: req.user_id,
      },
    });

    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }

    await team.destroy();
    res.json({ message: 'Team deleted successfully' });
  } catch (error) {
    console.error('Error deleting team:', error);
    res.status(500).json({ error: 'Error deleting team' });
  }
});

module.exports = router; 