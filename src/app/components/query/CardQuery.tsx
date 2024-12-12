import { useState } from "react";

const Filters = ({
  onApplyFilters,
}: {
  onApplyFilters: (filters: any) => void;
}) => {
  const [searchText, setSearchText] = useState<string>("");
  const [expansionId, setExpansionId] = useState<string>("");
  const [packId, setPackId] = useState<string>("");
  const [rarity, setRarity] = useState<string>("");
  const [hasAbility, setHasAbility] = useState<string>("");
  const [hasRuleBox, setHasRuleBox] = useState<string>("");
  const [energyType, setEnergyType] = useState<string>("");
  const [weakness, setWeakness] = useState<string>("");
  const [retreatCost, setRetreatCost] = useState<string>("");
  const [superType, setSuperType] = useState<string>("");
  const [subType, setSubType] = useState<string>("");
  const [sort, setSort] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<string>("ASC");

  const handleApplyFilters = () => {
    onApplyFilters({
      searchText,
      expansionId,
      packId,
      rarity,
      hasAbility,
      hasRuleBox,
      energyType,
      weakness,
      retreatCost,
      superType,
      subType,
      sort,
      sortDirection,
    });
  };

  return (
    <div className="p-4 flex flex-wrap space-x-4 bg-gray-100 shadow-md">
      {/* Search Text */}
      <div>
        <label className="text-sm font-medium text-gray-700">Search:</label>
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search by name, artist..."
          className="ml-2 p-2 border rounded"
        />
      </div>

      {/* Expansion ID */}
      <div>
        <label className="text-sm font-medium text-gray-700">Expansion:</label>
        <select
          value={expansionId}
          onChange={(e) => setExpansionId(e.target.value)}
          className="ml-2 p-2 border rounded"
        >
          <option value="">All</option>
          <option value="expansion1">Expansion 1</option>
          <option value="expansion2">Expansion 2</option>
        </select>
      </div>

      {/* Pack ID */}
      <div>
        <label className="text-sm font-medium text-gray-700">Pack:</label>
        <select
          value={packId}
          onChange={(e) => setPackId(e.target.value)}
          className="ml-2 p-2 border rounded"
        >
          <option value="">All</option>
          <option value="pack1">Pack 1</option>
          <option value="pack2">Pack 2</option>
        </select>
      </div>

      {/* Rarity */}
      <div>
        <label className="text-sm font-medium text-gray-700">Rarity:</label>
        <select
          value={rarity}
          onChange={(e) => setRarity(e.target.value)}
          className="ml-2 p-2 border rounded"
        >
          <option value="">All</option>
          <option value="common">Common</option>
          <option value="rare">Rare</option>
          <option value="uncommon">Uncommon</option>
        </select>
      </div>

      {/* Has Ability */}
      <div>
        <label className="text-sm font-medium text-gray-700">
          Has Ability:
        </label>
        <select
          value={hasAbility}
          onChange={(e) => setHasAbility(e.target.value)}
          className="ml-2 p-2 border rounded"
        >
          <option value="">All</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>

      {/* Has Rule Box */}
      <div>
        <label className="text-sm font-medium text-gray-700">
          Has Rule Box:
        </label>
        <select
          value={hasRuleBox}
          onChange={(e) => setHasRuleBox(e.target.value)}
          className="ml-2 p-2 border rounded"
        >
          <option value="">All</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>

      {/* Energy Type */}
      <div>
        <label className="text-sm font-medium text-gray-700">
          Energy Type:
        </label>
        <select
          value={energyType}
          onChange={(e) => setEnergyType(e.target.value)}
          className="ml-2 p-2 border rounded"
        >
          <option value="">All</option>
          <option value="fire">Fire</option>
          <option value="water">Water</option>
        </select>
      </div>

      {/* Weakness */}
      <div>
        <label className="text-sm font-medium text-gray-700">Weakness:</label>
        <select
          value={weakness}
          onChange={(e) => setWeakness(e.target.value)}
          className="ml-2 p-2 border rounded"
        >
          <option value="">All</option>
          <option value="fire">Fire</option>
          <option value="water">Water</option>
        </select>
      </div>

      {/* Retreat Cost */}
      <div>
        <label className="text-sm font-medium text-gray-700">
          Retreat Cost:
        </label>
        <select
          value={retreatCost}
          onChange={(e) => setRetreatCost(e.target.value)}
          className="ml-2 p-2 border rounded"
        >
          <option value="">All</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </div>

      {/* Supertype */}
      <div>
        <label className="text-sm font-medium text-gray-700">Supertype:</label>
        <select
          value={superType}
          onChange={(e) => setSuperType(e.target.value)}
          className="ml-2 p-2 border rounded"
        >
          <option value="">All</option>
          <option value="pokemon">Pokemon</option>
          <option value="trainer">Trainer</option>
        </select>
      </div>

      {/* Subtype */}
      <div>
        <label className="text-sm font-medium text-gray-700">Subtype:</label>
        <select
          value={subType}
          onChange={(e) => setSubType(e.target.value)}
          className="ml-2 p-2 border rounded"
        >
          <option value="">All</option>
          <option value="basic">Basic</option>
          <option value="stage1">Stage 1</option>
        </select>
      </div>

      {/* Sort */}
      <div>
        <label className="text-sm font-medium text-gray-700">Sort By:</label>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="ml-2 p-2 border rounded"
        >
          <option value="">Default</option>
          <option value="name">Name</option>
          <option value="rarity">Rarity</option>
          <option value="superType">Supertype</option>
          <option value="type">Type</option>
          <option value="nationalDexNumber">National Dex Number</option>
        </select>
      </div>

      {/* Sort Direction */}
      <div>
        <label className="text-sm font-medium text-gray-700">
          Sort Direction:
        </label>
        <select
          value={sortDirection}
          onChange={(e) => setSortDirection(e.target.value)}
          className="ml-2 p-2 border rounded"
        >
          <option value="ASC">Ascending</option>
          <option value="DESC">Descending</option>
        </select>
      </div>

      {/* Apply Button */}
      <button
        onClick={handleApplyFilters}
        className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
      >
        Apply
      </button>
    </div>
  );
};

export default Filters;
