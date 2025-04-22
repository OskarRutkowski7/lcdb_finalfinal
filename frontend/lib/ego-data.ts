export interface EgoData {
  id: string;
  name: string;
  image: string;
  sin: string;
  damage: string;
  sinner: string;
  category: string;
  description: string;
}

export const egosData: Record<string, EgoData> = {
  "1": {
    id: "1",
    name: "Don't Fear The Reaper",
    image: "/dontfearthereaper.png",
    sin: "Wrath",
    damage: "Slash",
    sinner: "Yi Sang",
    category: "ALEPH",
    description: "A manifestation of Yi Sang's determination to face death without fear."
  },
  "2": {
    id: "2",
    name: "Pale Rider",
    image: "/palerider.png",
    sin: "Wrath",
    damage: "Slash",
    sinner: "Yi Sang",
    category: "WAW",
    description: "A manifestation of Yi Sang's inner turmoil. This E.G.O. grants immense power at the cost of sanity."
  },
  "3": {
    id: "3",
    name: "The Crimson Scar",
    image: "/crimsonscar.png",
    sin: "Lust",
    damage: "Pierce",
    sinner: "Faust",
    category: "WAW",
    description: "A manifestation of Faust's surgical precision and bloodthirsty nature."
  },
  "4": {
    id: "4",
    name: "Windmill",
    image: "/windmill.png",
    sin: "Pride",
    damage: "Slash",
    sinner: "Don Quixote",
    category: "WAW",
    description: "Don Quixote's delusions manifest as a powerful weapon against imaginary giants."
  },
  "5": {
    id: "5",
    name: "La Sangre",
    image: "/lasangre.png",
    sin: "Pride",
    damage: "Blunt",
    sinner: "Don Quixote",
    category: "ALEPH",
    description: "The ultimate manifestation of Don Quixote's chivalrous spirit."
  },
  "6": {
    id: "6",
    name: "Bamboo Cutter",
    image: "/bamboocutter.png",
    sin: "Sloth",
    damage: "Slash",
    sinner: "Ryōshū",
    category: "WAW",
    description: "A weapon that channels the ancient tale of the bamboo cutter and the moon princess."
  },
  "7": {
    id: "7",
    name: "Moonlight",
    image: "/moonlight.png",
    sin: "Sloth",
    damage: "Pierce",
    sinner: "Ryōshū",
    category: "ALEPH",
    description: "The pure essence of moonlight, crystallized into a deadly weapon."
  },
  "8": {
    id: "8",
    name: "Sunshower",
    image: "/sunshower.png",
    sin: "Gluttony",
    damage: "Blunt",
    sinner: "Meursault",
    category: "WAW",
    description: "A manifestation of the absurd contrast between light and darkness in Meursault's soul."
  },
  "9": {
    id: "9",
    name: "Stranger",
    image: "/stranger.png",
    sin: "Gluttony",
    damage: "Blunt",
    sinner: "Meursault",
    category: "ALEPH",
    description: "The ultimate expression of Meursault's detachment from humanity."
  }
};

export function getEgoData(id: string): EgoData | undefined {
  return egosData[id];
}

export function getAllEgos(): EgoData[] {
  return Object.values(egosData);
} 