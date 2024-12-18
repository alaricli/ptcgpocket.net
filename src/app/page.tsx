import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const slides = ["/cards_cover.png", "/sets_cover.png", "/meta_cover.png"];
  const covers = ["/cards_cover.png", "/sets_cover.png", "/meta_cover.png"];

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="text-center">
        <h1 className="text-3xl font-bold">Welcome to ptcgpocket.net!</h1>
        <p className="text-lg mt-4">
          Your all-in-one source for the latest and most reliable information on
          the Pokémon TCG Pocket game.
        </p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full max-w-4xl pb-8">
        {covers.map((cover, index) => (
          <div
            key={index}
            className="relative pb-[56.25%] rounded-lg shadow cursor-pointer hover:shadow-lg border-4 hover:scale-105 overflow-hidden transition-all"
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
  );
}
