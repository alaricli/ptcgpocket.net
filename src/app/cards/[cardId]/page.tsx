import { getEnergySymbol } from "@/app/utils/GetEnergySymbol";
import { Card } from "@/types/types";
import Image from "next/image";

async function fetchCardDetails(cardId: string): Promise<Card | null> {
  try {
    const response = await fetch(
      `http://localhost:8080/api/get/card/${cardId}`
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
    return <div className="min-h-screen">404: Card Not Found</div>;
  }

  return (
    <div className="min-w-screen min-h-screen shadow-lg rounded-lg overflow-hidden flex">
      {/* Left Section: Image */}
      <div className="w-1/3 p-4 flex items-center justify-center">
        <Image
          src={cardDetails.cardImages.large}
          alt={cardDetails.name}
          className="w-full h-auto max-w-sm rounded-md shadow-md"
          width={250}
          height={250}
        />
      </div>

      {/* Right Section: Details */}
      <div className="w-1/3 p-4 flex flex-col justify-center space-y-4">
        {/* Card Name */}
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold leading-none flex items-center space-x-4">
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
              <div key={index} className="p-4 border rounded-md my-2">
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
            <p className="p-4 border rounded-md my-2">
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
