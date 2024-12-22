import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const covers = ["/cards_cover.png", "/sets_cover.png", "/meta_cover.png"];

  return (
    <div className="grid grid-rows-[auto_1fr_auto] font-[family-name:var(--font-geist-sans)]">
      <div className=" row-start-1 p-8">
        <header className="text-center">
          <h1 className="text-3xl font-bold">Welcome to ptcgpocket.net!</h1>
          <p className="text-lg mt-4">
            Your all-in-one source for the latest and most reliable information
            on the Pokémon TCG Pocket game.
          </p>
        </header>
      </div>

      <div className="row-start-2">
        <section className="flex items-center justify-center container mx-auto">
          <Link href="/sets/A1a" className="block w-full max-w-4xl">
            <div className="rounded-lg overflow-hidden shadow-lg border-2">
              <Image
                src={"/cover.png"}
                alt={"Newest Expansion"}
                width={1600}
                height={300}
              />
            </div>
          </Link>
        </section>
      </div>

      <div className="row-start-3 flex items-center justify-center p-8">
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full max-w-4xl">
          {covers.map((cover, index) => (
            <div
              key={index}
              className="relative pb-[56.25%] rounded-lg shadow cursor-pointer hover:shadow-lg border-2 hover:scale-105 overflow-hidden transition-all"
            >
              <Link
                href={index === 0 ? "sets/all" : index === 1 ? "sets" : "meta"}
              >
                <Image
                  src={cover}
                  alt={`Slide ${index + 1}`}
                  fill
                  style={{ objectFit: "cover" }}
                  className=""
                />
              </Link>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
