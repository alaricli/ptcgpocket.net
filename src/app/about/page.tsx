export default function AboutPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-3xl shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-2">About</h1>
        <p className=" text-sm mb-8">Last Updated: December 10, 2024</p>
        <p className="mb-4">Welcome to ptcgpocket.com!</p>
        <p className="mb-4">
          Our mission is to create an easy-to-use, comprehensive resource for
          Pokémon TCG Pocket fans to explore, filter, and discover cards from
          various expansions. Whether you're a seasoned player, collector, or
          just starting, we&apos;re here to make navigating Pokémon TCG Pocket
          simpler.
        </p>
        <h2 className="text-xl font-semibold mb-2">Available Features:</h2>
        <ul className="list-disc list-inside mb-4">
          <li>Browse and filter Pokémon cards by sets and attributes.</li>
          <li>
            Explore individual cards with detailed information, including
            rarity, stats, and more.
          </li>
        </ul>
        <h2 className="text-xl font-semibold mb-2">Coming Soon:</h2>
        <ul className="list-disc list-inside mb-4">
          <li>Meta analysis and additional battle information.</li>
          <li>User accounts to save favorite cards and build custom decks.</li>
          <li>Advanced search features for competitive and casual players.</li>
          <li>Regular updates with the latest expansions and features.</li>
          <li>Unofficial tournaments to meet people and win prizes.</li>
        </ul>
        <p className=" italic mb-6">
          Stay tuned as we continue to expand and improve! For now, feel free to
          browse and find more information about your favorite Pokémon TCG
          Pocket cards.
        </p>
        <p className="text-gray-500 text-sm italic">
          Pokémon and all associated trademarks are the property of their
          respective owners. This website is a fan-made project and is not
          affiliated with The Pokémon Company, Nintendo, or any related
          entities.
        </p>
      </div>
    </div>
  );
}
