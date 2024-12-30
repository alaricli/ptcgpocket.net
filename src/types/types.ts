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
  expansionLogo: string;
  expansionSymbol: string;
  expansionName: string;
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

export interface Archetype {
  id: number; // Long in Java corresponds to number in TypeScript
  name: string;
  tier: string;
  ranking: number; // Integer in Java corresponds to number in TypeScript
  wins: number; // Integer in Java corresponds to number in TypeScript
  image: string;
  category: string;
  pokemons: string[]; // List<String> in Java corresponds to string[] in TypeScript
  pokemonsImages: string[]; // List<String> in Java corresponds to string[] in TypeScript
  energyTypesIcons: string[]; // List<String> in Java corresponds to string[] in TypeScript
}

export interface Article {
  id: number; // Long in Java corresponds to number in TypeScript
  title: string;
  created_at: string; // Assuming it's a date-time string, you might use `Date` if parsed
  updated_at: string; // Same as above
  author: string;
  image: string;
  slug: string;
  blurb: string;
  tags: string[]; // List<String> corresponds to string[]
  contents: ArticleContent[]; // List<ArticleContentResponseDTO> corresponds to an array of ArticleContentResponseDTO
}

export interface ArticleContent {
  contentType: string;
  content: string;
  position: number; // Integer in Java corresponds to number in TypeScript
}

export interface Deck {
  id: number; // Corresponds to Long in Java
  archetypeId: number; // Corresponds to the archetype's ID (Long in Java)
  name: string; // Deck name
  author: string; // Deck author
  totalPrice: number; // Float in Java corresponds to number
  image: string; // URL for the deck image
  description: string; // Text content for the deck description
  variant: string; // Variant type of the deck
  variant_pokemons: string[]; // List of Pokémon names in the variant
  variant_pokemons_images: string[];
  cards: DeckCard[]; // Array of cards in the deck
}

export interface DeckCard {
  cardId: string; // String in Java corresponds to string in TypeScript
  cardQuantity: number; // Integer in Java corresponds to number in TypeScript
}
