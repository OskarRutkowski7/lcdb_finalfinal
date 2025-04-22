export interface Skill {
  name: string;
  description: string;
  type: string;
  damage: string;
  cost: number;
  uses: number;
  coinPower: {
    normal: number;
    clash: number;
    counter: number;
  };
  effects: string[];
}

export interface Stats {
  hp: number;
  def: number;
  speed: number;
  minDmg: number;
  maxDmg: number;
  resistances: {
    slash: number;
    pierce: number;
    blunt: number;
  };
  staggerThreshold: {
    slash: number;
    pierce: number;
    blunt: number;
  };
}

export interface Ego {
  name: string;
  description: string;
  category: string;
  damage: string;
}

export interface SinnerData {
  id: string;
  name: string;
  title: string;
  description: string;
  image: string;
  rarity: number;
  sin: string;
  releaseDate: string;
  statuses: string[];
  stats: Stats;
  skills: Skill[];
  egos: Ego[];
  tags: string[];
  passives: string[];
  sanitySkills: string[];
}

export const sinnersData: Record<string, SinnerData> = {
  "1": {
    id: "1",
    name: "Yi Sang",
    title: "Liu Assoc. South Section 3",
    description: "A former member of the Liu Association who wields flame-based abilities.",
    image: "/LiuYiSang.png",
    rarity: 3,
    sin: "Wrath",
    releaseDate: "2023-02-23",
    statuses: ["Burn"],
    stats: {
      hp: 203,
      def: 52,
      speed: 4,
      minDmg: 42,
      maxDmg: 58,
      resistances: {
        slash: 0.8,
        pierce: 1.0,
        blunt: 1.2
      },
      staggerThreshold: {
        slash: 25,
        pierce: 25,
        blunt: 25
      }
    },
    skills: [
      {
        name: "Flame Row",
        description: "Deal Slash damage to a single target. Apply Burn status.",
        type: "Slash",
        damage: "Slash",
        cost: 2,
        uses: 3,
        coinPower: {
          normal: 3,
          clash: 2,
          counter: 4
        },
        effects: ["Apply Burn (2 turns)", "Deal 1.2x damage to Burned targets"]
      },
      {
        name: "Frontal Assault",
        description: "Deal Slash damage to a single target and apply additional Burn status if target already has Burn.",
        type: "Slash",
        damage: "Slash",
        cost: 3,
        uses: 2,
        coinPower: {
          normal: 4,
          clash: 3,
          counter: 5
        },
        effects: ["Apply Burn (2 turns) if target is already Burned"]
      }
    ],
    egos: [
      {
        name: "Pale Rider",
        description: "A manifestation of Yi Sang's inner turmoil. This E.G.O. grants immense power at the cost of sanity.",
        category: "WAW",
        damage: "Slash"
      }
    ],
    tags: ["Burn", "DPS"],
    passives: ["Burning Passion: Increase damage by 20% against Burned targets"],
    sanitySkills: ["Flame Mastery: All attacks have a 30% chance to apply Burn"]
  },
  "2": {
    id: "2",
    name: "Faust",
    title: "The Lobotomy Corp Remnant",
    description: "A mysterious figure with ties to the Lobotomy Corporation, specializing in pierce damage and status effects.",
    image: "/RemnantFaust.png",
    rarity: 3,
    sin: "Lust",
    releaseDate: "2023-02-23",
    statuses: ["Bleed", "Paralysis"],
    stats: {
      hp: 185,
      def: 45,
      speed: 5,
      minDmg: 38,
      maxDmg: 52,
      resistances: {
        slash: 1.0,
        pierce: 0.8,
        blunt: 1.2
      },
      staggerThreshold: {
        slash: 25,
        pierce: 20,
        blunt: 30
      }
    },
    skills: [
      {
        name: "Surgical Strike",
        description: "Deal Pierce damage and apply Bleed to a single target.",
        type: "Pierce",
        damage: "Pierce",
        cost: 2,
        uses: 3,
        coinPower: {
          normal: 3,
          clash: 3,
          counter: 4
        },
        effects: ["Apply Bleed (3 turns)"]
      },
      {
        name: "Neural Shock",
        description: "Deal Pierce damage with a chance to Paralyze the target.",
        type: "Pierce",
        damage: "Pierce",
        cost: 3,
        uses: 2,
        coinPower: {
          normal: 4,
          clash: 2,
          counter: 5
        },
        effects: ["50% chance to apply Paralysis (1 turn)"]
      }
    ],
    egos: [
      {
        name: "White Night",
        description: "A powerful E.G.O. that channels the essence of the Lobotomy Corporation's experiments.",
        category: "ALEPH",
        damage: "Pierce"
      }
    ],
    tags: ["Control", "DPS"],
    passives: ["Surgical Precision: Pierce attacks ignore 20% of target's defense"],
    sanitySkills: ["Mind Control: Chance to apply Paralysis on hit"]
  },
  "3": {
    id: "3",
    name: "Don Quixote",
    title: "The Manager of La Manchaland",
    description: "A delusional yet powerful warrior who sees himself as a noble knight.",
    image: "/ManagerDon.png",
    rarity: 3,
    sin: "Pride",
    releaseDate: "2023-02-23",
    statuses: ["Guard", "Strength"],
    stats: {
      hp: 220,
      def: 60,
      speed: 3,
      minDmg: 45,
      maxDmg: 65,
      resistances: {
        slash: 0.7,
        pierce: 1.1,
        blunt: 1.0
      },
      staggerThreshold: {
        slash: 30,
        pierce: 25,
        blunt: 25
      }
    },
    skills: [
      {
        name: "Chivalrous Strike",
        description: "A powerful slash attack that can grant Guard status.",
        type: "Slash",
        damage: "Slash",
        cost: 2,
        uses: 3,
        coinPower: {
          normal: 4,
          clash: 3,
          counter: 5
        },
        effects: ["30% chance to gain Guard (2 turns)"]
      },
      {
        name: "Windmill Charge",
        description: "Charge at the enemy while spinning, dealing multiple hits.",
        type: "Slash",
        damage: "Slash",
        cost: 4,
        uses: 2,
        coinPower: {
          normal: 5,
          clash: 4,
          counter: 6
        },
        effects: ["Hit 2-3 times", "Each hit has reduced power"]
      }
    ],
    egos: [
      {
        name: "Knight of La Mancha",
        description: "Don Quixote's ultimate delusion manifested as power.",
        category: "WAW",
        damage: "Slash"
      }
    ],
    tags: ["Tank", "DPS"],
    passives: ["Chivalrous Spirit: Gain Strength when using Guard"],
    sanitySkills: ["Delusional Courage: Increased resistance while at low HP"]
  },
  "4": {
    id: "4",
    name: "Ryōshū",
    title: "The Kaguya of Moonlight",
    description: "A graceful warrior who harnesses the power of moonlight in combat.",
    image: "/HaoRyoshu.png",
    rarity: 3,
    sin: "Sloth",
    releaseDate: "2023-03-09",
    statuses: ["Moonlight", "Evade"],
    stats: {
      hp: 175,
      def: 48,
      speed: 6,
      minDmg: 40,
      maxDmg: 55,
      resistances: {
        slash: 0.9,
        pierce: 0.9,
        blunt: 1.2
      },
      staggerThreshold: {
        slash: 22,
        pierce: 22,
        blunt: 28
      }
    },
    skills: [
      {
        name: "Moonlight Slash",
        description: "A graceful slash empowered by moonlight.",
        type: "Slash",
        damage: "Slash",
        cost: 2,
        uses: 3,
        coinPower: {
          normal: 3,
          clash: 4,
          counter: 4
        },
        effects: ["Gain Moonlight status (2 turns)", "Bonus damage under Moonlight"]
      },
      {
        name: "Lunar Dance",
        description: "A defensive technique that grants evasion.",
        type: "Slash",
        damage: "Slash",
        cost: 3,
        uses: 2,
        coinPower: {
          normal: 3,
          clash: 5,
          counter: 4
        },
        effects: ["Gain Evade (1 turn)", "Bonus speed under Moonlight"]
      }
    ],
    egos: [
      {
        name: "Lunar Princess",
        description: "The embodiment of pure moonlight energy.",
        category: "WAW",
        damage: "Slash"
      }
    ],
    tags: ["Evasion", "DPS"],
    passives: ["Moonlit Grace: Increased evasion under Moonlight"],
    sanitySkills: ["Lunar Blessing: Chance to gain Moonlight status when attacked"]
  },
  "5": {
    id: "5",
    name: "Meursault",
    title: "The Outis Executioner",
    description: "A cold and calculating executioner who specializes in blunt trauma.",
    image: "/DieciMersault.png",
    rarity: 3,
    sin: "Gluttony",
    releaseDate: "2023-03-23",
    statuses: ["Stagger", "Break"],
    stats: {
      hp: 195,
      def: 55,
      speed: 3,
      minDmg: 48,
      maxDmg: 68,
      resistances: {
        slash: 1.1,
        pierce: 1.1,
        blunt: 0.8
      },
      staggerThreshold: {
        slash: 28,
        pierce: 28,
        blunt: 22
      }
    },
    skills: [
      {
        name: "Executioner's Strike",
        description: "A powerful blow that can break enemy defenses.",
        type: "Blunt",
        damage: "Blunt",
        cost: 3,
        uses: 3,
        coinPower: {
          normal: 4,
          clash: 3,
          counter: 5
        },
        effects: ["Chance to Break enemy defense", "Bonus damage to Staggered targets"]
      },
      {
        name: "Crushing Blow",
        description: "A devastating attack that guarantees Stagger.",
        type: "Blunt",
        damage: "Blunt",
        cost: 4,
        uses: 2,
        coinPower: {
          normal: 5,
          clash: 4,
          counter: 6
        },
        effects: ["Apply Stagger (2 turns)", "Ignore partial defense"]
      }
    ],
    egos: [
      {
        name: "The Stranger",
        description: "A manifestation of Meursault's detached nature.",
        category: "WAW",
        damage: "Blunt"
      }
    ],
    tags: ["Tank", "Control"],
    passives: ["Merciless: Increased damage against Staggered enemies"],
    sanitySkills: ["Cold Efficiency: Chance to apply Break on hit"]
  },
  "6": {
    id: "6",
    name: "Hong Lu",
    title: "The Crimson Axe",
    description: "A fierce warrior from K Corp who excels in aggressive combat.",
    image: "/KcorpHongLu.png",
    rarity: 3,
    sin: "Wrath",
    releaseDate: "2023-04-06",
    statuses: ["Rage", "Bleed"],
    stats: {
      hp: 190,
      def: 45,
      speed: 4,
      minDmg: 46,
      maxDmg: 62,
      resistances: {
        slash: 0.8,
        pierce: 1.1,
        blunt: 1.1
      },
      staggerThreshold: {
        slash: 24,
        pierce: 26,
        blunt: 26
      }
    },
    skills: [
      {
        name: "Crimson Slash",
        description: "A powerful slash that causes bleeding.",
        type: "Slash",
        damage: "Slash",
        cost: 2,
        uses: 3,
        coinPower: {
          normal: 4,
          clash: 3,
          counter: 5
        },
        effects: ["Apply Bleed (2 turns)", "Gain Rage on hit"]
      },
      {
        name: "Berserker Rush",
        description: "A frenzied attack that increases in power with Rage.",
        type: "Slash",
        damage: "Slash",
        cost: 3,
        uses: 2,
        coinPower: {
          normal: 5,
          clash: 4,
          counter: 6
        },
        effects: ["Bonus damage per stack of Rage", "Consume Rage for extra damage"]
      }
    ],
    egos: [
      {
        name: "Crimson Warrior",
        description: "The embodiment of Hong Lu's battlefield fury.",
        category: "WAW",
        damage: "Slash"
      }
    ],
    tags: ["DPS", "Berserker"],
    passives: ["Battle Fury: Gain Rage when taking damage"],
    sanitySkills: ["Bloodlust: Heal when causing Bleed"]
  },
  "7": {
    id: "7",
    name: "Heathcliff",
    title: "The Vengeful One",
    description: "A powerful fighter driven by revenge and dark emotions.",
    image: "/WildhuntHeathcliff.png",
    rarity: 3,
    sin: "Envy",
    releaseDate: "2023-04-20",
    statuses: ["Vengeance", "Strength"],
    stats: {
      hp: 200,
      def: 50,
      speed: 4,
      minDmg: 44,
      maxDmg: 60,
      resistances: {
        slash: 1.0,
        pierce: 1.0,
        blunt: 1.0
      },
      staggerThreshold: {
        slash: 25,
        pierce: 25,
        blunt: 25
      }
    },
    skills: [
      {
        name: "Vengeful Strike",
        description: "A powerful attack that gains strength from damage taken.",
        type: "Blunt",
        damage: "Blunt",
        cost: 2,
        uses: 3,
        coinPower: {
          normal: 4,
          clash: 3,
          counter: 5
        },
        effects: ["Gain Vengeance stack on hit", "Bonus damage per Vengeance stack"]
      },
      {
        name: "Dark Retribution",
        description: "Channel accumulated vengeance into a devastating attack.",
        type: "Blunt",
        damage: "Blunt",
        cost: 4,
        uses: 2,
        coinPower: {
          normal: 5,
          clash: 4,
          counter: 6
        },
        effects: ["Consume Vengeance stacks for massive damage", "Gain Strength"]
      }
    ],
    egos: [
      {
        name: "Wuthering Heights",
        description: "A manifestation of Heathcliff's dark passions.",
        category: "WAW",
        damage: "Blunt"
      }
    ],
    tags: ["DPS", "Counter"],
    passives: ["Vengeful Spirit: Gain Vengeance when taking damage"],
    sanitySkills: ["Dark Resolve: Convert damage taken to Strength"]
  },
  "8": {
    id: "8",
    name: "Ishmael",
    title: "The White Whale Hunter",
    description: "A skilled hunter who excels in pierce attacks and pursuit tactics.",
    image: "/KurukomoIshmael.png",
    rarity: 3,
    sin: "Gluttony",
    releaseDate: "2023-05-04",
    statuses: ["Mark", "Focus"],
    stats: {
      hp: 180,
      def: 45,
      speed: 5,
      minDmg: 40,
      maxDmg: 58,
      resistances: {
        slash: 1.1,
        pierce: 0.8,
        blunt: 1.1
      },
      staggerThreshold: {
        slash: 26,
        pierce: 22,
        blunt: 26
      }
    },
    skills: [
      {
        name: "Hunter's Mark",
        description: "Mark a target for increased damage.",
        type: "Pierce",
        damage: "Pierce",
        cost: 2,
        uses: 3,
        coinPower: {
          normal: 3,
          clash: 4,
          counter: 4
        },
        effects: ["Apply Mark (3 turns)", "Gain Focus"]
      },
      {
        name: "Harpoon Strike",
        description: "A powerful pierce attack against marked targets.",
        type: "Pierce",
        damage: "Pierce",
        cost: 3,
        uses: 2,
        coinPower: {
          normal: 5,
          clash: 3,
          counter: 5
        },
        effects: ["Double damage against Marked targets", "Consume Focus for guaranteed critical"]
      }
    ],
    egos: [
      {
        name: "Moby Dick",
        description: "The embodiment of Ishmael's relentless pursuit.",
        category: "WAW",
        damage: "Pierce"
      }
    ],
    tags: ["DPS", "Precision"],
    passives: ["Hunter's Focus: Increased accuracy against Marked targets"],
    sanitySkills: ["Relentless Pursuit: Gain Focus when attacking Marked targets"]
  },
  "9": {
    id: "9",
    name: "Rodion",
    title: "The Nihilist Student",
    description: "A calculating fighter who uses psychological warfare and precise strikes.",
    image: "/DieciRodion.png",
    rarity: 3,
    sin: "Greed",
    releaseDate: "2023-05-18",
    statuses: ["Weakness", "Analysis"],
    stats: {
      hp: 170,
      def: 42,
      speed: 5,
      minDmg: 38,
      maxDmg: 54,
      resistances: {
        slash: 1.1,
        pierce: 0.9,
        blunt: 1.0
      },
      staggerThreshold: {
        slash: 26,
        pierce: 23,
        blunt: 25
      }
    },
    skills: [
      {
        name: "Analytical Strike",
        description: "Study the target's weaknesses while attacking.",
        type: "Pierce",
        damage: "Pierce",
        cost: 2,
        uses: 3,
        coinPower: {
          normal: 3,
          clash: 4,
          counter: 4
        },
        effects: ["Apply Analysis (2 turns)", "Gain insight into target's resistances"]
      },
      {
        name: "Exploit Weakness",
        description: "A precise attack that takes advantage of analyzed weaknesses.",
        type: "Pierce",
        damage: "Pierce",
        cost: 3,
        uses: 2,
        coinPower: {
          normal: 4,
          clash: 3,
          counter: 5
        },
        effects: ["Bonus damage against Analyzed targets", "Apply Weakness"]
      }
    ],
    egos: [
      {
        name: "Crime and Punishment",
        description: "A manifestation of Rodion's analytical mind.",
        category: "WAW",
        damage: "Pierce"
      }
    ],
    tags: ["Control", "Debuff"],
    passives: ["Analytical Mind: Increased damage against analyzed targets"],
    sanitySkills: ["Psychological Warfare: Chance to apply Weakness on hit"]
  },
  "10": {
    id: "10",
    name: "Sinclair",
    title: "The Middle Little Brother",
    description: "A balanced fighter who uses a mix of defensive and offensive techniques.",
    image: "/MiddleSinclair.png",
    rarity: 3,
    sin: "Pride",
    releaseDate: "2023-06-01",
    statuses: ["Shield", "Counter"],
    stats: {
      hp: 195,
      def: 54,
      speed: 4,
      minDmg: 42,
      maxDmg: 56,
      resistances: {
        slash: 1.0,
        pierce: 1.0,
        blunt: 1.0
      },
      staggerThreshold: {
        slash: 25,
        pierce: 25,
        blunt: 25
      }
    },
    skills: [
      {
        name: "Defensive Stance",
        description: "Take a defensive position while preparing a counter.",
        type: "Blunt",
        damage: "Blunt",
        cost: 2,
        uses: 3,
        coinPower: {
          normal: 3,
          clash: 5,
          counter: 4
        },
        effects: ["Gain Shield (2 turns)", "Set up Counter stance"]
      },
      {
        name: "Brother's Revenge",
        description: "A powerful counter-attack that benefits from defensive status.",
        type: "Blunt",
        damage: "Blunt",
        cost: 3,
        uses: 2,
        coinPower: {
          normal: 4,
          clash: 3,
          counter: 6
        },
        effects: ["Bonus damage while Shield is active", "Guaranteed Counter if attacked"]
      }
    ],
    egos: [
      {
        name: "Middle Child",
        description: "A manifestation of Sinclair's balanced nature.",
        category: "WAW",
        damage: "Blunt"
      }
    ],
    tags: ["Tank", "Counter"],
    passives: ["Balanced Spirit: Gain Counter when Shield is active"],
    sanitySkills: ["Protective Instinct: Chance to gain Shield when attacked"]
  },
  "11": {
    id: "11",
    name: "Outis",
    title: "The Faceless One",
    description: "A mysterious fighter who specializes in deception and quick strikes.",
    image: "/SevenOutis.png",
    rarity: 3,
    sin: "Sloth",
    releaseDate: "2023-06-15",
    statuses: ["Stealth", "Confusion"],
    stats: {
      hp: 175,
      def: 45,
      speed: 6,
      minDmg: 36,
      maxDmg: 52,
      resistances: {
        slash: 1.0,
        pierce: 0.8,
        blunt: 1.2
      },
      staggerThreshold: {
        slash: 25,
        pierce: 22,
        blunt: 28
      }
    },
    skills: [
      {
        name: "Shadow Strike",
        description: "A quick attack from stealth that confuses the target.",
        type: "Pierce",
        damage: "Pierce",
        cost: 2,
        uses: 3,
        coinPower: {
          normal: 3,
          clash: 4,
          counter: 4
        },
        effects: ["Gain Stealth (2 turns)", "Apply Confusion on hit"]
      },
      {
        name: "Faceless Assault",
        description: "A series of rapid strikes that benefit from stealth.",
        type: "Pierce",
        damage: "Pierce",
        cost: 3,
        uses: 2,
        coinPower: {
          normal: 4,
          clash: 3,
          counter: 5
        },
        effects: ["Multiple hits while in Stealth", "Bonus damage to Confused targets"]
      }
    ],
    egos: [
      {
        name: "Nobody",
        description: "A manifestation of Outis's mysterious nature.",
        category: "WAW",
        damage: "Pierce"
      }
    ],
    tags: ["Stealth", "Control"],
    passives: ["Deceptive Nature: Increased damage from Stealth"],
    sanitySkills: ["Mind Games: Chance to apply Confusion when entering Stealth"]
  },
  "12": {
    id: "12",
    name: "Gregor",
    title: "The Metamorphosed",
    description: "A transformed being who uses his unique condition in combat.",
    image: "/ZweiGregor.png",
    rarity: 3,
    sin: "Envy",
    releaseDate: "2023-06-29",
    statuses: ["Transform", "Regeneration"],
    stats: {
      hp: 210,
      def: 58,
      speed: 3,
      minDmg: 44,
      maxDmg: 64,
      resistances: {
        slash: 1.2,
        pierce: 1.2,
        blunt: 0.6
      },
      staggerThreshold: {
        slash: 28,
        pierce: 28,
        blunt: 20
      }
    },
    skills: [
      {
        name: "Metamorphosis",
        description: "Transform to gain enhanced abilities.",
        type: "Blunt",
        damage: "Blunt",
        cost: 2,
        uses: 3,
        coinPower: {
          normal: 3,
          clash: 4,
          counter: 4
        },
        effects: ["Gain Transform status (3 turns)", "Activate Regeneration"]
      },
      {
        name: "Insectoid Fury",
        description: "A powerful attack while transformed.",
        type: "Blunt",
        damage: "Blunt",
        cost: 3,
        uses: 2,
        coinPower: {
          normal: 5,
          clash: 3,
          counter: 5
        },
        effects: ["Massive damage while Transformed", "Heal based on damage dealt"]
      }
    ],
    egos: [
      {
        name: "The Metamorphosis",
        description: "The ultimate manifestation of Gregor's transformed state.",
        category: "WAW",
        damage: "Blunt"
      }
    ],
    tags: ["Tank", "Sustain"],
    passives: ["Adaptive Body: Gain Regeneration while Transformed"],
    sanitySkills: ["Survival Instinct: Automatically Transform at low HP"]
  }
};

export function getSinnerData(id: string): SinnerData | undefined {
  return sinnersData[id];
}
