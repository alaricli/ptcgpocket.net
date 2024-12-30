import { Archetype } from "@/types/types";
import Image from "next/image";
import Link from "next/link";

async function fetchArchetypes(): Promise<Archetype[]> {
  try {
    const response = await fetch(
      "https://api.ptcgpocket.net/api/get/archetypes/pocket",
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch sets");
    }

    return response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function MetaPage() {
  const archetypes = await fetchArchetypes();

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 mx-auto container">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-semibold mb-2">Meta Decks</h2>
        <p className="text-sm italic">last updated: December 28, 2024</p>
      </div>

      <div className="grid grid-cols-[1fr,2fr,2fr,5fr,1fr] items-center gap-4 border p-4 font-semibold dark:bg-gray-800 bg-gray-200 text-gray-800 dark:text-gray-200">
        <div>Ranking:</div>
        <div></div>
        <div></div>
        <div className="items-center pl-[20%] flex">Deck Type:</div>
      </div>

      <div>
        {archetypes
          .sort((a, b) => a.ranking - b.ranking)
          .map((archetype) => (
            <Link
              key={archetype.id}
              href={{
                pathname: `/meta/${archetype.id}`,
              }}
            >
              <div className="grid grid-cols-[1fr,2fr,2fr,5fr,1fr] items-center gap-4 border-x border-b p-4 dark:bg-gray-800 bg-gray-200 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700">
                {/* Ranking */}
                <div className="">{archetype.ranking}</div>
                {/* Images */}
                <div className="gap-1 flex items-start">
                  {archetype.pokemonsImages.map((pokemonImage, index) => (
                    <div key={index}>
                      <Image
                        src={pokemonImage}
                        alt={`Pokemon ${index + 1}`}
                        width={40}
                        height={40}
                        className="rounded-md shadow-sm"
                      />
                    </div>
                  ))}
                </div>
                {/* Energy Icons */}
                <div className="gap-1 flex items-start">
                  {archetype.energyTypesIcons.map((energyTypeIcon, index) => (
                    <div key={index}>
                      <Image
                        src={energyTypeIcon}
                        alt={`Pokemon ${index + 1}`}
                        width={40}
                        height={40}
                        className="rounded-md shadow-sm"
                      />
                    </div>
                  ))}
                </div>
                {/* Name */}
                <div className="items-center pl-[20%] flex">
                  {archetype.name}
                </div>
                <div className="text-right">
                  <span className="hover:underline text-blue-500">
                    View Decks
                  </span>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
