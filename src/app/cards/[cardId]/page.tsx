import { getEnergySymbol } from "@/app/utils/GetEnergySymbol";
import { Card } from "@/types/types";
import Image from "next/image";

async function fetchCardDetails(cardId: string): Promise<Card | null> {
  try {
    const response = await fetch(
      `https://api.ptcgpocket.net/api/get/card/${cardId}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch card details");
    }

    return await response.json();
  } catch (error) {
    console.error("Error ", error);
    return null;
  }
}

export default async function CardPage({
  params: paramsPromise,
}: {
  params: Promise<{ cardId: string }>;
}) {
  const params = await paramsPromise;
  const { cardId } = params;

  const cardDetails = await fetchCardDetails(cardId);

  if (!cardDetails) {
    return <div className="">404: Card Not Found</div>;
  }

  return (
    <div className="mx-auto container shadow-lg rounded-lg overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-16 py-8">
      {/* Left/Top Section: Image */}
      <div className="flex justify-center md:p-8">
        <Image
          src={cardDetails.cardImages.large}
          alt={cardDetails.name}
          className="w-auto h-auto max-w-full object-contain rounded-md shadow-md"
          width={400}
          height={400}
        />
      </div>

      {/* Right/Bottom Section: Details */}
      <div className="p-4 flex flex-col space-y-4">
        <div className="flex items-center space-x-4">
          <h1 className="text-3xl font-bold leading-none flex items-center space-x-4">
            <span>{cardDetails.name}</span>

            {(cardDetails.superType === "Pokémon" ||
              cardDetails.subTypes.includes("Fossil")) && (
              <span className="text-xl leading-none">HP: {cardDetails.hp}</span>
            )}

            {(cardDetails.superType === "Pokémon" ||
              cardDetails.superType === "Energy") && (
              <span className="energy-icon leading-none relative top-0.5">
                {getEnergySymbol(cardDetails.mainType)}
              </span>
            )}
          </h1>
        </div>

        {/* Shared Basic Information */}
        <div className="flex">
          <span className="mr-1">{cardDetails.superType} - </span>
          <span>
            {cardDetails.subTypes.map((subType, index) => (
              <span key={index}>
                {index > 0 && ", "}
                {subType}
              </span>
            ))}
          </span>
        </div>

        <div>
          <p>
            <strong>Rarity:</strong> {cardDetails.rarity}
          </p>
          <p>
            <strong>Expansion:</strong> {cardDetails.expansionId}
          </p>
          {cardDetails.dustCost != 0 && (
            <p>
              <strong>Found in Packs:</strong>{" "}
              <span>
                {cardDetails.foundInPacks.map((pack, index) => (
                  <span key={index}>
                    {index > 0 && ", "}
                    {pack}
                  </span>
                ))}
              </span>
            </p>
          )}
          {cardDetails.dustCost != 0 && (
            <p>
              <strong>Dust Cost:</strong> {cardDetails.dustCost}
            </p>
          )}
          <p>
            <strong>Illustrated By:</strong> {cardDetails.artist}
          </p>
        </div>

        {/* Attacks */}
        {cardDetails.superType === "Pokémon" && (
          <div>
            {cardDetails.hasAbility === true && (
              <div>
                <h2 className="text-lg font-semibold">Ability:</h2>
                <div className="p-4 border rounded-md my-2">
                  {cardDetails.ability}
                </div>
              </div>
            )}
            <h2 className="text-lg font-semibold">Attacks:</h2>
            {cardDetails.attacks.map((attack, index) => (
              <div
                key={index}
                className="p-4 border rounded-md my-2 bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
              >
                <div className="font-semibold">{attack.name}</div>
                <div className="flex justify-between mt-2">
                  <div className="flex space-x-1">
                    {attack.cost.split(",").map((cost, index) => (
                      <span key={index} className="energy-icon">
                        {getEnergySymbol(cost)}
                      </span>
                    ))}
                  </div>
                  <p>{attack.damage}</p>
                </div>
                <div>{attack.text}</div>
              </div>
            ))}
          </div>
        )}

        {/* Trainer Card Text */}
        {cardDetails.superType === "Trainer" && (
          <div>
            <h2 className="text-lg font-semibold">Text:</h2>
            <p className="p-4 border rounded-md my-2 bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
              {cardDetails.trainerCardText}
            </p>
          </div>
        )}

        {/* Pokemon Basic Information */}
        {cardDetails.superType === "Pokémon" && (
          <div>
            <p>
              <strong className="mr-1">Weakness:</strong>
              <span className="energy-icon relative top-0.5">
                {getEnergySymbol(cardDetails.weakness[0])}
              </span>
            </p>
            <p>
              <strong>Resistance:</strong> {cardDetails.resistance}
            </p>
            <p>
              <strong>Retreat Cost</strong> {cardDetails.retreatCost}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
