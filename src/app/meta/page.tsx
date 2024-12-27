import { Archetype } from "@/types/types";
import Image from "next/image";
import Link from "next/link";

async function fetchArchetypes(): Promise<Archetype[]> {
  try {
    const response = await fetch(
      "http://localhost:8080/api/get/archetypes/pocket"
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
    <div className="items-center justify-center mx-auto container">
      <h2 className="text-3xl font-semibold p-6 text-center">Meta Decks</h2>
      <div className="border-b flex"></div>
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
              <div key={archetype.id} className="border-x border-b">
                <div className="flex items-center gap-4 p-2">
                  {archetype.ranking}
                  <div className="flex items-center gap-2">
                    {archetype.pokemonsImages.map((pokemonImage, index) => (
                      <div key={index}>
                        <Image
                          src={pokemonImage}
                          alt={`Pokemon ${index + 1}`}
                          width={40}
                          height={40}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    {archetype.energyTypesIcons.map((energyTypeIcon, index) => (
                      <div key={index}>
                        <Image
                          src={energyTypeIcon}
                          alt={`Pokemon ${index + 1}`}
                          width={40}
                          height={40}
                        />
                      </div>
                    ))}
                  </div>
                  <div></div>
                  {archetype.name}
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
