// Make sure we're exporting the sinnerData object as default
export type Sinner = {
  id: number
  name: string
  title: string
  rarity: number
  sin: string
  damage: string
  image: string
  description: string
  background: string
  stats: {
    hp: number
    stagger: number
    speed: string
    defense: number
    slash: number
    pierce: number
    blunt: number
    resistances: {
      slash: string
      pierce: string
      blunt: string
    }
    staggerThreshold: {
      slash: string
      pierce: string
      blunt: string
    }
  }
  skills: Array<{
    name: string
    description: string
    coinCount: number
    type: string
    power: string
    multiplier: string
    coinPower: {
      normal: number
      success: number
      great: number
    }
    effects: string[]
    image: string
  }>
  passives: Array<{
    name: string
    description: string
  }>
  sanity: {
    name: string
    description: string
    effects: string[]
  }
  egos: Array<{
    name: string
    description: string
    rarity: number
    image: string
  }>
  teamSynergies: Array<{
    name: string
    sinners: number[]
    description: string
  }>
}

export const getSinnerById = (id: number): Sinner | undefined => {
  return sinnerData[id]
}

export const getAllSinners = (): Sinner[] => {
  return Object.values(sinnerData)
}

// Mock data for Sinners with detailed information
const sinnerData: Record<number, Sinner> = {
  1: {
    id: 1,
    name: "Yi Sang",
    title: "Liu Assoc. South Section 3",
    rarity: 3,
    sin: "Wrath",
    damage: "Slash",
    image: "/placeholder.svg?height=300&width=300",
    description:
      "A writer who plagiarized others' works. He was caught and sentenced to death, but was saved by the Head Manager and brought to the Limbus Company.",
    background:
      "Yi Sang was once a renowned writer whose works captivated readers across the City. However, his success was built on deception - he plagiarized the works of others, claiming them as his own. When his fraud was discovered, he was sentenced to death. The Head Manager of Limbus Company saw potential in his cunning and offered him a position as a Sinner, sparing his life but binding him to the company's mysterious goals.",
    stats: {
      hp: 203,
      stagger: 132,
      speed: "4-6",
      defense: 52,
      slash: 90,
      pierce: 60,
      blunt: 40,
      resistances: {
        slash: "x2",
        pierce: "x1",
        blunt: "x0.5",
      },
      staggerThreshold: {
        slash: "132 (65%)",
        pierce: "71 (35%)",
        blunt: "30 (15%)",
      },
    },
    skills: [
      {
        name: "Flame Row",
        description: "Deal Slash damage to a single target. Apply Burn status.",
        coinCount: 3,
        type: "Slash",
        power: "+4",
        multiplier: "x3",
        coinPower: {
          normal: 15,
          success: 52,
          great: 23,
        },
        effects: [
          "+1 Coin Power for every 3 Burn on the target (max 2)",
          "Deal +10% more damage for every 10 Burn on the target (max 30%)",
          "Inflict 1 Burn",
          "Inflict 1 Burn",
          "Inflict 1 Burn",
          "Inflict 1 Burn",
        ],
        image: "/placeholder.svg?height=50&width=50",
      },
      {
        name: "Frontal Assault",
        description:
          "Deal Slash damage to a single target and apply additional Burn status if target already has Burn.",
        coinCount: 4,
        type: "Slash",
        power: "+4",
        multiplier: "x2",
        coinPower: {
          normal: 19,
          success: 53,
          great: 47,
        },
        effects: [
          "+1 Coin Power for every 6 Burn on the target (max 2)",
          "Inflict 2 Burn",
          "Inflict 2 Burn",
          "Deal +5% more damage for every 9 Burn on the target (max 60%)",
          "If the target has 6+ Burn, inflict +2 Burn Count on the target",
        ],
        image: "/placeholder.svg?height=50&width=50",
      },
      {
        name: "Flow of the Sword",
        description: "Deal massive Slash damage to a single target and heal allies based on damage dealt.",
        coinCount: 4,
        type: "Slash",
        power: "+3",
        multiplier: "x1",
        coinPower: {
          normal: 18,
          success: 54,
          great: 61,
        },
        effects: [
          "+1 Coin Power for every 8 Burn on the target (max 2)",
          "Deal +10% more damage for every 6 Burn on the target (max 30%)",
          "Heal 15 SP for 1 other ally with the least SP",
          "If this attack killed the target, or if the main target has 8+ Burn, heal 1 more ally",
          "Inflict 1 Burn",
          "Inflict 1 Burn",
          "Inflict 2 Burn",
          "Deal +2% more damage for every 9 Burn on the target (max 60%)",
          "Inflict Wrath Affinity damage equal to Burn Potency on the target (max 30) Reduce Target's Burn Count by 2",
        ],
        image: "/placeholder.svg?height=50&width=50",
      },
      {
        name: "Flame Counter",
        description: "Defensive skill that counters attacks with Burn effects.",
        coinCount: 5,
        type: "Defense",
        power: "+3",
        multiplier: "",
        coinPower: {
          normal: 0,
          success: 0,
          great: 0,
        },
        effects: [
          "When hit, apply 2 Burn to the attacker",
          "Reduce incoming damage by 15% for each Burn on the attacker (max 45%)",
          "Counter with Slash damage equal to 50% of the damage received",
        ],
        image: "/placeholder.svg?height=50&width=50",
      },
    ],
    passives: [
      {
        name: "Burning Passion",
        description: "Increase Burn damage by 20%. Gain 1 Burn Potency for every 5 Burn inflicted.",
      },
      {
        name: "Flame Affinity",
        description: "Start battle with 10 Burn Potency. Burn effects deal 10% more damage.",
      },
    ],
    sanity: {
      name: "Plagiarist's Guilt",
      description: "When Sanity is below 50%, gain +20% Slash damage but take 5% more damage from all sources.",
      effects: [
        "Low Sanity: +20% Slash damage, +5% damage taken",
        "Critical Sanity: +30% Slash damage, +15% damage taken, -10% defense",
      ],
    },
    egos: [
      {
        name: "Don't Fear The Reaper",
        description: "Increase Slash damage by 30% for 3 turns. Gain immunity to Stagger for 2 turns.",
        rarity: 2,
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        name: "Pale Rider",
        description:
          "Deal massive Slash damage to all enemies. Has a 30% chance to instantly kill targets below 25% HP.",
        rarity: 3,
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
    teamSynergies: [
      {
        name: "Wrath Duo",
        sinners: [1, 6],
        description: "When Yi Sang and Hong Lu are in the same team, both gain +15% damage with Slash attacks.",
      },
      {
        name: "Liu Association",
        sinners: [1, 3, 8],
        description: "When 3 or more Liu Association members are in the team, all gain +10% max HP and +5% defense.",
      },
    ],
  },
  2: {
    id: 2,
    name: "Faust",
    title: "The Lobotomy Corp Remnant",
    rarity: 3,
    sin: "Lust",
    damage: "Pierce",
    image: "/placeholder.svg?height=300&width=300",
    description:
      "A former researcher from Lobotomy Corporation who experimented with human desires. Now uses her knowledge to manipulate the emotions of others.",
    background:
      "Faust was once a brilliant researcher at Lobotomy Corporation, where she conducted experiments on human desires and emotions. Her research crossed ethical boundaries, leading to her dismissal. The Head Manager recruited her for her unique understanding of human psychology and her ability to manipulate emotions. As a Sinner, she continues her research while serving the company's goals.",
    stats: {
      hp: 185,
      stagger: 145,
      speed: "5-7",
      defense: 45,
      slash: 50,
      pierce: 95,
      blunt: 55,
      resistances: {
        slash: "x0.5",
        pierce: "x2",
        blunt: "x1",
      },
      staggerThreshold: {
        slash: "36 (25%)",
        pierce: "116 (80%)",
        blunt: "58 (40%)",
      },
    },
    skills: [
      {
        name: "Temptation",
        description: "Deal Pierce damage to a single target and apply Charm status.",
        coinCount: 3,
        type: "Pierce",
        power: "+3",
        multiplier: "x2",
        coinPower: {
          normal: 18,
          success: 55,
          great: 27,
        },
        effects: [
          "+1 Coin Power for every 2 Charm on the target (max 3)",
          "Inflict 2 Charm",
          "Inflict 1 Charm",
          "If target has 5+ Charm, gain +20% damage for this attack",
        ],
        image: "/placeholder.svg?height=50&width=50",
      },
      {
        name: "Seductive Strike",
        description: "Deal Pierce damage to all enemies and apply Charm status.",
        coinCount: 4,
        type: "Pierce",
        power: "+4",
        multiplier: "x1",
        coinPower: {
          normal: 20,
          success: 48,
          great: 32,
        },
        effects: [
          "Inflict 1 Charm to all enemies",
          "For each enemy with 3+ Charm, heal self for 10% of damage dealt",
          "If 3 or more enemies have Charm, gain +1 Speed next turn",
        ],
        image: "/placeholder.svg?height=50&width=50",
      },
      {
        name: "Forbidden Knowledge",
        description: "Deal massive Pierce damage to a single target based on their Charm level.",
        coinCount: 5,
        type: "Pierce",
        power: "+5",
        multiplier: "x2",
        coinPower: {
          normal: 15,
          success: 60,
          great: 25,
        },
        effects: [
          "Deal +15% damage for each Charm on the target (max 75%)",
          "Remove all Charm from the target",
          "For each Charm removed, gain 5% damage reduction for 2 turns",
          "If this attack kills the target, reduce all skill cooldowns by 1",
        ],
        image: "/placeholder.svg?height=50&width=50",
      },
      {
        name: "Emotional Barrier",
        description: "Defensive skill that redirects damage based on Charm levels.",
        coinCount: 4,
        type: "Defense",
        power: "+3",
        multiplier: "",
        coinPower: {
          normal: 0,
          success: 0,
          great: 0,
        },
        effects: [
          "Reduce incoming damage by 10% for each enemy with Charm (max 50%)",
          "If attacker has Charm, redirect 30% of damage back to attacker",
          "Apply 2 Charm to the attacker",
        ],
        image: "/placeholder.svg?height=50&width=50",
      },
    ],
    passives: [
      {
        name: "Emotional Manipulation",
        description: "Increase Charm duration by 1 turn. Enemies with Charm deal 15% less damage to Faust.",
      },
      {
        name: "Desire's Embrace",
        description:
          "Start battle with +20% Pierce damage. Each time an enemy with Charm attacks, gain +5% Pierce damage (max 50%).",
      },
    ],
    sanity: {
      name: "Researcher's Obsession",
      description: "When Sanity is below 50%, Charm effects are 25% more potent but take 10% more Pierce damage.",
      effects: [
        "Low Sanity: +25% Charm potency, +10% Pierce damage taken",
        "Critical Sanity: +40% Charm potency, +20% Pierce damage taken, -15% defense",
      ],
    },
    egos: [
      {
        name: "The Crimson Scar",
        description: "Deal massive Pierce damage to a single target and heal for 50% of damage dealt.",
        rarity: 3,
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        name: "Scarlet Desire",
        description: "Apply Charm to all enemies and gain +30% damage against Charmed targets for 3 turns.",
        rarity: 2,
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
    teamSynergies: [
      {
        name: "Emotional Resonance",
        sinners: [2, 7],
        description:
          "When Faust and Heathcliff are in the same team, status effects applied by either last 1 turn longer.",
      },
      {
        name: "Scientific Minds",
        sinners: [2, 5, 11],
        description: "When teamed with other researchers, all gain +15% skill effectiveness.",
      },
    ],
  },
  3: {
    id: 3,
    name: "Don Quixote",
    title: "The Knight of Ruination",
    rarity: 3,
    sin: "Pride",
    damage: "Slash",
    image: "/placeholder.svg?height=300&width=300",
    description:
      "A delusional knight who believes he is fighting for justice and honor. His unwavering conviction makes him a formidable warrior despite his madness.",
    background:
      "Don Quixote was once a respected knight who served a noble house. After witnessing the corruption and injustice of the nobility, his mind fractured, creating an alternate reality where he fights against imaginary evils. The Head Manager recruited him for his unwavering conviction and combat prowess, finding his delusions useful for the company's purposes.",
    stats: {
      hp: 220,
      stagger: 150,
      speed: "3-5",
      defense: 65,
      slash: 85,
      pierce: 45,
      blunt: 70,
      resistances: {
        slash: "x1.5",
        pierce: "x0.5",
        blunt: "x1",
      },
      staggerThreshold: {
        slash: "112 (75%)",
        pierce: "30 (20%)",
        blunt: "75 (50%)",
      },
    },
    skills: [
      {
        name: "Windmill",
        description: "Deal Slash damage to all enemies in a wide arc.",
        coinCount: 3,
        type: "Slash",
        power: "+3",
        multiplier: "x2",
        coinPower: {
          normal: 16,
          success: 48,
          great: 36,
        },
        effects: [
          "Deal +10% damage for each enemy targeted (max 40%)",
          "If 3 or more enemies are hit, gain +1 Protection for 2 turns",
          "Enemies hit have -10% defense for 2 turns",
        ],
        image: "/placeholder.svg?height=50&width=50",
      },
      {
        name: "Knight's Challenge",
        description: "Deal Slash damage to a single target and taunt them.",
        coinCount: 2,
        type: "Slash",
        power: "+2",
        multiplier: "x3",
        coinPower: {
          normal: 12,
          success: 45,
          great: 43,
        },
        effects: [
          "Target is Taunted for 2 turns (forced to attack Don Quixote)",
          "Gain +2 Protection",
          "If already Taunting an enemy, gain +30% damage for this attack",
          "If this attack staggers the target, extend Taunt duration by 1 turn",
        ],
        image: "/placeholder.svg?height=50&width=50",
      },
      {
        name: "La Sangre",
        description: "Deal massive Blunt damage to a single target with a chance to stagger.",
        coinCount: 5,
        type: "Blunt",
        power: "+5",
        multiplier: "x2",
        coinPower: {
          normal: 14,
          success: 58,
          great: 28,
        },
        effects: [
          "+50% stagger damage",
          "If target is Taunted, +100% stagger damage",
          "If this attack staggers the target, gain +3 Protection",
          "After using this skill, gain +20% damage reduction for 1 turn",
        ],
        image: "/placeholder.svg?height=50&width=50",
      },
      {
        name: "Steadfast Defense",
        description: "Defensive skill that reduces damage and counters attacks.",
        coinCount: 3,
        type: "Defense",
        power: "+4",
        multiplier: "",
        coinPower: {
          normal: 0,
          success: 0,
          great: 0,
        },
        effects: [
          "Reduce incoming damage by 40%",
          "Gain +2 Protection",
          "Counter with Slash damage equal to 40% of the damage received",
          "If attacker is Taunted, counter damage is increased to 60%",
        ],
        image: "/placeholder.svg?height=50&width=50",
      },
    ],
    passives: [
      {
        name: "Chivalrous Spirit",
        description:
          "Start battle with +2 Protection. When an ally falls below 30% HP, gain +1 Protection and +20% damage for 2 turns.",
      },
      {
        name: "Delusional Courage",
        description: "Immune to Fear effects. When Taunting an enemy, gain +15% damage reduction against that enemy.",
      },
    ],
    sanity: {
      name: "Knight's Madness",
      description:
        "When Sanity is below 50%, gain +25% damage but lose the ability to distinguish between allies and enemies (5% chance to attack allies).",
      effects: [
        "Low Sanity: +25% damage, 5% chance to attack allies",
        "Critical Sanity: +40% damage, 15% chance to attack allies, -20% accuracy",
      ],
    },
    egos: [
      {
        name: "Windmill",
        description: "Deal Slash damage to all enemies and apply Taunt to 2 random enemies.",
        rarity: 2,
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        name: "La Sangre",
        description: "Deal massive Blunt damage to a single target with 100% increased stagger damage.",
        rarity: 3,
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
    teamSynergies: [
      {
        name: "Protectors",
        sinners: [3, 10],
        description:
          "When Don Quixote and Sinclair are in the same team, both gain +2 Protection at the start of battle.",
      },
      {
        name: "Liu Association",
        sinners: [1, 3, 8],
        description: "When 3 or more Liu Association members are in the team, all gain +10% max HP and +5% defense.",
      },
    ],
  },
  4: {
    id: 4,
    name: "Ryōshū",
    title: "The Kaguya of Moonlight",
    rarity: 3,
    sin: "Sloth",
    damage: "Slash",
    image: "/placeholder.svg?height=300&width=300",
    description:
      "A serene warrior who moves with the grace of moonlight. Her calm demeanor hides a deadly precision with her blade.",
    background:
      "Ryōshū was once a renowned swordswoman who served as a personal guard to a high-ranking official. After failing to prevent an assassination, she retreated into isolation, perfecting her art while battling her guilt. The Head Manager found her and offered her redemption through service to the Limbus Company, promising that her skills would protect many lives.",
    stats: {
      hp: 190,
      stagger: 125,
      speed: "6-8",
      defense: 48,
      slash: 92,
      pierce: 65,
      blunt: 43,
      resistances: {
        slash: "x1.5",
        pierce: "x1",
        blunt: "x0.5",
      },
      staggerThreshold: {
        slash: "94 (75%)",
        pierce: "50 (40%)",
        blunt: "25 (20%)",
      },
    },
    skills: [
      {
        name: "Bamboo Cutter",
        description: "Deal precise Slash damage to a single target with increased critical chance.",
        coinCount: 2,
        type: "Slash",
        power: "+3",
        multiplier: "x2",
        coinPower: {
          normal: 14,
          success: 56,
          great: 30,
        },
        effects: [
          "+20% critical hit chance",
          "On critical hit, apply Bleed (2) to the target",
          "If target has Bleed, +15% damage",
          "After using this skill, gain +1 Speed for 1 turn",
        ],
        image: "/placeholder.svg?height=50&width=50",
      },
      {
        name: "Moonlit Slash",
        description: "Deal Slash damage to all enemies in a line.",
        coinCount: 3,
        type: "Slash",
        power: "+3",
        multiplier: "x2",
        coinPower: {
          normal: 16,
          success: 52,
          great: 32,
        },
        effects: [
          "Ignore 20% of target's defense",
          "Apply Bleed (1) to all targets hit",
          "For each target with Bleed, gain 5% damage reduction for 1 turn (max 25%)",
          "If 3 or more targets are hit, reduce this skill's cooldown by 1",
        ],
        image: "/placeholder.svg?height=50&width=50",
      },
      {
        name: "Moonlight",
        description: "Deal massive Pierce damage to a single target, with bonus effects based on Speed.",
        coinCount: 4,
        type: "Pierce",
        power: "+4",
        multiplier: "x3",
        coinPower: {
          normal: 12,
          success: 60,
          great: 28,
        },
        effects: [
          "Deal bonus damage equal to 10% of Ryōshū's Speed",
          "Apply Bleed (3) to the target",
          "If Ryōshū's Speed is higher than the target's, gain an extra action this turn",
          "After using this skill, -1 Speed for 1 turn",
        ],
        image: "/placeholder.svg?height=50&width=50",
      },
      {
        name: "Serene Stance",
        description: "Defensive skill that increases evasion and counter chance.",
        coinCount: 2,
        type: "Defense",
        power: "+2",
        multiplier: "",
        coinPower: {
          normal: 0,
          success: 0,
          great: 0,
        },
        effects: [
          "+30% evasion chance for 1 turn",
          "If attack is evaded, counter with Slash damage (x1.5)",
          "Gain +2 Speed for 1 turn",
          "Clear all negative status effects",
        ],
        image: "/placeholder.svg?height=50&width=50",
      },
    ],
    passives: [
      {
        name: "Moonlit Grace",
        description: "Start battle with +2 Speed. When evading an attack, gain +1 Speed for 1 turn.",
      },
      {
        name: "Flowing Blood",
        description:
          "Bleed effects deal 25% more damage. When attacking a bleeding target, gain +10% critical hit chance.",
      },
    ],
    sanity: {
      name: "Tranquil Madness",
      description: "When Sanity is below 50%, gain +30% Speed but lose 15% defense.",
      effects: ["Low Sanity: +30% Speed, -15% defense", "Critical Sanity: +50% Speed, -30% defense, +20% damage taken"],
    },
    egos: [
      {
        name: "Bamboo Cutter",
        description: "Increase Speed by 2 and apply Bleed to all enemies.",
        rarity: 2,
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        name: "Moonlight",
        description: "Deal massive Pierce damage to a single target and gain an extra action if the target is killed.",
        rarity: 3,
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
    teamSynergies: [
      {
        name: "Swift Justice",
        sinners: [4, 9],
        description: "When Ryōshū and Rodion are in the same team, both gain +1 Speed and +10% critical hit chance.",
      },
      {
        name: "Sloth's Paradox",
        sinners: [4, 11],
        description: "When paired with another Sloth sinner, both gain +20% evasion chance.",
      },
    ],
  },
}

// Export the sinnerData object as default
export default sinnerData
