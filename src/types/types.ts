export interface Expansion {
  id: string;
  series: string;
  name: string;
  expansionImages: {
    symbol: string;
    logo: string;
  };
  legalities: string | null;
  printedTotal: number;
  total: number;
  expansionCode: string;
  releaseDate: string | null;
}

export interface Card {
  id: string;
  name: string;
  hp: number;
  artist: string;
  regulationMark: string;
  price: number | null;
  marketPrice: number | null;
  rules: string[];
  expansionId: string;
  cardNumber: number;
  rarity: string;
  superType: string;
  subTypes: string[];
  cardImages: {
    small: string;
    large: string;
  };
  legalities: unknown | null; // Replace with appropriate type if you know
  pullRates: unknown | null; // Replace with appropriate type if you know
  energyTypes: string[];
  attacks: {
    name: string;
    text: string;
    cost: string;
    numericalEnergyCost: number;
    damage: string;
  }[];
  attackEnergyTypes: string[];
  weakness: string[];
  resistance: string[];
  foundInPacks: string[];
  nationalDexNumber: number;
  retreatCost: number;
  hasRuleBox: boolean;
  hasAbility: boolean;
  ability: string | null; // Replace with appropriate type if you know
  trainerCardText: string;
  dustCost: number;
  description: string | null;
  evolvesFrom: string | null;
  evolvesTo: number | null;
  mainType: string;
  pocket: unknown | null; // Replace with appropriate type if you know
}
