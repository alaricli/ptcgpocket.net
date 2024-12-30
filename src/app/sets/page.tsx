import Image from "next/image";
import { Expansion } from "@/types/types";
import Link from "next/link";

async function fetchSets(): Promise<Expansion[]> {
  try {
    const response = await fetch(
      "https://api.ptcgpocket.net/api/get/expansions/pocket",
      {
        // Important for server-side fetching
        cache: "no-store", // or 'force-cache' depending on your needs
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch sets");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching sets:", error);
    return [];
  }
}

// Server Component
export default async function SetsPage() {
  const sets = await fetchSets();

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-semibold py-6">All Sets</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sets.map((set) => (
          <Link
            key={set.id}
            href={{
              pathname: `/sets/${set.id}`,
            }}
          >
            <div
              key={set.id}
              className=" dark:bg-gray-800 bg-gray-200 text-gray-800 dark:text-gray-200 border rounded-lg shadow-md p-6 hover:scale-105 transition-all overflow-hidden w-full h-full"
            >
              <div className="flex items-center mb-4">
                {set.expansionImages.symbol && (
                  <Image
                    src={set.expansionImages.symbol}
                    alt={`${set.name} symbol`}
                    width={50}
                    height={50}
                    className="mr-4"
                  />
                )}
                <div className="flex space-x-2 items-center">
                  <h2 className="text-xl font-semibold">{set.name}</h2>
                  <p className="text-gray-500">{set.expansionCode}</p>
                </div>
              </div>
              <div className="space-y-1">
                <p>
                  <strong>Total Cards:</strong> {set.total}
                </p>
                {set.releaseDate && (
                  <p>
                    <strong>Release Date:</strong> {set.releaseDate}
                  </p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
