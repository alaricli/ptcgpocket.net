"use client";

import { Archetype, Card, Deck } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type SuperType = "Pokémon" | "Trainer" | "Energy";

async function fetchDeckData(deckId: string): Promise<Deck | null> {
  try {
    const response = await fetch(
      `https://api.ptcgpocket.net/api/get/deck/${deckId}`
    );

    if (!response.ok) {
      throw new Error("couldn't fetch deck");
    }

    return response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function fetchArchetypeData(
  archetypeId: number
): Promise<Archetype | null> {
  try {
    const response = await fetch(
      `https://api.ptcgpocket.net/api/get/archetype/${archetypeId}`
    );

    if (!response.ok) {
      throw new Error("Couldn't fetch archetype");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function fetchCardData(cardId: string): Promise<Card | null> {
  try {
    const response = await fetch(
      `https://api.ptcgpocket.net/api/get/card/${cardId}`
    );

    if (!response.ok) {
      throw new Error("couldn't fetch card details");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default function DeckPage() {
  const params = useParams();
  const router = useRouter();

  const deckId = Array.isArray(params.deckId)
    ? params.deckId[0]
    : params.deckId;

  const [deck, setDeck] = useState<Deck | null>(null);
  const [archetype, setArchetype] = useState<Archetype | null>(null);
  const [cardDetails, setCardDetails] = useState<Record<string, Card | null>>(
    {}
  );

  useEffect(() => {
    if (!deckId) {
      router.push("/");
      return;
    }

    const fetchData = async () => {
      const deckData = await fetchDeckData(deckId);
      setDeck(deckData);

      if (deckData?.archetypeId) {
        const archetypeData = await fetchArchetypeData(deckData.archetypeId);
        setArchetype(archetypeData);
      }

      if (deckData) {
        const cardDataPromises = deckData.cards.map((deck_card) =>
          fetchCardData(deck_card.cardId).then((cardData) => ({
            cardId: deck_card.cardId,
            data: cardData,
          }))
        );

        const resolvedCardData = await Promise.all(cardDataPromises);

        const cardDataMap = resolvedCardData.reduce(
          (acc, { cardId, data }) => ({ ...acc, [cardId]: data }),
          {}
        );

        setCardDetails(cardDataMap);
      }
    };

    fetchData();
  }, [deckId, router]);

  const groupedCards: Record<SuperType, { card: Card; quantity: number }[]> = {
    Pokémon: [],
    Trainer: [],
    Energy: [],
  };

  deck?.cards.forEach((deck_card) => {
    const card = cardDetails[deck_card.cardId];
    if (card && card.superType in groupedCards) {
      groupedCards[card.superType as SuperType].push({
        card,
        quantity: deck_card.cardQuantity,
      });
    }
  });

  return (
    <div className="mx-auto container">
      {deck && archetype ? (
        <div className="">
          <header className="py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="">
                <h2 className="text-4xl font-semibold">{deck.name}</h2>
                <p className="italic">by: {deck.author}</p>
                <div className="leading-relaxed mt-4 space-y-4 max-w-screen-md text-justify">
                  {deck.description?.split("\n\n").map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>
              <div>
                <Image
                  src={deck.image}
                  alt="deck image"
                  width={200}
                  height={200}
                  className="rounded mr-4"
                />
              </div>
            </div>
          </header>

          <div>
            {Object.entries(groupedCards).map(([superType, cards]) => {
              if (cards.length === 0) return null;

              return (
                <div key={superType} className="mb-8">
                  <h3 className="text-2xl font-semibold border-b pb-2 mb-4">
                    {superType}
                  </h3>

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                    {cards.map(({ card, quantity }) => (
                      <div
                        key={card.id}
                        className="p-4 flex flex-col rounded-md shadow-md mx-auto hover:scale-105 transition-transform overflow-hidden"
                      >
                        <Link
                          href={{
                            pathname: `/cards/${card.id}`,
                          }}
                        >
                          {card.cardImages?.small && (
                            <Image
                              src={card.cardImages.small}
                              alt={card.name || "Card Image"}
                              width={200}
                              height={300}
                              className="rounded-md shadow-sm"
                            />
                          )}
                          <div className="text-center space-y-1 rounded-lg py-4">
                            <p className="font-semibold text-xl">{card.name}</p>
                            <p className="text-sm">
                              {card.expansionName}{" "}
                              <span className="font-medium">
                                #{card.cardNumber}
                              </span>
                            </p>
                            <div className="flex justify-center items-center">
                              <Image
                                src={card.expansionSymbol}
                                alt="card expansion symbol"
                                width={80}
                                height={80}
                              />
                            </div>

                            <p className="text-sm">Quantity: {quantity}</p>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div>This deck doesn't exist, please return home.</div>
      )}
    </div>
  );
}
