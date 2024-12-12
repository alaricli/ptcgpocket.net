export const getEnergySymbol = (type: string): string => {
  const energyMap: Record<string, string> = {
    Grass: "G",
    Fire: "R",
    Water: "W",
    Lightning: "L",
    Psychic: "P",
    Fighting: "F",
    Darkness: "D",
    Metal: "M",
    Fairy: "Y",
    Dragon: "N",
    Colorless: "C",
  };

  return energyMap[type] || "?"; // Fallback for unknown types
};
