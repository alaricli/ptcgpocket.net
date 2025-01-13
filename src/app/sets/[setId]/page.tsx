"use client";

import { useState, useEffect, use } from "react";
import { Card, Expansion } from "@/types/types";
import Image from "next/image";
import Link from "next/link";

async function fetchCards(
  setId: string,
  filters: Record<string, string>
): Promise<Card[]> {
  try {
    const queryParams = new URLSearchParams({
      ...(setId && setId !== "all" && { expansionId: setId }),
      ...filters,
    }).toString();
    const response = await fetch(
      `https://api.ptcgpocket.net/api/get/cards?${queryParams}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch cards");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching cards: ", error);
    return [];
  }
}

async function fetchExpansionDetails(setId: string): Promise<Expansion | null> {
  if (!setId || setId == "" || setId == "all") {
    return {
      id: "",
      series: "",
      name: "All Cards",
      expansionImages: {
        symbol: "",
        logo: "/tcgpocketlogo.png",
      },
      legalities: null,
      printedTotal: 0,
      total: 0,
      expansionCode: "",
      releaseDate: "",
    };
  }

  try {
    const response = await fetch(
      `https://api.ptcgpocket.net/api/get/expansion/${setId}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch expansion details");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching expansion details: ", error);
    return null;
  }
}

export default function SetPage({
  params: paramsPromise,
}: {
  params: Promise<{ setId: string }>;
}) {
  const params = use(paramsPromise || { setId: "" });

  const { setId: initialSetId = "" } = params;

  const [setId, setSetId] = useState(initialSetId);
  const [filters, setFilters] = useState<Record<string, string>>({
    pageSize: "9999",
  });
  const [cards, setCards] = useState<Card[]>([]);
  const [expansionDetails, setExpansionDetails] = useState<Expansion | null>(
    null
  );
  const [searchText, setSearchText] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchAndSetCards = async () => {
      const fetchedCards = await fetchCards(setId, filters);
      setCards(fetchedCards);
    };
    fetchAndSetCards();
  }, [setId, filters]);

  useEffect(() => {
    const fetchAndSetExpansionDetails = async () => {
      const fetchedDetails = await fetchExpansionDetails(setId);
      setExpansionDetails(fetchedDetails);
    };
    fetchAndSetExpansionDetails();
  }, [setId]);

  const updateFilter = (filterKey: string, filterValue: string) => {
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };
      if (!filterValue || filterKey === "All") {
        delete updatedFilters[filterKey];
      } else {
        updatedFilters[filterKey] = filterValue;
      }
      return updatedFilters;
    });
  };

  const packOptions: Record<string, { value: string; label: string }[]> = {
    A1: [
      { value: "A1-1", label: "Genetic Apex: Mewtwo Pack" },
      { value: "A1-2", label: "Genetic Apex: Charizard Pack" },
      { value: "A1-3", label: "Genetic Apex: Pikachu Pack" },
    ],
    A1a: [{ value: "A1a", label: "Mythical Island Pack" }],
    PROMOA: [
      { value: "PA1-1", label: "Promo Pack A Series Vol.1" },
      { value: "PA1-2", label: "Promo Pack A Series Vol.2" },
      { value: "PA1-3", label: "Promo Pack A Series Vol.3" },
    ],
    default: [
      { value: "A1-1", label: "Genetic Apex: Mewtwo Pack" },
      { value: "A1-2", label: "Genetic Apex: Charizard Pack" },
      { value: "A1-3", label: "Genetic Apex: Pikachu Pack" },
      { value: "PA1-1", label: "Promo Pack A Series Vol.1" },
      { value: "PA1-2", label: "Promo Pack A Series Vol.2" },
      { value: "PA1-3", label: "Promo Pack A Series Vol.3" },
      { value: "M", label: "Missions" },
      { value: "Shop", label: "Shop" },
      { value: "WP", label: "Wonder Pick" },
    ],
  };

  const getPackOptions = (setId: string) => {
    if (packOptions[setId]) {
      return packOptions[setId];
    }
    return packOptions.default;
  };

  const headerColorOptions: Record<string, string> = {
    A1: "bg-gradient-to-r from-[rgb(173,40,200)] via-[rgb(142,28,233)] to-[rgb(22,20,171)]",
    PROMOA:
      "bg-gradient-to-r from-[rgb(41,93,230)] via-[rgb(26,21,95)] to-[rgb(17,47,193)]",
    A1a: "bg-gradient-to-r from-[rgb(98,190,172)] via-[rgb(73,112,212)] to-[rgb(174,78,191)]",
    default: "bg-gradient-to-r from-[rgb(255,223,0)] to-[rgb(0,105,180)]",
  };

  return (
    <div className="">
      <header
        className={`${headerColorOptions[setId] || headerColorOptions.default}
        shadow-md py-4 px-6 flex-col md:flex-row flex md:items-center md:justify-between w-full`}
      >
        <div className="flex items-center h-24 w-24 overflow-hidden">
          {expansionDetails?.expansionImages?.logo && (
            <Image
              src={expansionDetails.expansionImages.logo}
              alt={`${expansionDetails.name} logo`}
              className="object-contain w-full h-full"
              height={100}
              width={100}
            />
          )}
        </div>
        <div className="text-center p-4 md:p-0">
          <h1 className="text-3xl font-semibold text-white">
            {expansionDetails?.name || "Loading..."}
          </h1>
          <p className="text-gray-100">{expansionDetails?.expansionCode}</p>
        </div>
        <div className="text-white text-center md:text-right">
          {expansionDetails?.total !== undefined &&
            expansionDetails.total > 0 && (
              <p>Set Total: {expansionDetails.total}</p>
            )}
          {expansionDetails?.releaseDate && (
            <p>Release Date: {expansionDetails.releaseDate}</p>
          )}
        </div>
      </header>

      <div className="flex">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="w-full bg-gray-700 text-white py-2 font-semibold"
        >
          Toggle Filters
          <div>
            <span className="font-semibold">{showFilters ? "▲" : "▼"}</span>
          </div>
        </button>
      </div>

      {/* Filter Section */}
      {showFilters && (
        <div className="p-6 shadow-md grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <label className="block mb-2 text-sm font-medium">
            Select Set ID:
          </label>
          <select
            value={setId}
            onChange={(e) => {
              updateFilter("expansionId", e.target.value);
              setSetId(e.target.value);
            }}
            className="p-2 border rounded-md text-gray-900"
          >
            <option value="">All</option>
            <option value="A1">Genetic Apex</option>
            <option value="PROMOA">Promo A</option>
            <option value="A1a">Mythical Island</option>
          </select>

          <label className="block mb-2 text-sm font-medium ">
            Select Pack:
          </label>
          <select
            onChange={(e) => updateFilter("packId", e.target.value)}
            className="p-2 border rounded-md text-gray-900"
          >
            <option value="">All</option>
            {getPackOptions(setId).map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <label className="block mb-2 text-sm font-medium">Search:</label>
          <div className="flex items-center border w-full bg-white shadow-sm rounded-md ">
            <input
              placeholder="Search..."
              className="p-2 flex-grow outline-none text-gray-900"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button
              onClick={() => updateFilter("searchText", searchText)}
              className="bg-blue-500 p-2 rounded-r-md hover:bg-blue-600 transition"
            >
              Search
            </button>
          </div>

          <label className="block mt-4 mb-2 text-sm font-medium ">
            Filter by Rarity:
          </label>
          <select
            onChange={(e) => updateFilter("rarity", e.target.value)}
            className="p-2 border rounded-md text-gray-900"
          >
            <option value="">All</option>
            <option value="Common">Common</option>
            <option value="Uncommon">Uncommon</option>
            <option value="Rare">Rare</option>
            <option value="Double Rare">Double Rare</option>
            <option value="Art Rare">Art Rare</option>
            <option value="Super Rare">Super Rare</option>
            <option value="Special Art Rare">Special Art Rare</option>
            <option value="Immersive Rare">Immersive Rare</option>
            <option value="Crown Rare">Crown Rare</option>
          </select>

          <label className="block mt-4 mb-2 text-sm font-medium ">
            Filter by Type:
          </label>
          <select
            onChange={(e) => updateFilter("energyType", e.target.value)}
            className="p-2 border rounded-md text-gray-900"
          >
            <option value="">All</option>
            <option value="Fire">Fire</option>
            <option value="Water">Water</option>
            <option value="Grass">Grass</option>
            <option value="Lightning">Lightning</option>
            <option value="Psychic">Psychic</option>
            <option value="Fighting">Fighting</option>
            <option value="Darkness">Darkness</option>
            <option value="Metal">Metal</option>
            <option value="Fairy">Fairy</option>
            <option value="Dragon">Dragon</option>
            <option value="Colorless">Colorless</option>
          </select>

          <label className="block mt-4 mb-2 text-sm font-medium ">
            Filter by Weakness:
          </label>
          <select
            onChange={(e) => updateFilter("weakness", e.target.value)}
            className="p-2 border rounded-md text-gray-900"
          >
            <option value="">All</option>
            <option value="Fire">Fire</option>
            <option value="Water">Water</option>
            <option value="Grass">Grass</option>
            <option value="Lightning">Lightning</option>
            <option value="Psychic">Psychic</option>
            <option value="Fighting">Fighting</option>
            <option value="Darkness">Darkness</option>
            <option value="Metal">Metal</option>
            <option value="Fairy">Fairy</option>
            <option value="Dragon">Dragon</option>
            <option value="Colorless">Colorless</option>
          </select>

          <label className="block mt-4 mb-2 text-sm font-medium ">
            Filter by Ability:
          </label>
          <select
            onChange={(e) => updateFilter("hasAbility", e.target.value)}
            className="p-2 border rounded-md text-gray-900"
          >
            <option value="">All</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>

          <label className="block mt-4 mb-2 text-sm font-medium ">
            Filter by Rule Box (ex):
          </label>
          <select
            onChange={(e) => updateFilter("hasRuleBox", e.target.value)}
            className="p-2 border rounded-md text-gray-900"
          >
            <option value="">All</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>

          <label className="block mt-4 mb-2 text-sm font-medium ">
            Filter by Card Category:
          </label>
          <select
            onChange={(e) => updateFilter("superType", e.target.value)}
            className="p-2 border rounded-md text-gray-900"
          >
            <option value="">All</option>
            <option value="Pokémon">Pokémon</option>
            <option value="Trainer">Trainer</option>
          </select>

          <label className="block mt-4 mb-2 text-sm font-medium ">
            Filter by Card Type:
          </label>
          <select
            onChange={(e) => updateFilter("subType", e.target.value)}
            className="p-2 border rounded-md text-gray-900"
          >
            <option value="">All</option>
            <option value="Basic">Basic</option>
            <option value="Stage 1">Stage 1</option>
            <option value="Stage 2">Stage 2</option>
            <option value="Item">Item</option>
            <option value="ex">ex</option>
            <option value="Supporter">Supporter</option>
            <option value="Fossil">Fossil</option>
          </select>

          <label className="block mt-4 mb-2 text-sm font-medium ">
            Filter by Retreat Cost:
          </label>
          <select
            onChange={(e) => updateFilter("retreatCost", e.target.value)}
            className="p-2 border rounded-md text-gray-900"
          >
            <option value="">All</option>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>

          <div className="flex mb-2 text-sm font-medium space-x-4">
            <label className="whitespace-nowrap">Sort By:</label>
            <select
              onChange={(e) => updateFilter("sortBy", e.target.value)}
              className="p-2 border rounded-md text-gray-900 w-full"
            >
              <option value="">Default (id)</option>
              <option value="name">Name</option>
              <option value="nationalDexNumber">Nat Dex Number</option>
              <option value="rarity">Rarity</option>
              <option value="type">Energy Type</option>
              <option value="superType">Card Type</option>
            </select>
          </div>

          <div className="flex mb-2 text-sm font-medium space-x-4">
            <label className="whitespace-nowrap">Sort Direction:</label>
            <select
              onChange={(e) => updateFilter("sortDirection", e.target.value)}
              className="p-2 border rounded-md text-gray-900 w-full"
            >
              <option value="">Ascending</option>
              <option value="DESC">Descending</option>
            </select>
          </div>
        </div>
      )}

      {/* Cards Section */}
      <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 container mx-auto pt-6">
        {cards.map((card) => (
          <div
            key={card.id}
            className="rounded-lg p-4 w-64 flex flex-col items-center shadow-md hover:scale-105 transition-transform overflow-hidden"
          >
            <Link
              href={{
                pathname: `/cards/${card.id}`,
              }}
            >
              <div>
                <Image
                  src={card.cardImages.small}
                  alt={`${card.name} image`}
                  className="object-cover rounded-lg"
                  height={200}
                  width={300}
                />
                <div className="flex justify-between w-full p-2 mt-2">
                  <p className="text-lg font-semibold">{card.name}</p>
                  <p className="text-sm text-gray-500">{card.id}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
