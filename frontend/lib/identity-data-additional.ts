import type { Sinner } from "./identity-data"

// Additional sinner data
const additionalSinnerData: Record<number, Sinner> = {
  5: {
    id: 5,
    name: "Meursault",
    title: "The Outis Executioner",
    rarity: 3,
    sin: "Gluttony",
    damage: "Blunt",
    image: "/placeholder.svg?height=300&width=300",
    description:
      "A detached executioner who feels nothing when taking lives. His emotional indifference makes him the perfect tool for the company's dirtiest work.",
    background:
      "Meursault was once a common executioner who carried out his duties with an unsettling indifference. His complete lack of emotional response to killing caught the attention of the Head Manager, who saw in him the perfect tool for the company's most morally questionable tasks. As a Sinner, Meursault continues his work with the same detachment, neither questioning nor caring about the reasons behind his assignments.",
    stats: {
      hp: 230,
      stagger: 160,
      speed: "3-5",
      defense: 70,
      slash: 50,
      pierce: 40,
      blunt: 95,
      resistances: {
        slash: "x0.5",
        pierce: "x1",
        blunt: "x2",
      },
      staggerThreshold: {
        slash: "40 (25%)",
        pierce: "64 (40%)",
        blunt: "128 (80%)",
      },
    },
    skills: [
      {
        name: "Sunshower",
        description: "Deal Blunt damage to a single target with a chance to stun.",
        coinCount: 3,
        type: "Blunt",
        power: "+3",
        multiplier: "x2",
        coinPower: {
          normal: 18,
          success: 50,
          great: 32,
        },
        effects: [
          "20% chance to Stun the target for 1 turn",
          "If target is below 50% HP, increase Stun chance to 40%",
          "Deal +20% damage to Stunned targets",
          "If this attack Stuns the target, gain +10% damage for 2 turns",
        ],
        image: "/placeholder.svg?height=50&width=50",
      },
      {
        name: "Indifferent Strike",
        description: "Deal Blunt damage to all enemies with increased damage to Stunned targets.",
        coinCount: 4,
        type: "Blunt",
        power: "+4",
        multiplier: "x1",
        coinPower: {
          normal: 20,
          success: 45,
          great: 35,
        },
        effects: [
          "Deal +50% damage to Stunned targets",
          "10% chance to Stun each target for 1 turn",
          "For each Stunned enemy, heal for 5% of max HP",
          "If 2 or more enemies are Stunned, gain +1 Protection for 2 turns",
        ],
        image: "/placeholder.svg?height=50&width=50",
      },
      {
        name: "Stranger",
        description: "Deal massive Blunt damage to a single target with execution potential.",
        coinCount: 5,
        type: "Blunt",
        power: "+5",
        multiplier: "x3",
        coinPower: {
          normal: 15,
          success: 55,
          great: 30,
        },
        effects: [
          "If target is Stunned, ignore 50% of their defense",
          "If target is below 30% HP, 40% chance to instantly kill them",
          "On kill, gain +2 Protection and heal for 15% of max HP",
          "After using this skill, -1 Speed for 2 turns due to the effort expended",
        ],
        image: "/placeholder.svg?height=50&width=50",
      },
      {
        name: "Stoic Endurance",
        description: "Defensive skill that absorbs damage and has a chance to counter.",
        coinCount: 3,
        type: "Defense",
        power: "+3",
        multiplier: "",
        coinPower: {
          normal: 0,
          success: 0,
          great: 0,
        },
        effects: [
          "Reduce incoming damage by 35%",
          "Gain +3 Protection",
          "20% chance to Stun the attacker for 1 turn",
          "If already Stunned, clear Stun and counter with Blunt damage (x2)",
        ],
        image: "/placeholder.svg?height=50&width=50",
      },
    ],
    passives: [
      {
        name: "Emotional Void",
        description: "Immune to Fear and Charm effects. When attacked, 15% chance to Stun the attacker for 1 turn.",
      },
      {
        name: "Executioner's Precision",
        description: "Gain +30% damage against targets below 40% HP. Execution chance increased by 10%.",
      },
    ],
    sanity: {
      name: "Nihilistic Detachment",
      description: "When Sanity is below 50%, gain +25% damage but lose the ability to be healed by allies.",
      effects: [
        "Low Sanity: +25% damage, cannot be healed by allies",
        "Critical Sanity: +40% damage, cannot be healed by allies, lose 5% HP per turn",
      ],
    },
    egos: [
      {
        name: "Sunshower",
        description: "Deal Blunt damage to all enemies with a 30% chance to Stun each for 1 turn.",
        rarity: 2,
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        name: "Stranger",
        description:
          "Deal massive Blunt damage to a single target with a 50% chance to instantly kill targets below 30% HP.",
        rarity: 3,
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
    teamSynergies: [
      {
        name: "Executioner's Duo",
        sinners: [5, 8],
        description:
          "When Meursault and Ishmael are in the same team, both gain +20% execution chance against weakened targets.",
      },
      {
        name: "Scientific Minds",
        sinners: [2, 5, 11],
        description: "When teamed with other researchers, all gain +15% skill effectiveness.",
      },
    ],
  },
  6: {
    id: 6,
    name: "Hong Lu",
    title: "The Crimson Axe",
    rarity: 3,
    sin: "Wrath",
    damage: "Slash",
    image: "/placeholder.svg?height=300&width=300",
    description:
      "A former executioner whose rage burns as hot as the fires he controls. His axe brings swift judgment to those who cross his path.",
    background:
      "Hong Lu was once the chief executioner for a powerful crime syndicate. After being betrayed and left for dead, his rage consumed him, and he slaughtered his former employers. The Head Manager found him surrounded by the burning remains of the syndicate's headquarters and offered him a place where his wrath could be channeled productively. As a Sinner, Hong Lu's fury is directed at the company's enemies.",
    stats: {
      hp: 215,
      stagger: 140,
      speed: "3-5",
      defense: 60,
      slash: 95,
      pierce: 50,
      blunt: 55,
      resistances: {
        slash: "x2",
        pierce: "x0.5",
        blunt: "x1",
      },
      staggerThreshold: {
        slash: "112 (80%)",
        pierce: "28 (20%)",
        blunt: "56 (40%)",
      },
    },
    skills: [
      {
        name: "Crimson Slash",
        description: "Deal Slash damage to a single target and apply Bleed.",
        coinCount: 3,
        type: "Slash",
        power: "+3",
        multiplier: "x3",
        coinPower: {
          normal: 16,
          success: 54,
          great: 30,
        },
        effects: [
          "Apply Bleed (2) to the target",
          "If target already has Bleed, increase Bleed by 2",
          "Deal +5% damage for each stack of Bleed on the target (max 30%)",
          "If target has 6+ Bleed, gain +1 Rage",
        ],
        image: "/placeholder.svg?height=50&width=50",
      },
      {
        name: "Whirlwind Axe",
        description: "Deal Slash damage to all surrounding enemies.",
        coinCount: 4,
        type: "Slash",
        power: "+4",
        multiplier: "x2",
        coinPower: {
          normal: 18,
          success: 48,
          great: 34,
        },
        effects: [
          "Apply Bleed (1) to all targets hit",
          "For each target hit, gain +1 Rage (max 3)",
          "If Hong Lu has 3+ Rage, deal +30% damage",
          "After using this skill, lose 1 Rage",
        ],
        image: "/placeholder.svg?height=50&width=50",
      },
      {
        name: "Execution",
        description: "Deal massive Slash damage to a single target with execution potential.",
        coinCount: 5,
        type: "Slash",
        power: "+5",
        multiplier: "x3",
        coinPower: {
          normal: 14,
          success: 58,
          great: 28,
        },
        effects: [
          "Deal +10% damage for each stack of Bleed on the target (max 50%)",
          "If target has 5+ Bleed, 35% chance to instantly kill them",
          "On kill, gain +3 Rage and heal for 10% of max HP",
          "After using this skill, -1 Speed for 1 turn",
        ],
        image: "/placeholder.svg?height=50&width=50",
      },
      {
        name: "Wrathful Counter",
        description: "Defensive skill that counters with increased damage based on Rage.",
        coinCount: 3,
        type: "Defense",
        power: "+3",
        multiplier: "",
        coinPower: {
          normal: 0,
          success: 0,
          great: 0,
        },
        effects: [
          "Reduce incoming damage by 25%",
          "Counter with Slash damage (x1.5)",
          "Counter damage increased by 20% for each Rage (max 60%)",
          "After countering, apply Bleed (2) to the attacker",
        ],
        image: "/placeholder.svg?height=50&width=50",
      },
    ],
    passives: [
      {
        name: "Burning Wrath",
        description: "Start battle with 2 Rage. When HP drops below 50%, gain +2 Rage and +20% damage for 2 turns.",
      },
      {
        name: "Bloodthirst",
        description:
          "Bleed effects deal 30% more damage. When attacking a bleeding target, heal for 5% of damage dealt.",
      },
    ],
    sanity: {
      name: "Berserker's Fury",
      description: "When Sanity is below 50%, gain +30% damage but lose 20% defense.",
      effects: [
        "Low Sanity: +30% damage, -20% defense",
        "Critical Sanity: +50% damage, -40% defense, +1 Rage per turn",
      ],
    },
    egos: [
      {
        name: "Crimson Axe",
        description: "Deal Slash damage to all enemies and apply Bleed (3) to each.",
        rarity: 2,
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        name: "Executioner's Wrath",
        description: "Deal massive Slash damage to a single target. If this kills the target, gain an extra action.",
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
        name: "Bloodletting",
        sinners: [6, 4],
        description: "When Hong Lu and Ryōshū are in the same team, Bleed effects deal 25% more damage.",
      },
    ],
  },
}

export default additionalSinnerData
