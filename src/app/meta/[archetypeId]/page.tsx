"use client";

import { Archetype, Deck } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

async function fetchDecksByArchetype(archetypeId: string): Promise<Deck[]> {
  try {
    const response = await fetch(
      `https://api.ptcgpocket.net/api/get/decks/${archetypeId}`
    );

    if (!response.ok) {
      throw new Error("couldn't fetch decks");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function fetchArchetypeDetails(
  archetypeId: string
): Promise<Archetype | null> {
  try {
    const response = await fetch(
      `https://api.ptcgpocket.net/api/get/archetype/${archetypeId}`
    );

    if (!response.ok) {
      throw new Error("couldn't get archetype details");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default function DecksByArchetypePage() {
  const router = useRouter();
  const params = useParams();

  const archetypeId = Array.isArray(params.archetypeId)
    ? params.archetypeId[0]
    : params.archetypeId;

  const [decks, setDecks] = useState<Deck[]>([]);
  const [archetype, setArchetype] = useState<Archetype | null>(null);

  useEffect(() => {
    if (!archetypeId) {
      router.push("/");
      return;
    }

    const fetchData = async () => {
      const archetypeData = await fetchArchetypeDetails(archetypeId);
      const decksData = await fetchDecksByArchetype(archetypeId);

      setArchetype(archetypeData);
      setDecks(decksData);
    };

    fetchData();
  }, [archetypeId, router]);

  return (
    <div>
      {archetype ? (
        <div className="mx-auto container">
          <header className="flex py-8">
            <Image
              src={archetype.image}
              alt="archetype image banner"
              width={200}
              height={300}
            />
            <h2 className="text-4xl font-semibold p-6">
              {archetype.name} Deck Lists
            </h2>
          </header>

          <div className="border p-4 grid grid-cols-4 font-semibold items-center justify-center dark:bg-gray-800 bg-gray-200 text-gray-800 dark:text-gray-200">
            <div>Deck Name</div>
            <div>Variant</div>
            <div>Deck Creator</div>
          </div>
          <div className="mb-8">
            {decks.map((deck) => (
              <Link
                key={deck.id}
                href={{
                  pathname: `/decks/${deck.id}`,
                }}
                className=""
              >
                <div
                  key={deck.id}
                  className="border-x border-b p-4 grid grid-cols-4 items-center justify-center dark:bg-gray-800 bg-gray-200 text-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 hover:bg-gray-300"
                >
                  <div>{deck.name}</div>
                  <div className="flex gap-2">
                    {deck.variant_pokemons_images.map((image, index) => (
                      <Image
                        key={index}
                        src={image}
                        alt={`Pokemon Variant ${index + 1}`}
                        width={40}
                        height={40}
                        className="rounded-md shadow-sm"
                      />
                    ))}
                  </div>
                  <div>{deck.author}</div>
                  <div className="flex justify-end pr-4">
                    <span className="hover:underline text-blue-500">
                      View Deck List
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div>Archetype doesn&apos;t exist</div>
      )}
    </div>
  );
}
