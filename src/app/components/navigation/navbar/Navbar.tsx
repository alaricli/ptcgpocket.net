import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 p-3">
      <div className="flex items-center justify-between">
        <div>
          <Link href="/">
            <Image
              src={"/script_logo.png"}
              alt={"ptcgpocket.net Logo"}
              width={400}
              height={50}
              className="cursor-pointer ml-1"
            />
          </Link>
        </div>
        <div className="flex items-center absolute left-1/2 transform -translate-x-1/2">
          <ul className="flex space-x-6 text-white font-medium text-xl">
            <li>
              <Link
                href={{
                  pathname: `/sets/all`,
                }}
              >
                <p className="hover:text-orange-400">Cards</p>
              </Link>
            </li>
            <li>
              <Link href="/sets">
                <p className="hover:text-orange-400">Sets</p>
              </Link>
            </li>
            <li>
              <Link href="/meta">
                <p className="hover:text-orange-400">Decks</p>
              </Link>
            </li>

            <li>
              <Link href="/articles">
                <p className="hover:text-orange-400">Articles</p>
              </Link>
            </li>
          </ul>
        </div>
        <div></div>
      </div>
    </nav>
  );
};

export default Navbar;
