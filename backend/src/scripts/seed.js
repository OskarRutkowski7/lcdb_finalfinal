const { sequelize, Sinner, EGO } = require('../models');

// Seed data
const seedData = async () => {
  try {
    // Clear existing data
    await Sinner.destroy({ where: {} });
    await EGO.destroy({ where: {} });

    // Create sinners
    const sinners = [
      { name: "Yi Sang", rarity: 3, sin: "Wrath", damage: "Slash", image: "/placeholder.svg?height=80&width=80" },
      { name: "Faust", rarity: 3, sin: "Lust", damage: "Pierce", image: "/placeholder.svg?height=80&width=80" },
      { name: "Don Quixote", rarity: 3, sin: "Pride", damage: "Slash", image: "/placeholder.svg?height=80&width=80" },
      { name: "Ryōshū", rarity: 3, sin: "Sloth", damage: "Slash", image: "/placeholder.svg?height=80&width=80" },
      { name: "Meursault", rarity: 3, sin: "Gluttony", damage: "Blunt", image: "/placeholder.svg?height=80&width=80" },
      { name: "Hong Lu", rarity: 3, sin: "Wrath", damage: "Slash", image: "/placeholder.svg?height=80&width=80" },
      { name: "Heathcliff", rarity: 3, sin: "Envy", damage: "Blunt", image: "/placeholder.svg?height=80&width=80" },
      { name: "Ishmael", rarity: 3, sin: "Gluttony", damage: "Pierce", image: "/placeholder.svg?height=80&width=80" },
      { name: "Rodion", rarity: 3, sin: "Greed", damage: "Pierce", image: "/placeholder.svg?height=80&width=80" },
      { name: "Sinclair", rarity: 3, sin: "Pride", damage: "Blunt", image: "/placeholder.svg?height=80&width=80" },
      { name: "Outis", rarity: 3, sin: "Sloth", damage: "Pierce", image: "/placeholder.svg?height=80&width=80" },
      { name: "Gregor", rarity: 3, sin: "Envy", damage: "Blunt", image: "/placeholder.svg?height=80&width=80" },
    ];

    const createdSinners = await Sinner.bulkCreate(sinners);
    console.log('Created sinners:', createdSinners.length);

    // Create EGOs
    const egos = [
      {
        name: "Don't Fear The Reaper",
        category: "TETH",
        sin: "Wrath",
        damage: "Slash",
        characterId: createdSinners[0].id, // Yi Sang
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        name: "Pale Rider",
        category: "HE",
        sin: "Wrath",
        damage: "Slash",
        characterId: createdSinners[0].id, // Yi Sang
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        name: "The Crimson Scar",
        category: "WAW",
        sin: "Lust",
        damage: "Pierce",
        characterId: createdSinners[1].id, // Faust
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        name: "Windmill",
        category: "ZAYIN",
        sin: "Pride",
        damage: "Slash",
        characterId: createdSinners[2].id, // Don Quixote
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        name: "La Sangre",
        category: "HE",
        sin: "Pride",
        damage: "Blunt",
        characterId: createdSinners[2].id, // Don Quixote
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        name: "Bamboo Cutter",
        category: "TETH",
        sin: "Sloth",
        damage: "Slash",
        characterId: createdSinners[3].id, // Ryōshū
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        name: "Moonlight",
        category: "WAW",
        sin: "Sloth",
        damage: "Pierce",
        characterId: createdSinners[3].id, // Ryōshū
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        name: "Sunshower",
        category: "ZAYIN",
        sin: "Gluttony",
        damage: "Blunt",
        characterId: createdSinners[4].id, // Meursault
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        name: "Stranger",
        category: "HE",
        sin: "Gluttony",
        damage: "Blunt",
        characterId: createdSinners[4].id, // Meursault
        image: "/placeholder.svg?height=80&width=80",
      },
    ];

    const createdEgos = await EGO.bulkCreate(egos);
    console.log('Created EGOs:', createdEgos.length);

    console.log('Seed completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

// Run the seed
seedData(); 